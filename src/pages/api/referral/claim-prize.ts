// 抽奖 API
// POST /api/referral/claim-prize

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// 抽奖配置
const WIN_PROBABILITY = 0.1; // 10% 中奖率
const MAX_ATTEMPTS = 3; // 最多3次抽奖机会

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { promoCode } = req.body;

  if (!promoCode) {
    return res.status(400).json({ error: '缺少推广码' });
  }

  try {
    // 1. 获取推广者信息
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .select('*')
      .eq('promo_code', promoCode)
      .single();

    if (referralError || !referral) {
      return res.status(400).json({ error: '推广码无效' });
    }

    // 2. 检查是否有抽奖资格
    if (!referral.can_claim) {
      return res.status(400).json({ 
        error: '需要至少 10 个有效推广才能抽奖' 
      });
    }

    // 3. 检查是否已用完抽奖次数
    const usedAttempts = referral.claim_attempts || 0;
    if (usedAttempts >= MAX_ATTEMPTS) {
      return res.status(400).json({ 
        error: `已用完 ${MAX_ATTEMPTS} 次抽奖机会` 
      });
    }

    // 4. 如果已经中奖，不能再抽
    if (referral.claimed) {
      return res.status(400).json({ 
        error: '你已经中过奖了！' 
      });
    }

    // 5. 执行抽奖
    const won = Math.random() < WIN_PROBABILITY;

    // 6. 更新记录
    const { data: updatedReferral, error: updateError } = await supabase
      .from('referrals')
      .update({
        claimed: won,
        claim_attempts: usedAttempts + 1,
        won_at: won ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', referral.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating referral:', updateError);
      return res.status(500).json({ error: '抽奖记录失败' });
    }

    // 7. 如果中奖，发送通知（这里只是记录，实际需要邮件/DM 通知）
    if (won) {
      // 记录中奖信息用于后续处理
      await supabase
        .from('winners')
        .insert({
          referral_id: referral.id,
          twitter_handle: referral.twitter_handle,
          prize: 'MiniBot PC',
          claimed: true,
          shipped: false,
          created_at: new Date().toISOString()
        });

      // TODO: 发送 Twitter DM 或邮件通知中奖者
      console.log(`🎉 新中奖者: @${referral.twitter_handle}`);
    }

    res.json({
      success: true,
      won,
      message: won 
        ? '🎉 恭喜！你中奖了！我们会尽快联系你发送主机！'
        : '很遗憾，这次没有中奖。继续推广可以增加抽奖机会！',
      updatedData: {
        code: updatedReferral.promo_code,
        verifiedTweets: updatedReferral.verified_tweets,
        canClaim: updatedReferral.can_claim,
        claimed: updatedReferral.claimed,
        lotteryTickets: updatedReferral.lottery_tickets,
        remainingAttempts: MAX_ATTEMPTS - (usedAttempts + 1)
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}
