<template>
  <div class="dashboard-page">
    <!-- Navigation Header -->
    <NavBar @connect="() => {}" />
    
    <div class="container">
      <!-- Hero Section -->
      <section class="dashboard-hero">
        <div class="section-background">
          <div class="section-glow"></div>
        </div>
        
        <div class="hero-content">
          <div class="hero-title-group">
            <h1 class="page-title">
              <span class="gradient-text">API Dashboard</span>
            </h1>
            <p class="subtitle">Manage and monitor your monetized APIs</p>
          </div>

          <button @click="showAddModal = true" class="btn btn-add-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New API
          </button>
        </div>
      </section>

      <!-- Stats Overview -->
      <StatsGrid 
        :total-apis="userApis.length"
        :active-apis="activeApisCount"
        :revenue="totalRevenue"
        :requests="totalRequests"
      />

      <!-- API Management Section -->
      <section class="api-section">
        <div class="section-header">
          <div class="header-content">
            <div class="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h2>Your APIs</h2>
              <p class="header-subtitle">{{ userApis.length }} API{{ userApis.length !== 1 ? 's' : '' }} registered</p>
            </div>
          </div>
          
          <button @click="showAddModal = true" class="btn btn-primary btn-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add API
          </button>
        </div>

        <!-- API List -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading your APIs...</p>
        </div>

        <ApiList
          v-else
          :apis="userApis"
          :loading="false"
          @add="showAddModal = true"
          @edit="editApi"
          @delete="deleteApiConfirm"
          @toggle="toggleApiStatus"
          @copy-url="copyProxyUrl"
        />

        <div v-if="!loading && userApis.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <h3>No APIs yet</h3>
          <p>Create your first API to start earning from micropayments</p>
          <button @click="showAddModal = true" class="btn btn-primary">
            Create API
          </button>
        </div>
      </section>
    </div>

    <!-- Add/Edit API Modal -->
    <ApiModal
      :show="showAddModal || !!editingApi"
      :api="editingApi"
      :submitting="submitting"
      @close="closeModal"
      @submit="submitApi"
    />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';
import { apiService } from '../services/api';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import type { Api, ApiFormData } from '../types';
import StatsGrid from '../components/StatsGrid.vue';
import ApiList from '../components/ApiList.vue';
import ApiModal from '../components/ApiModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const userApis = ref<Api[]>([]);
const loading = ref(false);
const showAddModal = ref(false);
const editingApi = ref<Api | null>(null);
const submitting = ref(false);

const activeApisCount = computed(() => {
  return userApis.value.filter(api => api.is_active === 1).length;
});

const totalRevenue = computed(() => {
  return (userApis.value.length * 0.001).toFixed(4);
});

const totalRequests = computed(() => {
  return userApis.value.length * 150;
});

async function loadUserApis() {
  if (!authStore.address) return;
  
  loading.value = true;
  try {
    userApis.value = await apiService.getUserApis(authStore.address);
  } catch (error) {
    toast.error('Failed to load APIs. Please try again.');
    console.error('Failed to load APIs:', error);
  } finally {
    loading.value = false;
  }
}

async function copyProxyUrl(apiId: string) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
  const url = `${baseUrl}/api/${apiId}`;
  try {
    await navigator.clipboard.writeText(url);
    toast.success('Proxy URL copied to clipboard!');
  } catch (error) {
    toast.error('Failed to copy URL');
    console.error('Failed to copy:', error);
  }
}

async function toggleApiStatus(api: Api) {
  try {
    const newStatus = api.is_active === 1 ? 0 : 1;
    await apiService.toggleApiStatus(api.id, newStatus === 1);
    api.is_active = newStatus;
    toast.success(`API ${newStatus === 1 ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    toast.error('Failed to update API status');
    console.error('Failed to toggle status:', error);
  }
}

function editApi(api: Api) {
  editingApi.value = api;
  showAddModal.value = false;
}

async function submitApi(formData: ApiFormData) {
  if (!authStore.address) return;
  
  submitting.value = true;
  try {
    if (editingApi.value) {
      await apiService.updateApi(editingApi.value.id, formData);
      toast.success('API updated successfully');
    } else {
      await apiService.registerApi({
        ...formData,
        owner_address: authStore.address
      });
      toast.success('API registered successfully');
    }
    
    await loadUserApis();
    closeModal();
  } catch (error) {
    toast.error('Failed to save API. Please check your inputs.');
    console.error('Failed to save API:', error);
  } finally {
    submitting.value = false;
  }
}

function closeModal() {
  showAddModal.value = false;
  editingApi.value = null;
}

async function deleteApiConfirm(api: Api) {
  if (!confirm(`Are you sure you want to delete "${api.api_name}"?`)) {
    return;
  }
  
  try {
    await apiService.deleteApi(api.id);
    await loadUserApis();
    toast.success('API deleted successfully');
  } catch (error) {
    toast.error('Failed to delete API');
    console.error('Failed to delete API:', error);
  }
}

onMounted(async () => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    router.push('/');
    return;
  }
  
  await loadUserApis();
});
</script>

<style scoped>
/* Page Layout */
.dashboard-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-dark);
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  gap: 3rem;
}

/* Hero Section */
.dashboard-hero {
  position: relative;
  margin-bottom: 1rem;
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

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.hero-title-group {
  flex: 1;
}

.page-title {
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

.subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.btn-add-primary {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
}

.btn-add-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 0, 0.3);
}

.btn-add-primary svg {
  width: 20px;
  height: 20px;
}

/* API Section */
.api-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.section-header:hover {
  border-color: rgba(255, 107, 0, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.header-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary);
  transition: all 0.3s ease;
}

.section-header:hover .header-icon {
  background: rgba(255, 107, 0, 0.15);
  border-color: rgba(255, 107, 0, 0.4);
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.header-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.btn-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.btn-header svg {
  width: 18px;
  height: 18px;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 107, 0, 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  padding: 3rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color-light);
  border-radius: 12px;
  text-align: center;
}

.empty-state h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-state p {
  margin: 0.5rem 0 1.5rem 0;
  color: var(--text-muted);
  max-width: 400px;
}

.empty-state .btn {
  padding: 0.75rem 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    padding: 1.5rem;
    gap: 2rem;
  }

  .hero-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    text-align: center;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .btn-header {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
    gap: 1.5rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .section-header {
    padding: 1.5rem;
  }
}
</style>
