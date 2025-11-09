<template>
  <div class="payment-history-container">
    <!-- Filters -->
    <div class="filters-section">
      <h3>Filters</h3>
      <div class="filters-grid">
        <div class="filter-group">
          <label for="endpoint">Endpoint</label>
          <select id="endpoint" v-model="filters.endpoint" @change="applyFilters">
            <option value="">All</option>
            <option value="verify">Verify</option>
            <option value="settle">Settle</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="network">Network</label>
          <select id="network" v-model="filters.network" @change="applyFilters">
            <option value="">All</option>
            <option value="solana">Solana</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="base">Base</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="success">Status</label>
          <select id="success" v-model="filters.success" @change="applyFilters">
            <option value="">All</option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="payer">Payer Address</label>
          <input
            id="payer"
            type="text"
            v-model="filters.payer"
            @input="debouncedFilter"
            placeholder="Enter payer address"
          />
        </div>

        <div class="filter-group">
          <button @click="resetFilters" class="btn-secondary">Reset Filters</button>
        </div>
      </div>
    </div>

    <!-- Statistics Summary -->
    <div v-if="stats" class="stats-summary">
      <div class="stat-card">
        <h4>Total Payments</h4>
        <p class="stat-value">{{ stats.total_payments }}</p>
      </div>
      <div class="stat-card success">
        <h4>Successful</h4>
        <p class="stat-value">{{ stats.successful_payments }}</p>
      </div>
      <div class="stat-card failed">
        <h4>Failed</h4>
        <p class="stat-value">{{ stats.failed_payments }}</p>
      </div>
      <div class="stat-card">
        <h4>Unique Payers</h4>
        <p class="stat-value">{{ stats.unique_payers }}</p>
      </div>
      <div class="stat-card">
        <h4>Last 24h</h4>
        <p class="stat-value">{{ stats.recent_payments }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading payment history...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchPaymentHistory" class="btn-primary">Retry</button>
    </div>

    <!-- Payment History Table -->
    <div v-else class="table-container">
      <table class="payment-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Endpoint</th>
            <th>Network</th>
            <th>Payer</th>
            <th>Amount</th>
            <th>Token</th>
            <th>Status</th>
            <th>Transaction</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paymentHistory.length === 0">
            <td colspan="9" class="no-data">No payment history found</td>
          </tr>
          <tr v-for="payment in paymentHistory" :key="payment.id">
            <td>{{ payment.id }}</td>
            <td>
              <span class="badge" :class="`badge-${payment.endpoint}`">
                {{ payment.endpoint }}
              </span>
            </td>
            <td>
              <span class="badge badge-network">{{ payment.network }}</span>
            </td>
            <td>
              <span class="address" :title="payment.payer || 'N/A'">
                {{ truncateAddress(payment.payer) }}
              </span>
            </td>
            <td>{{ payment.amount || 'N/A' }}</td>
            <td>{{ payment.token || 'N/A' }}</td>
            <td>
              <span
                class="status-badge"
                :class="payment.success ? 'status-success' : 'status-failed'"
              >
                {{ payment.success ? '✓ Success' : '✗ Failed' }}
              </span>
              <span v-if="!payment.success && payment.error_reason" class="error-tooltip">
                {{ payment.error_reason }}
              </span>
            </td>
            <td>
              <a
                v-if="payment.transaction_hash"
                :href="getExplorerUrl(payment.network, payment.transaction_hash)"
                target="_blank"
                rel="noopener noreferrer"
                class="tx-link"
              >
                {{ truncateHash(payment.transaction_hash) }}
              </a>
              <span v-else>N/A</span>
            </td>
            <td>{{ formatDate(payment.created_at) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <button
          @click="previousPage"
          :disabled="pagination.offset === 0"
          class="btn-secondary"
        >
          Previous
        </button>
        <span class="pagination-info">
          Showing {{ pagination.offset + 1 }} - 
          {{ Math.min(pagination.offset + pagination.limit, pagination.total) }} 
          of {{ pagination.total }}
        </span>
        <button
          @click="nextPage"
          :disabled="pagination.offset + pagination.limit >= pagination.total"
          class="btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiService } from '../services/api';
import type { PaymentHistory, PaymentStats, PaymentHistoryFilters } from '../types';

const paymentHistory = ref<PaymentHistory[]>([]);
const stats = ref<PaymentStats | null>(null);
const loading = ref(true);
const error = ref('');

const filters = ref<PaymentHistoryFilters>({
  limit: 50,
  offset: 0,
});

const pagination = ref({
  total: 0,
  limit: 50,
  offset: 0,
});

let debounceTimer: ReturnType<typeof setTimeout> | undefined;

const fetchPaymentHistory = async () => {
  try {
    loading.value = true;
    error.value = '';
    const result = await apiService.getPaymentHistory(filters.value);
    paymentHistory.value = result.data;
    pagination.value = result.pagination;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load payment history';
    console.error('Error fetching payment history:', err);
  } finally {
    loading.value = false;
  }
};

const fetchStats = async () => {
  try {
    stats.value = await apiService.getPaymentStats();
  } catch (err) {
    console.error('Error fetching payment stats:', err);
  }
};

const applyFilters = () => {
  filters.value.offset = 0;
  pagination.value.offset = 0;
  fetchPaymentHistory();
};

const debouncedFilter = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    applyFilters();
  }, 500);
};

const resetFilters = () => {
  filters.value = {
    limit: 50,
    offset: 0,
  };
  fetchPaymentHistory();
};

const nextPage = () => {
  filters.value.offset = (filters.value.offset || 0) + (filters.value.limit || 50);
  fetchPaymentHistory();
};

const previousPage = () => {
  filters.value.offset = Math.max(0, (filters.value.offset || 0) - (filters.value.limit || 50));
  fetchPaymentHistory();
};

const truncateAddress = (address: string | null): string => {
  if (!address) return 'N/A';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const truncateHash = (hash: string): string => {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
};

const getExplorerUrl = (network: string, hash: string): string => {
  const explorers: Record<string, string> = {
    solana: `https://solscan.io/tx/${hash}`,
    ethereum: `https://etherscan.io/tx/${hash}`,
    polygon: `https://polygonscan.com/tx/${hash}`,
    base: `https://basescan.org/tx/${hash}`,
    arbitrum: `https://arbiscan.io/tx/${hash}`,
  };
  return explorers[network.toLowerCase()] || '#';
};

const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

onMounted(() => {
  fetchPaymentHistory();
  fetchStats();
});
</script>

<style scoped>
.payment-history-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.filters-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.filters-section h3 {
  margin: 0 0 15px 0;
  font-size: 18px;
  color: #333;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #7c3aed;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.stat-card.success {
  border-left: 4px solid #10b981;
}

.stat-card.failed {
  border-left: 4px solid #ef4444;
}

.stat-card h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.stat-value {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.loading,
.error-message {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.error-message p {
  color: #ef4444;
  margin-bottom: 15px;
}

.table-container {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow-x: auto;
}

.payment-history-table {
  width: 100%;
  border-collapse: collapse;
}

.payment-history-table th,
.payment-history-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.payment-history-table th {
  background: #f8f9fa;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  position: sticky;
  top: 0;
}

.payment-history-table tbody tr:hover {
  background: #f9fafb;
}

.no-data {
  text-align: center;
  padding: 40px !important;
  color: #9ca3af;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.badge-verify {
  background: #dbeafe;
  color: #1e40af;
}

.badge-settle {
  background: #fef3c7;
  color: #92400e;
}

.badge-network {
  background: #f3e8ff;
  color: #6b21a8;
}

.address {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #6b7280;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-success {
  background: #d1fae5;
  color: #065f46;
}

.status-failed {
  background: #fee2e2;
  color: #991b1b;
}

.error-tooltip {
  display: block;
  font-size: 11px;
  color: #ef4444;
  margin-top: 4px;
}

.tx-link {
  color: #7c3aed;
  text-decoration: none;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.tx-link:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #e5e7eb;
}

.pagination-info {
  font-size: 14px;
  color: #6b7280;
}

.btn-primary,
.btn-secondary {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #7c3aed;
  color: white;
}

.btn-primary:hover {
  background: #6d28d9;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
