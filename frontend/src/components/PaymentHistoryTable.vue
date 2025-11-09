<template>
  <div class="payment-history-container">
    <!-- Statistics Summary -->
    <div v-if="stats" class="stats-overview">
      <div class="stat-card">
        <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 20V10M12 20V4M6 20v-6"/>
        </svg>
        <div class="stat-content">
          <div class="stat-label">Total Requests</div>
          <div class="stat-value">{{ stats.total_payments }}</div>
        </div>
      </div>
      <div class="stat-card success-card">
        <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div class="stat-content">
          <div class="stat-label">Successful</div>
          <div class="stat-value">{{ stats.successful_payments }}</div>
        </div>
      </div>
      <div class="stat-card failed-card">
        <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <div class="stat-content">
          <div class="stat-label">Failed</div>
          <div class="stat-value">{{ stats.failed_payments }}</div>
        </div>
      </div>
      <div class="stat-card">
        <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <div class="stat-content">
          <div class="stat-label">Unique Payers</div>
          <div class="stat-value">{{ stats.unique_payers }}</div>
        </div>
      </div>
      <div class="stat-card">
        <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        <div class="stat-content">
          <div class="stat-label">Last 24h</div>
          <div class="stat-value">{{ stats.recent_payments }}</div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-card">
      <div class="filters-header">
        <h3>🔍 Filters</h3>
        <button @click="resetFilters" class="btn-reset">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset
        </button>
      </div>
      <div class="filters-grid">
        <div class="filter-group">
          <label for="endpoint">
            Endpoint
          </label>
          <select id="endpoint" v-model="filters.endpoint" @change="applyFilters">
            <option value="">Select Endpoint...</option>
            <option value="verify">Verify</option>
            <option value="settle">Settle</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="network">
            Network
          </label>
          <select id="network" v-model="filters.network" @change="applyFilters">
            <option value="">Select Network...</option>
            <option value="solana">Solana</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="base">Base</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="success">
            Status
          </label>
          <select id="success" v-model="filters.success" @change="applyFilters">
            <option :value="undefined">Select Status...</option>
            <option :value="true">✓ Success Only</option>
            <option :value="false">✗ Failed Only</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="payer">
            Payer Address
          </label>
          <div class="search-input-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="payer"
              type="text"
              v-model="filters.payer"
              @input="debouncedFilter"
              placeholder="Search by address..."
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading payment history...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <p>{{ error }}</p>
      <button @click="fetchPaymentHistory" class="btn btn-primary">Retry</button>
    </div>

    <!-- Payment History Table -->
    <div v-else class="table-card">
      <div class="table-wrapper">
        <table class="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Endpoint & Network</th>
              <th>Payer Address</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paymentHistory.length === 0">
              <td colspan="7" class="no-data">
                <div class="empty-state">
                  <div class="empty-icon">📭</div>
                  <p>No payment history found</p>
                  <span>Try adjusting your filters</span>
                </div>
              </td>
            </tr>
            <tr v-for="payment in paymentHistory" :key="payment.id" class="table-row">
              <td class="id-cell">#{{ payment.id }}</td>
              <td>
                <div class="stacked-cell">
                  <span class="badge" :class="`badge-${payment.endpoint}`">
                    {{ payment.endpoint }}
                  </span>
                  <span class="badge badge-network">{{ payment.network }}</span>
                </div>
              </td>
              <td>
                <code class="address-code" :title="payment.payer || 'N/A'">
                  {{ truncateAddress(payment.payer) }}
                </code>
              </td>
              <td>
                <div class="status-cell">
                  <span
                    class="status-badge"
                    :class="payment.success ? 'status-success' : 'status-failed'"
                  >
                    <span class="status-dot"></span>
                    {{ payment.success ? 'Success' : 'Failed' }}
                  </span>
                  <div v-if="!payment.success && payment.error_reason" class="error-detail">
                    {{ payment.error_reason }}
                  </div>
                </div>
              </td>
              <td>
                <a
                  v-if="payment.transaction_hash"
                  :href="getExplorerUrl(payment.network, payment.transaction_hash)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tx-link"
                >
                  <code>{{ truncateHash(payment.transaction_hash) }}</code>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
                <span v-else class="na-text">N/A</span>
              </td>
              <td class="date-cell">{{ formatDate(payment.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button
          @click="previousPage"
          :disabled="pagination.offset === 0"
          class="btn btn-outline pagination-btn"
        >
          ← Previous
        </button>
        <div class="pagination-info">
          <span class="page-range">
            {{ pagination.offset + 1 }} - 
            {{ Math.min(pagination.offset + pagination.limit, pagination.total) }}
          </span>
          <span class="page-total">of {{ pagination.total }}</span>
        </div>
        <button
          @click="nextPage"
          :disabled="pagination.offset + pagination.limit >= pagination.total"
          class="btn btn-outline pagination-btn"
        >
          Next →
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
    network: '',
    endpoint: undefined,
    success: undefined,
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
    network: '',
    endpoint: undefined,
    success: undefined,
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
    solana: `https://orb.helius.dev/tx/${hash}`,
    ethereum: `https://etherscan.io/tx/${hash}`,
    polygon: `https://polygonscan.com/tx/${hash}`,
    base: `https://basescan.org/tx/${hash}`,
    arbitrum: `https://arbiscan.io/tx/${hash}`,
    "solana-devnet": `https://orb.helius.dev/tx/${hash}?cluster=devnet`,
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

</style>
