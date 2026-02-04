import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

function generatePromoCode(twitterHandle: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const code = `${twitterHandle.substring(0, 4)}_${timestamp}_${random}`.toLowerCase();
  return code;
}

export const config = {
  runtime: 'edge',
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { twitterHandle } = request.body || {};

    if (!twitterHandle || twitterHandle.trim().length < 2) {
      return response.status(400).json({ error: '请输入有效的 Twitter 用户名' });
    }

    const promoCode = generatePromoCode(twitterHandle);

    // 检查是否已存在
    const { data: existing } = await supabase
      .from('referrals')
      .select('*')
      .eq('twitter_handle', twitterHandle.toLowerCase())
      .single();

    if (existing) {
      return response.status(200).json({
        success: true,
        code: existing.promo_code,
        message: '你已有一个推广码'
      });
    }

    // 创建新记录
    const { error: insertError } = await supabase
      .from('referrals')
      .insert({
        twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
        promo_code: promoCode,
        verified_tweets: 0,
        can_claim: false,
        claimed: false,
        lottery_tickets: 0
      });

    if (insertError) {
      return response.status(500).json({ error: '保存失败' });
    }

    return response.status(200).json({
      success: true,
      code: promoCode,
      message: '推广码生成成功！'
    });

  } catch (error: any) {
    return response.status(500).json({ error: error.message || '服务器错误' });
  }
}
