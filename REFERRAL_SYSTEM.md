# 🎁 MiniBot PC 推广奖励系统 - 使用指南

## 📋 功能概述

用户通过 Twitter 推广网站，推广 10 人后可免费抽奖获得主机！

---

## 🚀 快速开始

### 1. 部署到 Vercel
```bash
# 推送代码后，Vercel 会自动部署
# 访问 https://www.openclawai.shop 查看效果
```

### 2. 设置 Supabase 数据库

#### 选项 A: 通过 Supabase Dashboard
1. 访问 https://supabase.com 创建新项目
2. 进入 SQL Editor
3. 复制 `supabase/referral-schema.sql` 内容并执行

#### 选项 B: 通过命令行
```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 执行迁移
supabase db push
```

### 3. 配置环境变量

在 Vercel 中设置以下环境变量：

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

---

## 🎯 用户操作流程

### 第一步：获取推广码
1. 访问 https://www.openclawai.shop
2. 滚动到 "Refer & Win" 区域
3. 输入 Twitter 用户名
4. 点击 "Get My Referral Code"

### 第二步：发推文
1. 点击 "Post Tweet Now" 按钮
2. 自动跳转到 Twitter
3. 使用提供的模板发推文：
   ```
   I just got a MiniBot PC! The private AI assistant in a box.
   Use my referral link: https://www.openclawai.shop/ref/YOUR_CODE
   #MiniBotPC #AIPrivacy
   ```
4. 复制推文链接
5. 返回网站，粘贴链接并点击 "Verify My Tweet"

### 第三步：推广追踪
- 分享你的推广链接
- 追踪已验证的推广数量
- 达到 10 人后解锁抽奖

### 第四步：抽奖
- 点击 "Claim Prize" 按钮
- 10% 中奖率
- 中奖后我们会通过 Twitter DM 联系你

---

## 📊 系统设计

### 数据库表结构

| 表名 | 说明 |
|------|------|
| `referrals` | 推广者信息 |
| `verified_tweets` | 已验证的推文 |
| `winners` | 中奖者记录 |

### API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/referral/generate` | POST | 生成推广码 |
| `/api/referral/verify-tweet` | POST | 验证推文 |
| `/api/referral/claim-prize` | POST | 抽奖 |

---

## 🔧 自定义配置

### 抽奖概率
在 `claim-prize.ts` 中修改：
```typescript
const WIN_PROBABILITY = 0.1; // 10% 中奖率
```

### 解锁门槛
在 `verify-tweet.ts` 中修改：
```typescript
const REQUIRED_REFERRALS = 10; // 需要 10 个推广
```

### 最多抽奖次数
在 `claim-prize.ts` 中修改：
```typescript
const MAX_ATTEMPTS = 3; // 最多 3 次
```

---

## 📈 统计数据

查看推广效果：
```sql
-- 总推广人数
SELECT COUNT(*) as total_referrals FROM referrals;

-- 已验证推文数
SELECT COUNT(*) as verified_tweets FROM verified_tweets;

-- 中奖人数
SELECT COUNT(*) as total_winners FROM winners;

-- 推广排行榜
SELECT twitter_handle, verified_tweets 
FROM referrals 
ORDER BY verified_tweets DESC 
LIMIT 10;
```

---

## 🐛 常见问题

### Q: 推文验证失败？
A: 请确保：
- 推文链接格式正确
- 推文属于你输入的 Twitter 账号
- 推文包含推广链接

### Q: 推广数量不更新？
A: 只有通过验证的推文才会计入。每个推文只能验证一次。

### Q: 中奖后如何领取？
A: 我们会通过 Twitter DM 联系中奖者，请确保 DM 开放。

### Q: 可以修改推广模板吗？
A: 在 `ReferralPromotion.tsx` 中修改 `shareReferral` 函数。

---

## 📝 更新日志

### v1.0.0 (2026-02-02)
- 初始发布
- 基础推广功能
- 抽奖系统
- 数据库 Schema

---

*最后更新: 2026-02-02*
