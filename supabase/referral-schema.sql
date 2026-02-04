-- MiniBot PC 推广系统数据库 Schema
-- 在 Supabase SQL Editor 中执行

-- 1. 创建推广者表
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  twitter_handle VARCHAR(50) NOT NULL UNIQUE,
  promo_code VARCHAR(50) NOT NULL UNIQUE,
  verified_tweets INTEGER DEFAULT 0,
  can_claim BOOLEAN DEFAULT FALSE,
  claimed BOOLEAN DEFAULT FALSE,
  lottery_tickets INTEGER DEFAULT 0,
  claim_attempts INTEGER DEFAULT 0,
  won_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建已验证推文表
CREATE TABLE IF NOT EXISTS verified_tweets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  twitter_handle VARCHAR(50) NOT NULL,
  tweet_url VARCHAR(255) NOT NULL UNIQUE,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建中奖者表
CREATE TABLE IF NOT EXISTS winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id UUID NOT NULL REFERENCES referrals(id),
  twitter_handle VARCHAR(50) NOT NULL,
  prize VARCHAR(100) NOT NULL,
  claimed BOOLEAN DEFAULT TRUE,
  shipped BOOLEAN DEFAULT FALSE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建索引 (PostgreSQL 支持 INDEX IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_referrals_promo_code ON referrals(promo_code);
CREATE INDEX IF NOT EXISTS idx_referrals_twitter_handle ON referrals(twitter_handle);
CREATE INDEX IF NOT EXISTS idx_verified_tweets_referral_id ON verified_tweets(referral_id);
CREATE INDEX IF NOT EXISTS idx_verified_tweets_tweet_url ON verified_tweets(tweet_url);

-- 5. 启用 Row Level Security (RLS)
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_tweets ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- 6. 创建 RLS 策略（公开访问，不需要登录）
DROP POLICY IF EXISTS "Users can view own referrals" ON referrals;
DROP POLICY IF EXISTS "Users can insert own referrals" ON referrals;
DROP POLICY IF EXISTS "Users can view own tweets" ON verified_tweets;

-- 公开访问策略（允许匿名用户操作）
CREATE POLICY "Public can do everything" ON referrals
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can do everything for tweets" ON verified_tweets
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can do everything for winners" ON winners
  FOR ALL USING (true) WITH CHECK (true);

-- 7. 插入示例数据 (可选，取消注释后可测试)
-- INSERT INTO referrals (twitter_handle, promo_code)
-- VALUES ('example_user', 'PROMO_123')
-- ON CONFLICT (twitter_handle) DO NOTHING;

-- 8. 验证查询
-- SELECT * FROM referrals LIMIT 5;
