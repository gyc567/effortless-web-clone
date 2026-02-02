import { useState } from 'react';
import { useRouter } from 'next/router';
import { Check, Twitter, Gift, Users, Trophy } from 'lucide-react';

interface ReferralData {
  code: string;
  twitterHandle: string;
  verifiedTweets: number;
  canClaim: boolean;
  claimed: boolean;
  lotteryTickets: number;
}

export default function ReferralPromotion() {
  const router = useRouter();
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
      setError('请输入你的 Twitter 用户名');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 调用 API 生成推广码
      const res = await fetch('/api/referral/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ twitterHandle: twitterHandle.replace('@', '') })
      });

      const data = await res.json();

      if (data.success) {
        setPromoCode(data.code);
        setStep(2);
      } else {
        setError(data.error || '生成推广码失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 提交推文验证
  const submitTweet = async () => {
    if (!tweetUrl.trim()) {
      setError('请输入你的推文链接');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/referral/verify-tweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          twitterHandle: twitterHandle.replace('@', ''),
          tweetUrl,
          promoCode
        })
      });

      const data = await res.json();

      if (data.success) {
        // 检查是否解锁抽奖
        if (data.referralData.verifiedTweets >= 10) {
          setReferralData(data.referralData);
          setStep(4); // 直接跳到抽奖
        } else {
          setReferralData(data.referralData);
          setStep(3); // 显示进度
        }
      } else {
        setError(data.error || '验证失败，请检查推文链接');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 抽奖
  const claimPrize = async () => {
    if (!referralData?.canClaim) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/referral/claim-prize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCode })
      });

      const data = await res.json();

      if (data.success) {
        if (data.won) {
          alert('🎉 恭喜！你中奖了！我们会尽快联系你发送主机！');
        } else {
          alert('很遗憾，这次没有中奖。继续推广可以增加抽奖机会！');
        }
        // 更新数据
        setReferralData(data.updatedData);
      } else {
        setError(data.error || '抽奖失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 分享推广链接
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
          Promote MiniBot PC on Twitter, verify 10 people, and enter our lottery to win a free主机!
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
              {loading ? '生成中...' : 'Get My Referral Code'}
            </button>
          </div>
        )}

        {/* Step 2: 发推文 */}
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
                {loading ? '验证中...' : 'Verify My Tweet'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 进度追踪 */}
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

            {/* 分享链接 */}
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

            {/* 抽奖按钮 */}
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
