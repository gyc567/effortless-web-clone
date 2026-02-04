# Vercel 环境变量配置指南

## 通过 Vercel Dashboard（最简单）

1. 访问 https://vercel.com
2. 点击项目 `effortless-web-clone`
3. 进入 **Settings** → **Environment Variables**
4. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `your-publishable-key` |

5. 选择 **Production** 环境
6. 点击 **Add**
7. 重新部署项目

---

## 通过 Vercel CLI

```bash
# 安装并登录
npm install -g vercel
vercel login

# 进入项目
cd effortless-web-clone

# 链接项目
vercel link

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# 输入: https://your-project.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY production  
# 输入: your-publishable-key

# 重新部署
vercel --prod
```

---

## 验证

部署完成后检查：
- ✅ Environment Variables 已添加
- ✅ 值正确
- ✅ 项目重新部署

---

## 故障排除

**推广功能不工作?**
1. 检查环境变量是否配置
2. 确认 Supabase 表已创建
3. 重新部署

**API 500 错误?**
1. 检查 Supabase URL 正确性
2. 确认 API Key 权限

---

*创建: 2026-02-04*
