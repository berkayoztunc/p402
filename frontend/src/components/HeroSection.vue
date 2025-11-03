<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h2 class="hero-title">
          Monetize Your APIs with
          <span class="highlight">Solana Payments</span>
        </h2>
        <p class="hero-description">
          Connect your Solana wallet, register your APIs, and start earning SOL for every request.
          No setup fees, no monthly subscriptions - just pay-per-use on Solana.
        </p>
        <button 
          @click="$emit('connect')" 
          class="btn btn-primary btn-large"
          :disabled="isAuthenticating"
        >
          {{ isAuthenticating ? '🔄 Connecting...' : '🚀 Get Started' }}
        </button>
      </div>
      
      <div class="hero-features">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Instant Payments</h3>
          <p>Receive SOL payments directly to your wallet in real-time</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure & Private</h3>
          <p>Message signing authentication with no personal data required</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚙️</div>
          <h3>Solana Powered</h3>
          <p>Fast, low-cost transactions on the Solana blockchain</p>
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
  padding: 100px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content {
  margin-bottom: 80px;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

.highlight {
  color: #ff6b00;
}

.hero-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.feature-card {
  background: rgba(255, 107, 0, 0.05);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 107, 0, 0.4);
  box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #fff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-description {
    font-size: 16px;
  }
}
</style>
