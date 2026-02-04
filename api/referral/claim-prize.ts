import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const WIN_PROBABILITY = 0.1; // 10% 中奖率
const MAX_ATTEMPTS = 3;

export async function onRequestPost({ request }) {
  try {
    const { promoCode } = await request.json();

    if (!promoCode) {
      return new Response(JSON.stringify({ error: '缺少推广码' }), { status: 400 });
    }

    // 获取推广者信息
    const { data: referral, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('promo_code', promoCode)
      .single();

    if (error || !referral) {
      return new Response(JSON.stringify({ error: '推广码无效' }), { status: 400 });
    }

    if (!referral.can_claim) {
      return new Response(JSON.stringify({ error: '需要至少 10 个有效推广才能抽奖' }), { status: 400 });
    }

    if (referral.claimed) {
      return new Response(JSON.stringify({ error: '你已经中过奖了！' }), { status: 400 });
    }

    if (referral.claim_attempts >= MAX_ATTEMPTS) {
      return new Response(JSON.stringify({ error: `已用完 ${MAX_ATTEMPTS} 次抽奖机会` }), { status: 400 });
    }

    // 执行抽奖
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
    }

    return new Response(JSON.stringify({
      success: true,
      won,
      message: won 
        ? '🎉 恭喜！你中奖了！' 
        : '很遗憾，这次没有中奖。',
      remainingAttempts: MAX_ATTEMPTS - (referral.claim_attempts || 0) - 1
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误' }), { status: 500 });
  }
}
