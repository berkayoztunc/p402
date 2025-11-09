<template>
  <div class="marketplace-page">
    <!-- Navigation Header -->
    <NavBar @connect="connectWallet" />
    
    <div class="container">
      <!-- Header Section -->
      <div class="marketplace-header">
        <h1 class="page-title">
          <span class="gradient-text">API Marketplace</span>
        </h1>
        <p class="subtitle">Discover and integrate powerful APIs built on blockchain</p>
      </div>

      <!-- Stats Overview -->
      <div class="stats-overview">
        <div class="stat-card">
          <svg class="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <div class="stat-content">
            <div class="stat-label">Total APIs</div>
            <div class="stat-value">{{ apis.length }}</div>
          </div>
        </div>
        <div class="stat-card">
          <svg class="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <div class="stat-content">
            <div class="stat-label">Filtered Results</div>
            <div class="stat-value">{{ filteredApis.length }}</div>
          </div>
        </div>
        <div class="stat-card">
          <svg class="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <div class="stat-content">
            <div class="stat-label">Networks</div>
            <div class="stat-value">{{ networks.length }}</div>
          </div>
        </div>
      </div>

      <!-- Search and Filters Card -->
      <div class="filters-card">
        <div class="filters-header">
          <h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Search & Filter
          </h3>
          <button v-if="searchQuery || selectedNetwork !== 'all'" @click="resetFilters" class="btn-reset">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            Reset
          </button>
        </div>
        
        <div class="filters-content">
          <!-- Search Input -->
          <div class="search-input-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search APIs by name or description..." 
              class="search-input"
            />
          </div>
          
          <!-- Network Filter Pills -->
          <div class="filter-tags">
            <button 
              :class="['filter-tag', { active: selectedNetwork === 'all' }]"
              @click="selectedNetwork = 'all'"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              All Networks
            </button>
            <button 
              v-for="network in networks" 
              :key="network"
              :class="['filter-tag', { active: selectedNetwork === network }]"
              @click="selectedNetwork = network"
            >
              {{ network }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading APIs from marketplace...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredApis.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <h3>No APIs Found</h3>
        <p>Try adjusting your search or filters to find what you're looking for</p>
      </div>

      <!-- API Grid -->
      <div v-else class="api-grid">
        <div 
          v-for="api in filteredApis" 
          :key="api.id" 
          class="marketplace-card"
          @click="viewApiDetails(api)"
        >
          <div class="card-header">
            <div class="card-title-section">
              <h3>{{ api.api_name }}</h3>
              <span class="api-id">#{{ api.id }}</span>
            </div>
            <span class="network-badge">{{ api.network }}</span>
          </div>
          
          <p class="card-description">
            {{ api.description || 'No description available' }}
          </p>
          
          <div class="card-footer">
            <div class="price-section">
              <div class="price-tag">
                <span class="price-label">Price per Request</span>
                <span class="price-value">{{ api.price }}</span>
              </div>
            </div>
            
            <button class="btn-use" @click.stop="useApi(api)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import type { Api } from '../types';

const router = useRouter();
const toast = useToast();

const apis = ref<Api[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const selectedNetwork = ref('all');

const networks = ['solana', 'ethereum', 'polygon', 'base', 'arbitrum'];

const filteredApis = computed(() => {
  // Ensure apis.value is an array
  if (!Array.isArray(apis.value)) {
    return [];
  }
  
  let filtered = apis.value
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(api => 
      api.api_name.toLowerCase().includes(query) ||
      (api.description && api.description.toLowerCase().includes(query))
    );
  }
  
  // Filter by network
  if (selectedNetwork.value !== 'all') {
    filtered = filtered.filter(api => api.network === selectedNetwork.value);
  }
  
  return filtered;
});

async function loadApis() {
  loading.value = true;
  try {
    const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/api/public/apis`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
      apis.value = data.apis || [];
      console.log('APIs loaded:', apis.value.length);
    } else {
      toast.error(`Failed to load APIs: ${response.statusText}`);
    }
  } catch (error) {
    toast.error('Failed to load APIs. Please try again.');
    console.error('Failed to load APIs:', error);
  } finally {
    loading.value = false;
  }
}

function connectWallet() {
  // Will open wallet modal or redirect to home
  window.location.href = '/#/';
}

function viewApiDetails(api: Api) {
  router.push(`/api/${api.id}`);
}

function useApi(api: Api) {
  // Copy proxy URL or redirect to documentation
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
  const url = `${baseUrl}/api/${api.id}`;
  navigator.clipboard.writeText(url);
  toast.success('API URL copied to clipboard!');
}

function resetFilters() {
  searchQuery.value = '';
  selectedNetwork.value = 'all';
}

onMounted(() => {
  loadApis();
});
</script>

<style scoped>
.marketplace-page {
  min-height: 100vh;
  background: #0a0a0a;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

/* Header Section */
.marketplace-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* Stats Overview */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-2px);
}

.stat-icon {
  color: #ff6b00;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
  font-weight: 500;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

/* Filters Card */
.filters-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filters-header h3 {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filters-header h3 svg {
  color: #ff6b00;
}

.btn-reset {
  padding: 5px 12px;
  background: transparent;
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 4px;
  color: #ff6b00;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-reset svg {
  opacity: 0.7;
}

.btn-reset:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: #ff6b00;
}

.btn-reset:hover svg {
  opacity: 1;
  transform: rotate(-90deg);
  transition: transform 0.3s ease;
}

.filters-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Search Input */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 7px 10px 7px 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: #ff6b00;
  box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

/* Filter Tags */
.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 4px;
}

.filter-tag svg {
  opacity: 0.6;
}

.filter-tag:hover {
  border-color: rgba(255, 107, 0, 0.4);
  background: rgba(255, 107, 0, 0.08);
  color: rgba(255, 255, 255, 0.8);
}

.filter-tag.active {
  background: rgba(255, 107, 0, 0.15);
  border-color: #ff6b00;
  color: #ff6b00;
}

.filter-tag.active svg {
  opacity: 1;
}

/* Loading State */
.loading-state {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 60px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  border: 4px solid rgba(255, 107, 0, 0.1);
  border-top-color: #ff6b00;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

/* Empty State */
.empty-state {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 60px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-icon svg {
  color: rgba(255, 255, 255, 0.4);
}

.empty-state h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.empty-state p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

/* API Grid */
.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.marketplace-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.marketplace-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 107, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card-title-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.api-id {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.network-badge {
  padding: 4px 8px;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #ff8c00;
  letter-spacing: 0.3px;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-description {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  font-size: 13px;
  min-height: 40px;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 107, 0, 0.1);
  margin-top: auto;
}

.price-section {
  flex: 1;
}

.price-tag {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.price-value {
  font-size: 18px;
  font-weight: 800;
  color: #ff6b00;
}

.btn-use {
  padding: 7px 14px;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 4px;
  color: #ff6b00;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-use svg {
  opacity: 0.7;
}

.btn-use:hover {
  background: rgba(255, 107, 0, 0.25);
  border-color: #ff6b00;
  transform: translateX(2px);
}

.btn-use:hover svg {
  opacity: 1;
  transform: translateX(2px);
  transition: transform 0.2s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 24px 16px 60px;
  }

  .page-title {
    font-size: 28px;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }

  .filters-content {
    gap: 12px;
  }

  .filter-tags {
    gap: 6px;
  }
}
</style>
