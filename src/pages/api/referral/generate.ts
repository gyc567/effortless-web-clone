// 生成推广码 API
// POST /api/referral/generate

import { createClient } from '@supabase/supabase-js';

// Supabase 配置 (需要设置环境变量)
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// 简单的推广码生成函数
function generatePromoCode(twitterHandle: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const code = `${twitterHandle.substring(0, 4)}_${timestamp}_${random}`.toLowerCase();
  return code;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { twitterHandle } = req.body;

  if (!twitterHandle || twitterHandle.trim().length < 2) {
    return res.status(400).json({ error: '请输入有效的 Twitter 用户名' });
  }

  try {
    // 生成推广码
    const promoCode = generatePromoCode(twitterHandle);

    // 保存到数据库
    const { data: existing, error: checkError } = await supabase
      .from('referrals')
      .select('*')
      .eq('twitter_handle', twitterHandle.toLowerCase())
      .single();

    if (existing) {
      // 用户已存在，返回现有推广码
      return res.json({
        success: true,
        code: existing.promo_code,
        message: '你已有一个推广码'
      });
    }

    // 创建新记录
    const { data, error } = await supabase
      .from('referrals')
      .insert({
        twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
        promo_code: promoCode,
        verified_tweets: 0,
        can_claim: false,
        claimed: false,
        lottery_tickets: 0,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: '保存失败，请重试' });
    }

    res.json({
      success: true,
      code: promoCode,
      message: '推广码生成成功！'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}
