import { PublicKey } from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import bs58 from 'bs58';

export interface AuthSession {
  address: string;
  nonce: string;
  created_at: number;
  expires_at: number;
}

export class AuthService {
  constructor(private db: D1Database) {}

  // Generate a random nonce for signing
  generateNonce(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return bs58.encode(array);
  }

  // Create auth message to be signed
  createAuthMessage(address: string, nonce: string): string {
    return `Sign this message to authenticate with P402\n\nAddress: ${address}\nNonce: ${nonce}\nTimestamp: ${Date.now()}`;
  }

  // Verify Solana signature
  verifySignature(message: string, signature: string, publicKey: string): boolean {
    try {
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = bs58.decode(signature);
      const publicKeyBytes = new PublicKey(publicKey).toBytes();

      return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }

  // Store nonce in database (temporary)
  async storeNonce(address: string, nonce: string): Promise<void> {
    const now = Date.now();
    const expiresAt = now + (5 * 60 * 1000); // 5 minutes expiry

    await this.db
      .prepare(
        `INSERT OR REPLACE INTO auth_nonces (address, nonce, created_at, expires_at) 
         VALUES (?, ?, ?, ?)`
      )
      .bind(address, nonce, now, expiresAt)
      .run();
  }

  // Verify nonce
  async verifyNonce(address: string, nonce: string): Promise<boolean> {
    const result = await this.db
      .prepare(
        `SELECT * FROM auth_nonces 
         WHERE address = ? AND nonce = ? AND expires_at > ?`
      )
      .bind(address, nonce, Date.now())
      .first();

    if (result) {
      // Delete used nonce
      await this.db
        .prepare(`DELETE FROM auth_nonces WHERE address = ? AND nonce = ?`)
        .bind(address, nonce)
        .run();
      return true;
    }

    return false;
  }

  // Create session
  async createSession(address: string): Promise<string> {
    const sessionId = crypto.randomUUID();
    const now = Date.now();
    const expiresAt = now + (30 * 24 * 60 * 60 * 1000); // 30 days

    await this.db
      .prepare(
        `INSERT INTO auth_sessions (id, address, created_at, expires_at) 
         VALUES (?, ?, ?, ?)`
      )
      .bind(sessionId, address, now, expiresAt)
      .run();

    return sessionId;
  }

  // Verify session
  async verifySession(sessionId: string): Promise<string | null> {
    const result = await this.db
      .prepare(
        `SELECT address FROM auth_sessions 
         WHERE id = ? AND expires_at > ?`
      )
      .bind(sessionId, Date.now())
      .first<{ address: string }>();

    return result?.address || null;
  }

  // Delete session
  async deleteSession(sessionId: string): Promise<void> {
    await this.db
      .prepare(`DELETE FROM auth_sessions WHERE id = ?`)
      .bind(sessionId)
      .run();
  }

  // Cleanup expired sessions and nonces
  async cleanup(): Promise<void> {
    const now = Date.now();
    
    await this.db
      .prepare(`DELETE FROM auth_sessions WHERE expires_at < ?`)
      .bind(now)
      .run();

    await this.db
      .prepare(`DELETE FROM auth_nonces WHERE expires_at < ?`)
      .bind(now)
      .run();
  }
}
