<template>
  <div class="payment-history-view">
    <div class="header">
      <h1>💰 Payment History</h1>
      <p class="subtitle">Track all Solana payment transactions and analytics</p>
    </div>

    <PaymentHistoryTable />
  </div>
</template>

<script setup lang="ts">
import PaymentHistoryTable from '../components/PaymentHistoryTable.vue';
</script>

<style scoped>
.payment-history-view {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.header h1 {
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 18px;
  opacity: 0.95;
  margin: 0;
}

@media (max-width: 768px) {
  .payment-history-view {
    padding: 20px 10px;
  }

  .header h1 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
