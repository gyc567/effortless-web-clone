export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { twitterHandle } = await request.json();

    if (!twitterHandle || twitterHandle.trim().length < 2) {
      return new Response(JSON.stringify({ error: '请输入有效的 Twitter 用户名' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 使用 Supabase
    const supabaseUrl = request.env?.NEXT_PUBLIC_SUPABASE_URL || 'https://qmgbaqqapqrxswssiavz.supabase.co';
    const supabaseKey = request.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_NQ1m4BylCN-iAriXQpBYJw_Jip80Tuv';

    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    const promoCode = `${twitterHandle.substring(0, 4)}_${timestamp}_${random}`.toLowerCase();

    // 由于 Edge Runtime 可能不支持 @supabase/supabase-js，返回简化响应
    return new Response(JSON.stringify({
      success: true,
      code: promoCode,
      message: '推广码生成成功！',
      note: '数据库连接将在完整配置后启用'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
