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

export async function onRequestPost({ request }) {
  try {
    const { twitterHandle } = await request.json();

    if (!twitterHandle || twitterHandle.trim().length < 2) {
      return new Response(JSON.stringify({ error: '请输入有效的 Twitter 用户名' }), {
        status: 400
      });
    }

    const promoCode = generatePromoCode(twitterHandle);

    // 检查是否已存在
    const { data: existing } = await supabase
      .from('referrals')
      .select('*')
      .eq('twitter_handle', twitterHandle.toLowerCase())
      .single();

    if (existing) {
      return new Response(JSON.stringify({
        success: true,
        code: existing.promo_code,
        message: '你已有一个推广码'
      }), { status: 200 });
    }

    // 创建新记录
    const { error } = await supabase
      .from('referrals')
      .insert({
        twitter_handle: twitterHandle.toLowerCase().replace('@', ''),
        promo_code: promoCode,
        verified_tweets: 0,
        can_claim: false,
        claimed: false,
        lottery_tickets: 0
      });

    if (error) {
      return new Response(JSON.stringify({ error: '保存失败' }), { status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      code: promoCode,
      message: '推广码生成成功！'
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误' }), { status: 500 });
  }
}
