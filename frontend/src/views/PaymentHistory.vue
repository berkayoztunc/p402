<template>
  <div class="app">
    <!-- Navigation -->
    <NavBar @connect="() => {}" />

    <!-- Payment History Section -->
    <section class="payment-history-section">
      <div class="container">
        <div class="section-header">
          <div>
            <h1 class="section-title">Payment History</h1>
            <p class="section-subtitle">Track all p402 payment transactions and analytics</p>
          </div>
        </div>

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
  background: #0a0a0a;
  color: #ffffff;
}

.payment-history-section {
  padding: 60px 0 100px 0;
  min-height: calc(100vh - 200px);
}

.section-header {
  margin-bottom: 40px;
}

.section-title {
  font-size: 42px;
  text-align: left;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}
</style>
