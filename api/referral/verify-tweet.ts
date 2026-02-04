import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { twitterHandle, tweetUrl, promoCode } = request.body || {};

  if (!twitterHandle || !tweetUrl || !promoCode) {
    return response.status(400).json({ error: '缺少必要参数' });
  }

  try {
    const { data: referral } = await supabase
      .from('referrals')
      .select('*')
      .eq('promo_code', promoCode)
      .single();

    if (!referral) {
      return response.status(400).json({ error: '推广码无效' });
    }

    const { data: existingTweet } = await supabase
      .from('verified_tweets')
      .select('*')
      .eq('tweet_url', tweetUrl)
      .single();

    if (existingTweet) {
      return response.status(400).json({ error: '此推文已被验证' });
    }

    await supabase.from('verified_tweets').insert({
      referral_id: referral.id,
      twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
      tweet_url: tweetUrl
    });

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

    return response.status(200).json({
      success: true,
      message: '推文验证成功！',
      referralData: { verifiedTweets: newCount, canClaim }
    });

  } catch (error: any) {
    return response.status(500).json({ error: error.message || '服务器错误' });
  }
}
