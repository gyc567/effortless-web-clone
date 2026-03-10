import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Twitter, Gift, Users, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase 客户端（前端安全方式）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qmgbaqqapqrxswssiavz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_NQ1m4BylCN-iAriXQpBYJw_Jip80Tuv';

// 如果环境变量不存在，显示警告
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('VITE_SUPABASE_URL not set, using default');
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('VITE_SUPABASE_ANON_KEY not set, using default');
}

// 创建客户端（带默认值）
const supabase = createClient(supabaseUrl, supabaseKey);

interface ReferralData {
  code: string;
  twitterHandle: string;
  verifiedTweets: number;
  canClaim: boolean;
  claimed: boolean;
  lotteryTickets: number;
}

export default function ReferralPromotion() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 用户数据
  const [promoCode, setPromoCode] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [tweetUrl, setTweetUrl] = useState('');
  const [referralData, setReferralData] = useState<ReferralData | null>(null);

  // 生成推广码
  const generateCode = async () => {
    if (!twitterHandle.trim()) {
      setError('Please enter your Twitter username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const handle = twitterHandle.replace('@', '').toLowerCase();
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 6);
      const code = `${handle.substring(0, 4)}_${timestamp}_${random}`.toLowerCase();

      // 直接调用 Supabase
      const { data: existing } = await supabase
        .from('referrals')
        .select('*')
        .eq('twitter_handle', handle)
        .single();

      if (existing) {
        setPromoCode(existing.promo_code);
        setStep(2);
        return;
      }

      const { error: insertError } = await supabase
        .from('referrals')
        .insert({
          twitter_handle: handle,
          promo_code: code,
          verified_tweets: 0,
          can_claim: false,
          claimed: false,
          lottery_tickets: 0
        });

      if (insertError) {
        // 如果是唯一约束冲突，说明用户已存在
        if (insertError.message?.includes('duplicate key')) {
          const { data: existing2 } = await supabase
            .from('referrals')
            .select('promo_code')
            .eq('twitter_handle', handle)
            .single();
          
          if (existing2) {
            setPromoCode(existing2.promo_code);
            setStep(2);
            return;
          }
        }
        setError('Failed to generate. Please try again');
      } else {
        setPromoCode(code);
        setStep(2);
      }
    } catch (err) {
      setError('Network error. Please try again');
    } finally {
      setLoading(false);
    }
  };

  // Submit tweet verification
  const submitTweet = async () => {
    if (!tweetUrl.trim()) {
      setError('Please enter your tweet URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 获取推广者信息
      const { data: referral, error: refError } = await supabase
        .from('referrals')
        .select('*')
        .eq('promo_code', promoCode)
        .single();

      if (refError || !referral) {
        setError('Invalid referral code');
        setLoading(false);
        return;
      }

      // Check if tweet already verified
      const { data: existingTweet } = await supabase
        .from('verified_tweets')
        .select('*')
        .eq('tweet_url', tweetUrl)
        .single();

      if (existingTweet) {
        setError('This tweet has already been verified');
        setLoading(false);
        return;
      }

      // Record tweet
      await supabase.from('verified_tweets').insert({
        referral_id: referral.id,
        twitter_handle: referral.twitter_handle,
        tweet_url: tweetUrl
      });

      // Update referral count
      const newCount = referral.verified_tweets + 1;
      const canClaim = newCount >= 10;

      await supabase
        .from('referrals')
        .update({ 
          verified_tweets: newCount,
          can_claim: canClaim,
          lottery_tickets: canClaim ? 1 : 0
        })
        .eq('id', referral.id);

      // 更新本地状态
      const newReferralData: ReferralData = {
        ...referralData!,
        verifiedTweets: newCount,
        canClaim,
        lotteryTickets: canClaim ? 1 : 0
      };
      setReferralData(newReferralData);

      if (newCount >= 10) {
        setStep(4);
      } else {
        setStep(3);
      }
    } catch (err) {
      setError('Network error. Please try again');
    } finally {
      setLoading(false);
    }
  };

  // Claim prize
  const claimPrize = async () => {
    if (!referralData?.canClaim) return;

    setLoading(true);
    setError('');

    try {
      // Get referral info
      const { data: referral, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('promo_code', promoCode)
        .single();

      if (error || !referral) {
        setError('Invalid referral code');
        setLoading(false);
        return;
      }

      if (referral.claimed) {
        setError('你已经中过奖了！');
        setLoading(false);
        return;
      }

      const WIN_PROBABILITY = 0.1;
      const MAX_ATTEMPTS = 3;
      const won = Math.random() < WIN_PROBABILITY;

      await supabase
        .from('referrals')
        .update({
          claimed: won,
          claim_attempts: (referral.claim_attempts || 0) + 1,
          won_at: won ? new Date().toISOString() : null
        })
        .eq('id', referral.id);

      if (won) {
        await supabase.from('winners').insert({
          referral_id: referral.id,
          twitter_handle: referral.twitter_handle,
          prize: 'MiniBot PC'
        });
        alert('🎉 恭喜！你中奖了！我们会尽快联系你发送主机！');
      } else {
        alert('很遗憾，这次没有中奖。继续推广可以增加抽奖机会！');
      }

      // 更新数据
      setReferralData({
        ...referralData,
        claimed: won
      });
    } catch (err) {
      setError('Network error. Please try again');
    } finally {
      setLoading(false);
    }
  };

  // Share referral link
  const shareReferral = () => {
    const shareText = `I just got a MiniBot PC! The private AI assistant in a box. Use my referral link:`;
    const shareUrl = `https://www.openclawai.shop/ref/${promoCode}`;
    const hashtags = 'MiniBotPC,AIPrivacy';
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
    
    window.open(twitterUrl, '_blank');
  };

  return (
    <section className="w-full px-4 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* 标题 */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          🎁 Refer & Win a Free MiniBot PC!
        </h2>
        <p className="text-muted-foreground mb-8">
        </p>
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Step 1: 输入 Twitter 用户名 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Twitter className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">Step 1: Enter Your Twitter</h3>
            
            <div className="flex gap-3 mb-4">
              <span className="flex items-center px-4 bg-gray-100 rounded-lg text-gray-500">@</span>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="your twitter username"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={generateCode}
              disabled={loading}
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Get My Referral Code'}
            </button>
          </div>
        )}

        {/* Step 2: Post Tweet */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Twitter className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">Step 2: Tweet About MiniBot PC</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-gray-600 mb-2">Copy and post this tweet:</p>
              <p className="text-sm font-medium mb-2">
                I just got a MiniBot PC! The private AI assistant in a box.
              </p>
              <p className="text-sm text-primary font-mono mb-2">
                Use my referral link: https://www.openclawai.shop/ref/{promoCode}
              </p>
              <p className="text-sm text-gray-500">#MiniBotPC #AIPrivacy</p>
            </div>

            <button
              onClick={shareReferral}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
            >
              🐦 Post Tweet Now
            </button>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-gray-600 mb-2">Paste your tweet link here:</p>
              <input
                type="url"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://twitter.com/yourname/status/..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              />

              <button
                onClick={submitTweet}
                disabled={loading}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify My Tweet'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Track Progress */}
        {step === 3 && referralData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            
            {/* 进度条 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Verified Referrals</span>
                <span>{referralData.verifiedTweets} / 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(referralData.verifiedTweets * 10, 100)}%` }}
                />
              </div>
            </div>

            {/* 统计 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{referralData.verifiedTweets}</p>
                <p className="text-xs text-gray-500">Verified</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{referralData.lotteryTickets}</p>
                <p className="text-xs text-gray-500">Lottery Tickets</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{10 - referralData.verifiedTweets}</p>
                <p className="text-xs text-gray-500">More Needed</p>
              </div>
            </div>

            {/* Share link */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Your referral link:</p>
              <code className="text-sm bg-white px-3 py-2 rounded border block">
                https://www.openclawai.shop/ref/{referralData.code}
              </code>
            </div>

            <button
              onClick={shareReferral}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
            >
              🔗 Share Your Link
            </button>

            {/* Claim prize button */}
            {referralData.canClaim && (
              <button
                onClick={claimPrize}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? '抽奖中...' : '🎰 Claim Prize - 10% Win Chance!'}
              </button>
            )}

            {!referralData.canClaim && (
              <p className="text-sm text-gray-500">
                Keep sharing! You need {10 - referralData.verifiedTweets} more verified referrals to unlock the lottery.
              </p>
            )}
          </div>
        )}

        {/* Step 4: 抽奖结果 */}
        {step === 4 && referralData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">🎉 Lottery Unlocked!</h3>
            
            <p className="text-muted-foreground mb-6">
              You've successfully referred {referralData.verifiedTweets} people! 
              You now have {referralData.lotteryTickets} lottery ticket(s).
            </p>

            <button
              onClick={claimPrize}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? '🎰 Drawing...' : '🎰 Try Your Luck!'}
            </button>

            <p className="text-xs text-gray-400 mt-4">
              10% chance to win a free MiniBot PC! Winners will be contacted via Twitter DM.
            </p>
          </div>
        )}

        {/* 规则说明 */}
        <div className="mt-8 text-xs text-gray-500">
          <p>Rules: 1) Must tweet with your unique link 2) 10 valid referrals required 3) 10% win chance 4) Maximum 3 attempts per person 5) Winners contacted within 48 hours</p>
        </div>
      </div>
    </section>
  );
}
