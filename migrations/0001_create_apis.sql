-- API kayıtları tablosu
CREATE TABLE IF NOT EXISTS apis (
  id TEXT PRIMARY KEY,
  owner_address TEXT NOT NULL,
  api_name TEXT NOT NULL,
  description TEXT,
  target_url TEXT NOT NULL,
  price TEXT NOT NULL,
  network TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- API endpoint'leri tablosu
CREATE TABLE IF NOT EXISTS api_endpoints (
  id TEXT PRIMARY KEY,
  api_id TEXT NOT NULL,
  path TEXT NOT NULL,
  method TEXT NOT NULL,
  price TEXT,
  FOREIGN KEY (api_id) REFERENCES apis(id) ON DELETE CASCADE,
  UNIQUE(api_id, path, method)
);

-- API kullanım istatistikleri tablosu
CREATE TABLE IF NOT EXISTS api_usage (
  id TEXT PRIMARY KEY,
  api_id TEXT NOT NULL,
  request_count INTEGER DEFAULT 0,
  total_revenue TEXT DEFAULT '$0',
  last_request_at INTEGER,
  FOREIGN KEY (api_id) REFERENCES apis(id) ON DELETE CASCADE,
  UNIQUE(api_id)
);

-- Authentication nonces tablosu
CREATE TABLE IF NOT EXISTS auth_nonces (
  address TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

-- Authentication sessions tablosu
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  address TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_apis_owner ON apis(owner_address);
CREATE INDEX IF NOT EXISTS idx_apis_active ON apis(is_active);
CREATE INDEX IF NOT EXISTS idx_endpoints_api ON api_endpoints(api_id);
CREATE INDEX IF NOT EXISTS idx_usage_api ON api_usage(api_id);
CREATE INDEX IF NOT EXISTS idx_nonces_expires ON auth_nonces(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON auth_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_address ON auth_sessions(address);

