<template>
  <div class="app">
    <!-- Navigation -->
    <NavBar @connect="showWalletModal = true" />

    <!-- Hero Section - Always show on home -->
    <HeroSection 
      :is-authenticating="authStore.isAuthenticating"
      @connect="showWalletModal = true"
    />

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="section-background">
        <div class="section-glow"></div>
      </div>
      
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="gradient-text">How It Works</span>
          </h2>
          <p class="section-subtitle">Monetize your APIs in 3 simple steps with automatic payments</p>
        </div>
        
        <div class="steps-grid">
          <div class="step-card">
            
            <div class="step-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <polyline points="17 11 19 13 23 9"/>
              </svg>
            </div>
            <h3>Register Your API</h3>
            <p>Connect your wallet and add your API endpoint with a price per request</p>
            <div class="step-badge">Quick Setup</div>
          </div>
          
          <div class="step-card">
           
            <div class="step-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <h3>Get Proxy URL</h3>
            <p>Receive a unique proxy URL that handles authentication and payment automatically</p>
            <div class="step-badge">Instant URL</div>
          </div>
          
          <div class="step-card">
           
            <div class="step-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Earn Instantly</h3>
            <p>Get paid for every request made to your API via blockchain micropayments</p>
            <div class="step-badge">Real-time</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Flow Section -->
    <section class="payment-flow">
      <div class="section-background">
        <div class="section-glow"></div>
      </div>
      
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="gradient-text">Automatic Payment Flow</span>
          </h2>
          <p class="section-subtitle">Seamless micropayments with x402 protocol</p>
        </div>
        
        <div class="flow-container">
          <div class="flow-step">
            <div class="flow-icon-wrapper">
              <div class="flow-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </div>
              <div class="flow-pulse"></div>
            </div>
            <h4>Client Request</h4>
            <p>User makes API request with payment header</p>
          </div>
          
          <div class="flow-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12h38m-8-8l8 8-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="flow-step">
            <div class="flow-icon-wrapper">
              <div class="flow-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div class="flow-pulse"></div>
            </div>
            <h4>x402 Verification</h4>
            <p>Protocol verifies payment signature on-chain</p>
          </div>
          
          <div class="flow-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12h38m-8-8l8 8-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="flow-step">
            <div class="flow-icon-wrapper">
              <div class="flow-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div class="flow-pulse"></div>
            </div>
            <h4>Payment Transfer</h4>
            <p>Funds transferred directly to your wallet</p>
          </div>
          
          <div class="flow-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12h38m-8-8l8 8-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="flow-step">
            <div class="flow-icon-wrapper">
              <div class="flow-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="flow-pulse"></div>
            </div>
            <h4>API Response</h4>
            <p>Client receives data after successful payment</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits">
      <div class="section-background">
        <div class="section-glow"></div>
      </div>
      
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="gradient-text">Why Choose P402?</span>
          </h2>
          <p class="section-subtitle">The most powerful API monetization platform on blockchain</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>Instant Payments</h3>
            <p>Receive payments immediately for each API call with blockchain speed</p>
            <div class="benefit-highlight">< 1 second</div>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Secure & Trustless</h3>
            <p>No middleman - payments go directly from consumer to provider</p>
            <div class="benefit-highlight">100% Secure</div>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Micropayments</h3>
            <p>Charge per request with prices as low as $0.0001</p>
            <div class="benefit-highlight">$0.0001+</div>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3>Multi-Chain Support</h3>
            <p>Works with Solana, Ethereum, Polygon, Base, and Arbitrum</p>
            <div class="benefit-highlight">5+ Chains</div>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Zero Setup</h3>
            <p>No payment integration needed - just add your API endpoint</p>
            <div class="benefit-highlight">2 min setup</div>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
            </div>
            <h3>Real-time Analytics</h3>
            <p>Track usage, revenue, and performance in your dashboard</p>
            <div class="benefit-highlight">Live Data</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-stack">
      <div class="tech-stack-background">
        <div class="tech-glow"></div>
      </div>
      
      <div class="container">
        <div class="tech-header">
          <h2 class="tech-title">
            <span class="gradient-text">Built With</span>
            <span class="gradient-text">Cutting-Edge Technology</span>
          </h2>
          <p class="tech-subtitle">Powered by the most advanced blockchain and web technologies</p>
        </div>
        
        <div class="tech-grid">
          <!-- Blockchain -->
          <div class="tech-card">
            <div class="tech-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <h3>Blockchain</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">◎</span>
                <span class="tech-name">Solana</span>
                <span class="tech-badge">Fast</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">Ξ</span>
                <span class="tech-name">Ethereum</span>
                <span class="tech-badge">Secure</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">⬡</span>
                <span class="tech-name">Polygon</span>
                <span class="tech-badge">Scalable</span>
              </div>
            </div>
          </div>

          <!-- Protocol -->
          <div class="tech-card">
            <div class="tech-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <h3>Protocol</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🔐</span>
                <span class="tech-name">x402 Payment</span>
                <span class="tech-badge">Core</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">💳</span>
                <span class="tech-name">p402 Facilitator</span>
                <span class="tech-badge">Powered</span>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="tech-card">
            <div class="tech-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
              <h3>Infrastructure</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">☁️</span>
                <span class="tech-name">Cloudflare Workers</span>
                <span class="tech-badge">Edge</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🗄️</span>
                <span class="tech-name">D1 Database</span>
                <span class="tech-badge">SQLite</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">⚙️</span>
                <span class="tech-name">Hono Framework</span>
                <span class="tech-badge">Fast</span>
              </div>
            </div>
          </div>

          <!-- Frontend -->
          <div class="tech-card">
            <div class="tech-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <h3>Frontend</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🖼️</span>
                <span class="tech-name">Vue 3</span>
                <span class="tech-badge">Reactive</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">⚡</span>
                <span class="tech-name">Vite</span>
                <span class="tech-badge">Lightning</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🎨</span>
                <span class="tech-name">TypeScript</span>
                <span class="tech-badge">Type-Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-background">
        <div class="cta-glow"></div>
        <div class="cta-grid-pattern"></div>
      </div>
      
      <div class="container">
        <div class="cta-content">
          <!-- Main Heading -->
          <div class="cta-header">
            <h2 class="cta-title">
              <span class="gradient-text">Ready to Monetize</span>
              <span class="gradient-text">Your APIs?</span>
            </h2>
            <p class="cta-subtitle">
              Join the future of API monetization with automatic blockchain payments.
              <br />
              Start earning from every API call instantly.
            </p>
          </div>

          <!-- Feature Highlights -->
          <div class="cta-features">
            <div class="cta-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Instant Setup</span>
            </div>
            <div class="cta-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>Pay-per-Request</span>
            </div>
            <div class="cta-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>100% Secure</span>
            </div>
          </div>

          <!-- Token Card -->
          <div class="token-card">
            <div class="token-card-header">
              <div class="token-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>P402 Token</span>
              </div>
              <span class="token-platform">on Pump.fun</span>
            </div>
            
            <div class="token-card-body">
              <div class="token-address-wrapper">
                <code class="token-address">FKN952FbrdwDQwhApcNBX683grSA5yuHgFduRHEVpump</code>
                <button @click="copyTokenAddress" class="btn-icon" title="Copy address">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
              
              <a 
                href="https://pump.fun/coin/FKN952FbrdwDQwhApcNBX683grSA5yuHgFduRHEVpump" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-token-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Token
              </a>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="cta-actions">
            <button @click="showWalletModal = true" class="btn-cta-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <span>Get Started Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            
            <button @click="$router.push('/marketplace')" class="btn-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Explore APIs</span>
            </button>
          </div>

          <!-- Stats Row -->
          <div class="cta-stats">
            <div class="cta-stat">
              <span class="stat-value">⚡</span>
              <span class="stat-label">Instant Payments</span>
            </div>
            <div class="cta-stat-divider"></div>
            <div class="cta-stat">
              <span class="stat-value">🔒</span>
              <span class="stat-label">Secure & Trustless</span>
            </div>
            <div class="cta-stat-divider"></div>
            <div class="cta-stat">
              <span class="stat-value">🌐</span>
              <span class="stat-label">Multi-Chain</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wallet Selection Modal -->
    <WalletModal 
      :show="showWalletModal" 
      @close="showWalletModal = false"
      @select="onWalletSelect"
    />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';
import NavBar from '../components/NavBar.vue';
import WalletModal from '../components/WalletModal.vue';
import HeroSection from '../components/HeroSection.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const showWalletModal = ref(false);

const tokenAddress = 'FKN952FbrdwDQwhApcNBX683grSA5yuHgFduRHEVpump';

async function copyTokenAddress() {
  try {
    await navigator.clipboard.writeText(tokenAddress);
    toast.success('Token address copied to clipboard!');
  } catch (error) {
    toast.error('Failed to copy address');
    console.error('Copy error:', error);
  }
}

async function onWalletSelect() {
  try {
    await authStore.connectWallet();
    toast.success('Wallet connected successfully!');
    // Redirect to dashboard after successful connection
    router.push('/dashboard');
  } catch (error) {
    toast.error('Failed to connect wallet. Please try again.');
    console.error('Connection error:', error);
  }
}

onMounted(async () => {
  await authStore.checkSession();
  // If already authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    router.push('/dashboard');
  }
});
</script>

<style scoped>
/* Global Section Styles */
.section-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.section-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, transparent 70%);
  filter: blur(60px);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 42px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  max-width: 600px;
  margin: 0 auto;
}

/* How It Works Section */
.how-it-works {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  position: relative;
  z-index: 1;
}

.step-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff6b00, #ff8c00);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.step-card:hover::before {
  opacity: 1;
}

.step-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(255, 107, 0, 0.2);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step-number span {
  font-size: 48px;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.step-number svg {
  color: rgba(34, 197, 94, 0.6);
}

.step-icon-box {
  width: 64px;
  height: 64px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.step-card:hover .step-icon-box {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: scale(1.1);
}

.step-icon-box svg {
  color: #ff6b00;
}

.step-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #ffffff;
}

.step-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 16px;
}

.step-badge {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #ff8c00;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Payment Flow Section */
.payment-flow {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.flow-step {
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.flow-step:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.15);
}

.flow-icon-wrapper {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
}

.flow-icon {
  width: 72px;
  height: 72px;
  background: rgba(255, 107, 0, 0.1);
  border: 2px solid rgba(255, 107, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.flow-step:hover .flow-icon {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: scale(1.1);
}

.flow-icon svg {
  color: #ff6b00;
}

.flow-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 107, 0, 0.4);
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.flow-step h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
}

.flow-step p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

.flow-arrow {
  flex-shrink: 0;
  color: rgba(255, 107, 0, 0.4);
}

.flow-arrow svg {
  animation: arrow-move 2s ease-in-out infinite;
}

@keyframes arrow-move {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(8px);
  }
}

/* Benefits Section */
.benefits {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  position: relative;
  z-index: 1;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(255, 140, 0, 0.3));
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-card:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(255, 107, 0, 0.2);
}

.benefit-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon-wrapper {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: rotate(5deg) scale(1.1);
}

.benefit-icon-wrapper svg {
  color: #ff6b00;
}

.benefit-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #ffffff;
}

.benefit-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 14px;
}

.benefit-highlight {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #ff8c00;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive for all sections */
@media (max-width: 768px) {
  .how-it-works,
  .payment-flow,
  .benefits {
    padding: 80px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 32px;
  }

  .section-subtitle {
    font-size: 14px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .step-card {
    padding: 24px;
  }

  .flow-container {
    flex-direction: column;
    gap: 16px;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .benefit-card {
    padding: 24px;
  }
}

/* Tech Stack Section */
.tech-stack {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.tech-stack-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.tech-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%);
  filter: blur(60px);
}

.tech-header {
  text-align: center;
  margin-bottom: 60px;
}

.tech-title {
  font-size: 42px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  position: relative;
  z-index: 1;
}

.tech-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-card:hover::before {
  opacity: 1;
}

.tech-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.15);
}

.tech-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 107, 0, 0.1);
}

.tech-card-header svg {
  color: #ff6b00;
  flex-shrink: 0;
}

.tech-card-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tech-item:hover {
  background: rgba(255, 107, 0, 0.05);
  border-color: rgba(255, 107, 0, 0.3);
  transform: translateX(4px);
}

.tech-icon {
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tech-name {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.tech-badge {
  padding: 4px 10px;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  color: #ff8c00;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

/* Responsive for Tech Stack */
@media (max-width: 768px) {
  .tech-stack {
    padding: 80px 0;
  }

  .tech-header {
    margin-bottom: 40px;
  }

  .tech-title {
    font-size: 32px;
  }

  .tech-subtitle {
    font-size: 14px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tech-card {
    padding: 20px;
  }
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%);
  filter: blur(80px);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

.cta-grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 107, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
}

.container {
  position: relative;
  z-index: 1;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* Header */
.cta-header {
  text-align: center;
}

.cta-title {
  font-size: 48px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 50%, #ffaa00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cta-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Features */
.cta-features {
  display: flex;
  gap: 32px;
  padding: 20px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.cta-feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 600;
}

.cta-feature svg {
  color: #ff6b00;
  flex-shrink: 0;
}

/* Token Card */
.token-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.token-card:hover {
  border-color: rgba(255, 107, 0, 0.5);
  box-shadow: 0 8px 32px rgba(255, 107, 0, 0.2);
}

.token-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 107, 0, 0.05);
  border-bottom: 1px solid rgba(255, 107, 0, 0.2);
}

.token-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #ff6b00;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.token-badge svg {
  color: #ff6b00;
}

.token-platform {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.token-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.token-address-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 12px 14px;
  transition: all 0.2s ease;
}

.token-address-wrapper:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 107, 0, 0.3);
}

.token-address {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  word-break: break-all;
  line-height: 1.4;
}

.btn-icon {
  padding: 6px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 6px;
  color: #ff6b00;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-icon:hover {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: scale(1.1);
}

.btn-token-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 8px;
  color: #ff6b00;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-token-link:hover {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: translateX(2px);
}

.btn-token-link svg {
  flex-shrink: 0;
}

/* CTA Actions */
.cta-actions {
  display: flex;
  gap: 16px;
  width: 100%;
}

.btn-cta-primary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-cta-primary:hover::before {
  left: 100%;
}

.btn-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 107, 0, 0.5);
}

.btn-cta-primary svg:first-child {
  animation: spin 2s linear infinite;
}

.btn-cta-primary svg:last-child {
  transition: transform 0.3s ease;
}

.btn-cta-primary:hover svg:last-child {
  transform: translateX(4px);
}

.btn-cta-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  color: #ff6b00;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cta-secondary:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: #ff6b00;
  transform: translateY(-2px);
}

/* Stats Row */
.cta-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.15);
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.cta-stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 20px;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

.cta-stat-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 107, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section {
    padding: 80px 0;
  }

  .cta-content {
    gap: 32px;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-subtitle {
    font-size: 16px;
  }

  .cta-features {
    flex-direction: column;
    gap: 16px;
    padding: 16px 20px;
    border-radius: 12px;
  }

  .cta-actions {
    flex-direction: column;
  }

  .btn-cta-primary,
  .btn-cta-secondary {
    width: 100%;
  }

  .cta-stats {
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 12px;
  }

  .cta-stat-divider {
    width: 100%;
    height: 1px;
  }

  .token-address {
    font-size: 10px;
  }
}
</style>

