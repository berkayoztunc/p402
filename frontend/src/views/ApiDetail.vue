<template>
  <div class="api-detail-page">
    <NavBar @connect="() => { }" />

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading API details...</p>
    </div>

    <div v-else-if="!api" class="error-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
      <h2>API Not Found</h2>
      <p>The requested API does not exist or has been removed.</p>
      <button @click="$router.push('/marketplace')" class="btn btn-primary">
        ← Back to Marketplace
      </button>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <section class="api-detail-hero">
        <div class="section-background">
          <div class="section-glow"></div>
        </div>
        <div class="container">
          <button @click="$router.back()" class="back-btn">
            ← Back
          </button>
          <div class="hero-content">
            <h1 class="page-title">
              {{ api.api_name }}
            </h1>
            <p v-if="api.description" class="hero-subtitle">{{ api.description }}</p>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-item">
            <span class="stat-label">Price per request</span>
            <span class="stat-value">{{ api.price }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Network</span>
            <span class="network-badge-inline">{{ api.network }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Created</span>
            <span class="stat-value">{{ formatDate(api.created_at) }}</span>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="detail-grid">
          <!-- Left Column: General Info -->
          <div class="left-column">
            <!-- Payment Details -->
            <div class="payment-details">
              <h3>💰 Payment Details</h3>
              <div class="payment-info">
                <p>Each request costs <strong class="price-highlight">{{ api.price }}</strong></p>
                <p>Automatically charged via <strong>{{ api.network }}</strong></p>
                <p class="payment-note">Payments are handled automatically through the x402 protocol - no manual payment
                  integration needed!</p>
              </div>
            </div>
            <div class="endpoint-section">
              <h3>API Endpoint</h3>
              <div class="endpoint-box">
                <div class="endpoint-content">
                  <code>{{ apiEndpoint }}</code>
                </div>
                <button @click="copyEndpoint" class="btn-copy" :class="{ copied }">
                  {{ copied ? '✓' : '📋' }}
                </button>
              </div>
            </div>
            <!-- Tags (if available) -->
            <div v-if="parsedTags.length > 0" class="tags-section">
              <h3>Tags</h3>
              <div class="tag-list">
                <span v-for="tag in parsedTags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column: Documentation & Usage -->
          <div class="right-column">
            <!-- API Endpoint -->

            <!-- Documentation -->
            <div v-if="api.documentation" class="documentation-section">
              <h2>Documentation</h2>
              <div class="doc-content" v-html="renderedDocs"></div>
            </div>
            <div v-else class="documentation-section no-docs">
              <h2>No Documentation Available</h2>
              <p>This API does not have any documentation provided by the creator.</p>
              <div class="no-docs-actions">
                <button @click="$router.push('/marketplace')" class="btn btn-primary">
                  ← Back to Marketplace
                </button>
              </div>
            </div>
            <!-- Usage Instructions -->


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
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { marked } from 'marked';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import type { Api } from '../types';

const route = useRoute();
const toast = useToast();

const api = ref<Api | null>(null);
const loading = ref(false);
const copied = ref(false);

const apiEndpoint = computed(() => {
  if (!api.value) return '';
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
  return `${baseUrl}/api/${api.value.id}`;
});

const parsedTags = computed(() => {
  if (!api.value) return [];
  const tags = (api.value as any).tags;
  if (!tags) return [];

  try {
    return typeof tags === 'string' ? JSON.parse(tags) : tags;
  } catch {
    return [];
  }
});

const renderedDocs = computed(() => {
  if (!api.value?.documentation) return '';
  return marked(api.value.documentation);
});

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function copyEndpoint() {
  try {
    await navigator.clipboard.writeText(apiEndpoint.value);
    copied.value = true;
    toast.success('Endpoint copied to clipboard!');
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    toast.error('Failed to copy endpoint');
    console.error('Failed to copy:', error);
  }
}

async function loadApiDetails() {
  loading.value = true;
  try {
    const apiId = route.params.id as string;
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/api/public/apis`);

    if (response.ok) {
      const data = await response.json();
      const foundApi = data.apis.find((a: Api) => a.id === apiId);

      if (foundApi) {
        api.value = foundApi;
      }
    } else {
      toast.error('Failed to load API details');
    }
  } catch (error) {
    toast.error('Failed to load API details');
    console.error('Failed to load API details:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadApiDetails();
});
</script>

<style scoped>
/* Hero Section */
.api-detail-hero {
  position: relative;
  padding: 1.5rem 0 1rem;
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

.back-btn {
  position: relative;
  z-index: 1;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.back-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(255, 107, 0, 0.05);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.hero-subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.network-badge-inline {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 6px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.5px;
  width: fit-content;
}

/* Detail Grid */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

/* Loading & Error States */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
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
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
  text-align: center;
}

.error-state h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0;
}

.error-state p {
  color: var(--text-muted);
  margin: 0;
}

/* Sections */
.payment-details,
.tags-section,
.endpoint-section,
.documentation-section,
.usage-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.payment-details h3,
.tags-section h3,
.endpoint-section h3,
.documentation-section h2,
.usage-section h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.payment-info p {
  margin: 0.4rem 0;
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.9rem;
}

.price-highlight {
  color: var(--primary);
  font-weight: 700;
}

.payment-note {
  font-size: 0.85rem;
  color: var(--text-muted) !important;
  font-style: italic;
}

/* Tags */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--primary);
  font-weight: 500;
}

/* Endpoint */
.endpoint-box {
  display: flex;
  gap: 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  align-items: center;
}

.endpoint-content {
  flex: 1;
  overflow-x: auto;
}

.endpoint-content code {
  color: var(--primary);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  white-space: nowrap;
}

.btn-copy {
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.btn-copy:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(255, 107, 0, 0.05);
}

.btn-copy.copied {
  border-color: #4ade80;
  color: #4ade80;
}

/* Documentation */
.doc-content {
  color: var(--text-primary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.doc-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.doc-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.25rem 0 0.625rem;
  padding-bottom: 0.375rem;
}

.doc-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
}

.doc-content :deep(p) {
  margin: 0.625rem 0;
}

.doc-content :deep(ul),
.doc-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.doc-content :deep(li) {
  margin: 0.25rem 0;
}

.doc-content :deep(a) {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.doc-content :deep(a:hover) {
  border-bottom-color: var(--primary);
}

.doc-content :deep(code) {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  padding: 0.15em 0.35em;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85em;
  color: var(--primary);
}

.doc-content :deep(pre) {
  background: #1e1e2e;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.doc-content :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.85rem;
  line-height: 1.5;
}

.doc-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border-left: 3px solid var(--primary);
}

.doc-content :deep(blockquote p) {
  margin: 0;
}

.doc-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.doc-content :deep(th) {
  background: var(--bg-input);
  padding: 0.625rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.doc-content :deep(td) {
  padding: 0.625rem;
  border-bottom: 1px solid var(--border-color);
}

.doc-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.doc-content :deep(em) {
  color: var(--text-secondary);
}

/* Usage Steps */
.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  display: flex;
  gap: 1rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: 50%;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.step-content h3 {
  margin: 0 0 0.35rem;
  color: var(--text-primary);
  font-size: 1rem;
}

.step-content p {
  margin: 0.3rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.code-tabs {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.code-tab h4 {
  margin: 0 0 0.75rem;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.code-example {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.75rem 0;
}

.code-example pre {
  margin: 0;
  background: transparent;
  border: none;
  padding: 0;
}

.code-example code {
  color: var(--primary);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
}

.success-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 8px;
  margin-top: 1rem;
  color: #4ade80;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .quick-stats {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;
  }

  .code-tabs {
    flex-direction: column;
  }
}

</style>
