// 验证推文 API
// POST /api/referral/verify-tweet

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// 验证推文链接格式
function isValidTweetUrl(url: string): boolean {
  const tweetRegex = /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+$/;
  return tweetRegex.test(url);
}

// 从推文链接提取用户名
function getTwitterHandleFromUrl(url: string): string | null {
  const match = url.match(/twitter\.com\/([a-zA-Z0-9_]+)\/status/);
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { twitterHandle, tweetUrl, promoCode } = req.body;

  // 验证输入
  if (!twitterHandle || !tweetUrl || !promoCode) {
    return res.status(400).json({ error: '缺少必要参数' });
  }

  if (!isValidTweetUrl(tweetUrl)) {
    return res.status(400).json({ error: '推文链接格式无效' });
  }

  try {
    // 1. 验证推文链接属于正确的用户
    const urlHandle = getTwitterHandleFromUrl(tweetUrl);
    if (urlHandle?.toLowerCase() !== twitterHandle.toLowerCase().replace('@', '')) {
      return res.status(400).json({ 
        error: '推文链接必须属于你输入的 Twitter 账号' 
      });
    }

    // 2. 检查推广码是否存在
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .select('*')
      .eq('promo_code', promoCode)
      .single();

    if (referralError || !referral) {
      return res.status(400).json({ error: '推广码无效' });
    }

    // 3. 检查推文是否已被验证
    const { data: existingTweet, error: tweetError } = await supabase
      .from('verified_tweets')
      .select('*')
      .eq('tweet_url', tweetUrl)
      .single();

    if (existingTweet) {
      return res.status(400).json({ error: '此推文已被验证' });
    }

    // 4. 验证推文包含推广链接 (可选，这里先跳过 Twitter API 调用)
    // TODO: 调用 Twitter API 验证推文内容
    
    // 5. 记录验证的推文
    const { error: insertError } = await supabase
      .from('verified_tweets')
      .insert({
        referral_id: referral.id,
        twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
        tweet_url: tweetUrl,
        verified_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error saving tweet:', insertError);
      return res.status(500).json({ error: '验证记录失败' });
    }

    // 6. 更新推广者的计数
    const newVerifiedCount = referral.verified_tweets + 1;
    const canClaim = newVerifiedCount >= 10;
    const lotteryTickets = Math.floor(newVerifiedCount / 5) + (canClaim ? 1 : 0);

    const { data: updatedReferral, error: updateError } = await supabase
      .from('referrals')
      .update({
        verified_tweets: newVerifiedCount,
        can_claim: canClaim,
        lottery_tickets: lotteryTickets,
        updated_at: new Date().toISOString()
      })
      .eq('id', referral.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating referral:', updateError);
      return res.status(500).json({ error: '更新失败' });
    }

    res.json({
      success: true,
      message: '推文验证成功！',
      referralData: {
        code: updatedReferral.promo_code,
        twitterHandle: updatedReferral.twitter_handle,
        verifiedTweets: updatedReferral.verified_tweets,
        canClaim: updatedReferral.can_claim,
        claimed: updatedReferral.claimed,
        lotteryTickets: updatedReferral.lottery_tickets
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}
