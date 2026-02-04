const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const WIN_PROBABILITY = 0.1;
const MAX_ATTEMPTS = 3;

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { promoCode } = request.body || {};

  if (!promoCode) {
    return response.status(400).json({ error: '缺少推广码' });
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

    if (!referral.can_claim) {
      return response.status(400).json({ error: '需要至少 10 个有效推广' });
    }

    if (referral.claimed) {
      return response.status(400).json({ error: '你已经中过奖了' });
    }

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

    return response.status(200).json({
      success: true,
      won,
      message: won ? '🎉 恭喜！你中奖了！' : '很遗憾，没有中奖。',
      remainingAttempts: MAX_ATTEMPTS - (referral.claim_attempts || 0) - 1
    });

  } catch (error) {
    return response.status(500).json({ error: error.message || '服务器错误' });
  }
};
