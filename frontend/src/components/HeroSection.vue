<template>
  <section class="hero">
    <div class="hero-background">
      <div class="hero-glow"></div>
      <div class="hero-grid-pattern"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Main Title -->
        <div class="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span>Powered by Blockchain</span>
        </div>
        
        <h1 class="hero-title">
          <span class="title-line">Monetize Your APIs</span>
          <span class="title-line gradient-text">with Solana Payments</span>
        </h1>
        
        <p class="hero-description">
          Connect your Solana wallet, register your APIs, and start earning SOL for every request.
          <br />
          <strong>No setup fees, no monthly subscriptions</strong> - just pay-per-use on Solana.
        </p>
        
        <!-- CTA Buttons -->
        <div class="hero-actions">
          <button 
            @click="$emit('connect')" 
            class="btn-hero-primary"
            :disabled="isAuthenticating"
          >
            <svg v-if="!isAuthenticating" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            <span v-if="isAuthenticating">
              <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Connecting...
            </span>
            <span v-else>Get Started Now</span>
            <svg v-if="!isAuthenticating" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          
          <a href="/#/documentation" class="btn-hero-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 16 12 12 12 8"/>
              <line x1="12" y1="12" x2="12.01" y2="12"/>
            </svg>
            <span>Learn More</span>
          </a>
        </div>
        
        <!-- Stats Row -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-icon">⚡</span>
            <div class="stat-content">
              <span class="stat-value">< 1s</span>
              <span class="stat-label">Payment Time</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-icon">💰</span>
            <div class="stat-content">
              <span class="stat-value">$0.0001</span>
              <span class="stat-label">Min. Price</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-icon">🔒</span>
            <div class="stat-content">
              <span class="stat-value">100%</span>
              <span class="stat-label">Secure</span>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  isAuthenticating: boolean;
}>();

defineEmits<{
  connect: [];
}>();
</script>

<style scoped>
.hero {
  position: relative;
  padding: 20px 0 20px 0;
  text-align: center;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

/* Background Effects */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, transparent 60%);
  filter: blur(80px);
  animation: pulse-glow 6s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.hero-grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 107, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 0, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.4;
}

/* Floating Shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.15), transparent);
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 15%;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  width: 250px;
  height: 250px;
  bottom: 10%;
  left: 20%;
  animation: float 25s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-30px) translateX(20px);
  }
  50% {
    transform: translateY(-60px) translateX(-20px);
  }
  75% {
    transform: translateY(-30px) translateX(20px);
  }
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Content */
.hero-content {
  margin-bottom: 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  color: #ff6b00;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  animation: badge-pulse 3s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 107, 0, 0);
  }
}

.hero-badge svg {
  color: #ff6b00;
}

.hero-title {
  font-size: 64px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title-line {
  display: block;
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
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-description strong {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
}

/* Hero Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
}

.btn-hero-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 36px;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-hero-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn-hero-primary:hover::before {
  left: 100%;
}

.btn-hero-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(255, 107, 0, 0.5);
}

.btn-hero-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-hero-primary svg:first-child {
  animation: spin 2s linear infinite;
}

.btn-hero-primary svg:last-child {
  transition: transform 0.3s ease;
}

.btn-hero-primary:hover:not(:disabled) svg:last-child {
  transform: translateX(4px);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-hero-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  color: #ff6b00;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-hero-secondary:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: #ff6b00;
  transform: translateY(-3px);
}

/* Hero Stats */
.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  font-size: 28px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.stat-value {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 107, 0, 0.3);
}

/* Feature Cards */
.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 36px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
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

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(255, 107, 0, 0.2);
}

.feature-icon-wrapper {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  background: rgba(255, 107, 0, 0.1);
  border: 2px solid rgba(255, 107, 0, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-wrapper {
  background: rgba(255, 107, 0, 0.2);
  border-color: #ff6b00;
  transform: scale(1.1) rotate(5deg);
}

.feature-icon-wrapper svg {
  color: #ff6b00;
  z-index: 1;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.3), transparent);
  border-radius: 16px;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .icon-glow {
  opacity: 1;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #fff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 16px;
}

.feature-badge {
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

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 20px 0 0;
    min-height: auto;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }

  .stat-divider {
    width: 100%;
    height: 1px;
  }

  .hero-features {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .feature-card {
    padding: 28px;
  }
}
</style>
