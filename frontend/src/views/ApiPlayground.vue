<template>
  <div class="playground-page">
    <NavBar @connect="connectWallet" />
    
    <div class="container">
      <!-- Header Section with Background Effects -->
      <section class="playground-hero">
        <div class="section-background">
          <div class="section-glow"></div>
        </div>

        <div class="hero-content">
          <h1 class="page-title">
            <span class="gradient-text">API Playground</span>
          </h1>
          <p class="subtitle">Test and interact with blockchain-powered APIs in real-time</p>
        </div>
      </section>

 

      <!-- Main Grid -->
      <div class="playground-grid">
        <!-- Request Panel -->
        <div class="request-panel">
          <div class="panel-header">
            <div class="header-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m0 0a9 9 0 0 1 18 0m0 0V5a2 2 0 0 0-2-2h-4m0 0a9 9 0 0 0-18 0v4"/>
              </svg>
              <h3>Request Configuration</h3>
            </div>
          </div>

          <div class="panel-content">
            <div class="form-group">
              <label>📡 Select API</label>
              <select v-model="selectedApiId" @change="onApiChange" class="form-select">
                <option value="">Choose an API...</option>
                <option v-for="api in apis" :key="api.id" :value="api.id">
                  {{ api.api_name }} - {{ api.network }}
                </option>
              </select>
            </div>

            <div v-if="selectedApi" class="api-info-box">
              <div class="info-row">
                <span class="info-label">Base URL:</span>
                <code class="info-value">{{ getProxyUrl(selectedApi.id) }}</code>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group" style="flex: 0 0 120px;">
                <label>Method</label>
                <select v-model="requestMethod" class="form-select">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>
              <div class="form-group" style="flex: 1;">
                <label>Endpoint Path</label>
                <input 
                  v-model="requestPath" 
                  type="text" 
                  class="form-input"
                  placeholder="/your/endpoint"
                  :disabled="!selectedApiId"
                />
              </div>
            </div>

            <div v-if="requestMethod === 'POST'" class="form-group">
              <label>Request Body (JSON)</label>
              <textarea 
                v-model="requestBody" 
                class="form-textarea"
                rows="4"
                placeholder='{"key": "value"}'
              ></textarea>
            </div>

            <button 
              @click="sendRequest" 
              :disabled="!selectedApiId || isLoading"
              class="btn-send"
            >
              <svg v-if="!isLoading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <path d="M12 8v-2m0 12v2M7.5 4.5 6 3m10 18 1.5 1.5M4.5 7.5 3 6m18 10 1.5 1.5M4 12H2m18 0h2M6.5 17.5 5 19m12-16 1.5-1.5"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2" stroke-linecap="round"/>
              </svg>
              {{ isLoading ? 'Sending...' : 'Send Request' }}
            </button>
          </div>
        </div>

        <!-- Response Panel -->
        <div class="response-panel">
          <div class="panel-header">
            <div class="header-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              <h3>Response & Logs</h3>
            </div>
            <button v-if="response" @click="clearResponse" class="btn-clear">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 4 21 4"/>
                <path d="M19 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4m3 0v-1"/>
              </svg>
              Clear
            </button>
          </div>

          <div class="panel-content">
            <div v-if="!response && requestLogs.length === 0" class="empty-response">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
              <p>No response yet</p>
              <p class="empty-hint">Send a request to see results here</p>
            </div>

            <template v-else>
              <!-- Request Flow Logs -->
              <div v-if="requestLogs.length > 0" class="logs-container">
                <div class="logs-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1v22M4.22 4.22l15.56 15.56M1 12h22M4.22 19.78L19.78 4.22"/>
                  </svg>
                  Request Flow
                </div>
                <div class="logs-content">
                  <div v-for="(log, index) in requestLogs" :key="index" class="log-entry" :class="log.type">
                    <span class="log-type-badge">{{ log.type }}</span>
                    <div class="log-message">{{ log.message }}</div>
                  </div>
                </div>
              </div>

              <!-- Error Display -->
              <div v-if="error" class="error-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <pre class="error-content">{{ error }}</pre>
              </div>

              <!-- Response Body -->
              <div v-if="response" class="response-section">
                <div class="response-status-bar">
                  <div class="status-badge" :class="getStatusClass(response.status)">
                    {{ response.status }} {{ response.statusText }}
                  </div>
                  <div class="response-time">⏱️ {{ responseTime }}ms</div>
                </div>

                <div class="response-body">
                  <div class="body-header">Response Body</div>
                  <pre class="body-content">{{ formatResponse(response.data) }}</pre>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import type { Api } from '../types';

const toast = useToast();

// State
const apis = ref<Api[]>([]);
const selectedApiId = ref('');
const requestMethod = ref('GET');
const requestPath = ref('');
const requestBody = ref('');
const isLoading = ref(false);
const response = ref<any>(null);
const error = ref('');
const responseTime = ref(0);
const requestLogs = ref<Array<{ message: string; type: string }>>([]);


const selectedApi = computed(() => apis.value.find(api => api.id === selectedApiId.value));

onMounted(async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/api/public/apis`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      apis.value = data.apis || [];
    }
  } catch (err) {
    console.error('Failed to load APIs:', err);
  }
});

function getProxyUrl(apiId: string): string {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
  return `${baseUrl}/api/${apiId}`;
}



function onApiChange() {
  requestPath.value = '';
  requestBody.value = '';
  clearResponse();
}

function addLog(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  requestLogs.value.push({ message, type });
  console.log(`[${type}]`, message);
}

async function sendRequest() {
  if (!selectedApi.value) return;

  isLoading.value = true;
  error.value = '';
  response.value = null;
  requestLogs.value = [];
  
  const startTime = performance.now();

  try {
    const url = `${getProxyUrl(selectedApi.value.id)}${requestPath.value}`;
    
    addLog(`Initiating request to ${url}`, 'info');
    addLog(`Method: ${requestMethod.value}`, 'info');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const requestOptions: RequestInit = {
      method: requestMethod.value,
      headers,
    };

    if (requestBody.value && requestMethod.value === 'POST') {
      try {
        JSON.parse(requestBody.value);
        requestOptions.body = requestBody.value;
        addLog(`Request body added`, 'info');
      } catch (e) {
        error.value = 'Invalid JSON in request body';
        addLog(`Invalid JSON in request body`, 'error');
        isLoading.value = false;
        return;
      }
    }

    addLog(`Sending initial request...`, 'info');

    // First request
    let res = await fetch(url, requestOptions);
    const endTime = performance.now();
    responseTime.value = Math.round(endTime - startTime);

    addLog(`Response received (${res.status} ${res.statusText}) in ${responseTime.value}ms`, 'success');

    // Check for 402 Payment Required
    if (res.status === 402) {
      addLog(`Payment Required (402) - Processing payment...`, 'warning');
      
      const paymentReq = await res.json();
      console.log('Payment Requirements (402):', paymentReq);
      addLog(`Payment requirements received`, 'info');
      
      // Display x402 body
      const x402Body = {
        x402Version: paymentReq.x402Version || 1,
        scheme: paymentReq.accepts?.[0]?.scheme || 'exact',
        network: paymentReq.accepts?.[0]?.network || 'solana',
        payload: paymentReq.accepts?.[0] || {}
      };
      
      addLog(`X-PAYMENT body: ${JSON.stringify(x402Body)}`, 'info');
      
      response.value = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: { x402Body, rawResponse: paymentReq },
      };
      
      toast.info('402 Payment Required - See x402 body in response');
      
    } else {
      // Non-402 response
      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType?.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      response.value = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      };

      if (res.ok) {
        addLog(`Request completed successfully!`, 'success');
        toast.success('Request successful!');
      } else {
        addLog(`Request returned status: ${res.status}`, 'warning');
        toast.warning(`Request returned ${res.status}`);
      }
    }
  } catch (err: any) {
    error.value = err.message || 'Request failed';
    addLog(`Request failed: ${err.message}`, 'error');
    toast.error('Request failed');
    console.error('Request error:', err);
  } finally {
    isLoading.value = false;
    addLog(`Request flow completed`, 'info');
  }
}

function formatResponse(data: any): string {
  if (typeof data === 'string') {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  }
  return JSON.stringify(data, null, 2);
}

function getStatusClass(status: number): string {
  if (status >= 200 && status < 300) return 'status-success';
  if (status >= 300 && status < 400) return 'status-redirect';
  if (status >= 400 && status < 500) return 'status-client-error';
  return 'status-server-error';
}

function clearResponse() {
  response.value = null;
  error.value = '';
  requestLogs.value = [];
}

function connectWallet() {
  window.location.href = '/#/';
}
</script>

<style scoped>
/* Page Layout */
.playground-page {
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
  gap: 2rem;
}

/* Hero Section */
.playground-hero {
  position: relative;
  text-align: center;
  padding: 1rem 0 0.5rem;
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

/* Wallet Status Card */
.wallet-status-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.wallet-status-card:hover {
  border-color: rgba(255, 107, 0, 0.4);
  background: rgba(255, 107, 0, 0.05);
}

.wallet-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: rgba(255, 107, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.wallet-connected,
.wallet-disconnected {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.status-label {
  color: var(--text-muted);
}

.wallet-address {
  font-family: 'Monaco', 'Menlo', monospace;
  color: var(--primary);
  font-weight: 500;
}

/* Main Grid */
.playground-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 2rem;
  flex: 1;
  min-height: 500px;
}

@media (max-width: 1200px) {
  .playground-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

/* Panels */
.request-panel,
.response-panel {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.request-panel:hover,
.response-panel:hover {
  border-color: rgba(255, 107, 0, 0.3);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color-light);
  background: rgba(255, 107, 0, 0.05);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title svg {
  color: var(--primary);
  flex-shrink: 0;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.panel-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
}

/* Forms */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-select,
.form-input {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-primary);
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  background: rgba(255, 107, 0, 0.12);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.form-select:disabled,
.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-textarea {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', monospace;
  resize: none;
  transition: all 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  background: rgba(255, 107, 0, 0.12);
  border-color: var(--primary);
}

.api-info-box {
  background: rgba(255, 107, 0, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.info-label {
  color: var(--text-muted);
  font-weight: 500;
}

.info-value {
  background: var(--bg-input);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-family: 'Monaco', 'Menlo', monospace;
  color: var(--primary);
  word-break: break-all;
}

/* Buttons */
.btn-send,
.btn-clear {
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
}

.btn-send {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  align-self: flex-start;
}

.btn-send:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 0, 0.3);
}

.btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-send svg {
  width: 18px;
  height: 18px;
}

.btn-send.spin svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-clear {
  background: var(--bg-input);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn-clear:hover {
  background: rgba(255, 107, 0, 0.15);
}

.btn-clear svg {
  width: 16px;
  height: 16px;
}

.response-panel {
  min-height: 500px;
}

.empty-response {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.empty-response p {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
}

.empty-hint {
  color: var(--text-muted) !important;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Logs */
.logs-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.logs-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logs-header svg {
  flex-shrink: 0;
}

.logs-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.logs-content::-webkit-scrollbar {
  width: 6px;
}

.logs-content::-webkit-scrollbar-track {
  background: var(--bg-input);
  border-radius: 3px;
}

.logs-content::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 0, 0.3);
  border-radius: 3px;
}

.logs-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 107, 0, 0.5);
}

.log-entry {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Monaco', 'Menlo', monospace;
  word-break: break-word;
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.log-type-badge {
  flex-shrink: 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  min-width: 40px;
  text-align: center;
}

.log-message {
  margin: 0;
}

.log-entry.info {
  background: rgba(255, 107, 0, 0.08);
  color: var(--primary-light);
  border-left: 3px solid var(--primary);
}

.log-entry.info .log-type-badge {
  background: rgba(255, 107, 0, 0.3);
  color: var(--primary);
}

.log-entry.success {
  background: rgba(80, 200, 120, 0.08);
  color: #50c878;
  border-left: 3px solid #50c878;
}

.log-entry.success .log-type-badge {
  background: rgba(80, 200, 120, 0.3);
  color: #50c878;
}

.log-entry.warning {
  background: rgba(255, 200, 80, 0.08);
  color: #ffc850;
  border-left: 3px solid #ffc850;
}

.log-entry.warning .log-type-badge {
  background: rgba(255, 200, 80, 0.3);
  color: #ffc850;
}

.log-entry.error {
  background: rgba(255, 80, 80, 0.08);
  color: #ff5050;
  border-left: 3px solid #ff5050;
}

.log-entry.error .log-type-badge {
  background: rgba(255, 80, 80, 0.3);
  color: #ff5050;
}

/* Error */
.error-box {
  background: rgba(255, 80, 80, 0.08);
  border: 1px solid rgba(255, 80, 80, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}

.error-box svg {
  flex-shrink: 0;
  color: #ff5050;
}

.error-content {
  margin: 0;
  color: #ff5050;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  word-break: break-word;
}

/* Response Section */
.response-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
}

.response-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border-radius: 8px;
  border: 1px solid var(--border-color-light);
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', monospace;
}

.status-success {
  background: rgba(80, 200, 120, 0.15);
  color: #50c878;
}

.status-redirect {
  background: rgba(255, 107, 0, 0.15);
  color: var(--primary);
}

.status-client-error {
  background: rgba(255, 150, 100, 0.15);
  color: #ff9664;
}

.status-server-error {
  background: rgba(255, 80, 80, 0.15);
  color: #ff5050;
}

.response-time {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-family: 'Monaco', 'Menlo', monospace;
}

.response-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  min-height: 0;
}

.body-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.body-content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  color: var(--primary);
  margin: 0;
  overflow-y: auto;
  flex: 1;
  max-height: 280px;
  white-space: pre-wrap;
  word-break: break-word;
}

.body-content::-webkit-scrollbar {
  width: 6px;
}

.body-content::-webkit-scrollbar-track {
  background: var(--bg-input);
  border-radius: 3px;
}

.body-content::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 0, 0.3);
  border-radius: 3px;
}

.body-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 107, 0, 0.5);
}
</style>
