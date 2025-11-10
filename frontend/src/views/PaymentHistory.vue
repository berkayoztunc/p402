<template>
  <div class="app">
    <!-- Navigation -->
    <NavBar @connect="() => {}" />

    <!-- Hero Section -->
    <section class="payment-hero">
      <div class="section-background">
        <div class="section-glow"></div>
      </div>
      <div class="container">
        <h1 class="page-title">
          <span class="gradient-text">Payment History</span>
        </h1>
        <p class="hero-subtitle">Track all x402 payment transactions and analytics</p>
      </div>
    </section>

    <!-- Payment History Section -->
    <section class="payment-history-section">
      <div class="container">
        <PaymentHistoryTable />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import PaymentHistoryTable from '../components/PaymentHistoryTable.vue';
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-primary);
}

/* Hero Section */
.payment-hero {
  position: relative;
  padding: 1.5rem 0 1rem;
  margin-bottom: 0.5rem;
}

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

.page-title {
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0.5rem 0 0;
}

.payment-history-section {
  padding: 3rem 0 5rem 0;
  min-height: calc(100vh - 300px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }

  .payment-history-section {
    padding: 2rem 0 3rem 0;
  }
}
</style>
