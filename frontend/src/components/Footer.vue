<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <img src="/logo.png" alt="P402" class="logo" />
      </div>

      <nav class="footer-nav">
        <a href="/">Home</a>
        <a href="/#/marketplace">Marketplace</a>
        <a href="/#/dashboard">Dashboard</a>
        <a href="https://github.com/p402store/p402" target="_blank" rel="noopener">GitHub</a>
        <a href="https://pump.fun/coin/FKN952FbrdwDQwhApcNBX683grSA5yuHgFduRHEVpump" target="_blank" rel="noopener">PumpFun</a>
        <a href="https://x.com/codp402" target="_blank" rel="noopener">Twitter</a>
      </nav>

      <div class="footer-socials">
        <a href="https://x.com/codp402" target="_blank" rel="noopener" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://github.com/p402store/p402" target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 P402 • Powered by Solana</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
.footer {
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 107, 0, 0.1);
  padding: 1.5rem 2rem 1rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

/* Logo & Brand */
.footer-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo {
  height: 36px;
  border-radius: 4px;
}

.brand-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ff6b00;
  letter-spacing: 0.05em;
}

/* Navigation */
.footer-nav {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  border-bottom: 1px solid transparent;
}

.footer-nav a:hover {
  color: #ff6b00;
  border-bottom-color: #ff6b00;
}

/* Social Icons */
.footer-socials {
  display: flex;
  gap: 0.8rem;
}

.footer-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.footer-socials svg {
  width: 16px;
  height: 16px;
}

.footer-socials a:hover {
  color: #ff6b00;
  border-color: #ff6b00;
  background: rgba(255, 107, 0, 0.05);
}

/* Bottom */
.footer-bottom {
  max-width: 1400px;
  margin: 0.75rem auto 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 107, 0, 0.1);
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.footer-bottom p {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 1rem 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .footer-nav {
    gap: 1rem;
    font-size: 0.85rem;
  }

  .footer-socials {
    order: 3;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 0.8rem 1rem;
  }

  .footer-content {
    gap: 0.75rem;
  }

  .footer-left {
    gap: 0.4rem;
  }

  .logo {
    width: 20px;
    height: 20px;
  }

  .brand-name {
    font-size: 0.85rem;
  }

  .footer-nav {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
  }

  .footer-socials {
    gap: 0.6rem;
  }

  .footer-socials a {
    width: 28px;
    height: 28px;
  }

  .footer-socials svg {
    width: 14px;
    height: 14px;
  }

  .footer-bottom {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
