import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function onRequestPost({ request }) {
  try {
    const { twitterHandle, tweetUrl, promoCode } = await request.json();

    if (!twitterHandle || !tweetUrl || !promoCode) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    // 验证推文链接格式
    const tweetRegex = /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+$/;
    if (!tweetRegex.test(tweetUrl)) {
      return new Response(JSON.stringify({ error: '推文链接格式无效' }), { status: 400 });
    }

    // 检查推广码
    const { data: referral, error: refError } = await supabase
      .from('referrals')
      .select('*')
      .eq('promo_code', promoCode)
      .single();

    if (refError || !referral) {
      return new Response(JSON.stringify({ error: '推广码无效' }), { status: 400 });
    }

    // 检查是否已验证此推文
    const { data: existingTweet } = await supabase
      .from('verified_tweets')
      .select('*')
      .eq('tweet_url', tweetUrl)
      .single();

    if (existingTweet) {
      return new Response(JSON.stringify({ error: '此推文已被验证' }), { status: 400 });
    }

    // 记录推文
    const { error: insertError } = await supabase
      .from('verified_tweets')
      .insert({
        referral_id: referral.id,
        twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
        tweet_url: tweetUrl
      });

    if (insertError) {
      return new Response(JSON.stringify({ error: '验证记录失败' }), { status: 500 });
    }

    // 更新推广者计数
    const newCount = referral.verified_tweets + 1;
    const canClaim = newCount >= 10;
    const lotteryTickets = canClaim ? 1 : 0;

    await supabase
      .from('referrals')
      .update({ 
        verified_tweets: newCount,
        can_claim: canClaim,
        lottery_tickets: lotteryTickets
      })
      .eq('id', referral.id);

    return new Response(JSON.stringify({
      success: true,
      message: '推文验证成功！',
      referralData: {
        verifiedTweets: newCount,
        canClaim,
        lotteryTickets
      }
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误' }), { status: 500 });
  }
}
