<template>
  <div v-if="loading" class="loading">Loading APIs...</div>
  <div v-else-if="apis.length === 0" class="empty-state">
    <div class="empty-icon">📦</div>
    <h3>No APIs Yet</h3>
    <p>Get started by adding your first API</p>
    <button @click="$emit('add')" class="btn btn-primary">
      Add Your First API
    </button>
  </div>
  <div v-else class="api-list">
    <div v-for="api in apis" :key="api.id" class="api-list-item">
      <div class="api-main-info">
        <div class="api-title-section">
          <h3>{{ api.api_name }}</h3>
          <span class="api-network">{{ api.network }}</span>
        </div>
        <p class="api-description">{{ api.description || 'No description' }}</p>
      </div>
      
      <div class="api-info-grid">
        <div class="info-item">
          <span class="info-label">Target URL</span>
          <span class="info-value">{{ api.target_url }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Price</span>
          <span class="info-value info-price">{{ api.price }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Proxy URL</span>
          <code class="info-proxy" @click="$emit('copy-url', api.id)">
            {{ getProxyUrl(api.id) }}
          </code>
        </div>
      </div>
      
      <div class="api-list-actions">
        <label class="switch">
          <input 
            type="checkbox" 
            :checked="api.is_active === 1"
            @change="$emit('toggle', api)"
          >
          <span class="slider"></span>
        </label>
        <button @click="$emit('edit', api)" class="btn btn-outline btn-sm">
          Edit
        </button>
        <button @click="$emit('delete', api)" class="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Api } from '../types';

defineProps<{
  apis: Api[];
  loading: boolean;
}>();

defineEmits<{
  add: [];
  edit: [api: Api];
  delete: [api: Api];
  toggle: [api: Api];
  'copy-url': [apiId: string];
}>();

function getProxyUrl(apiId: string): string {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
  return `${baseUrl}/api/${apiId}`;
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 60px;
  color: rgba(255, 255, 255, 0.5);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  margin-bottom: 12px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-list-item {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
}

.api-list-item:hover {
  border-color: rgba(255, 107, 0, 0.5);
  box-shadow: 0 4px 16px rgba(255, 107, 0, 0.15);
  transform: translateX(4px);
}

.api-main-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.api-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.api-title-section h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.api-network {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 107, 0, 0.2);
  border: 1px solid rgba(255, 107, 0, 0.4);
  border-radius: 6px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: #ff6b00;
  letter-spacing: 0.5px;
}

.api-description {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
}

.api-info-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 0, 0.15);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.info-value {
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}

.info-price {
  color: #ff6b00;
  font-weight: 700;
  font-size: 16px;
}

.info-proxy {
  background: rgba(255, 107, 0, 0.1);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #ff6b00;
  border: 1px solid rgba(255, 107, 0, 0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  transition: all 0.2s ease;
}

.info-proxy:hover {
  background: rgba(255, 107, 0, 0.2);
  border-color: rgba(255, 107, 0, 0.5);
}

.api-list-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 107, 0, 0.15);
}

.api-list-actions .btn {
  min-width: 80px;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #ff6b00;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
}

.btn-outline {
  background: transparent;
  border: 2px solid #ff6b00;
  color: #ff6b00;
}

.btn-outline:hover {
  background: rgba(255, 107, 0, 0.1);
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .api-info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .api-list-item {
    padding: 16px;
  }

  .api-info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-value,
  .info-proxy {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .api-list-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .api-list-actions .btn,
  .api-list-actions .switch {
    width: 100%;
  }
}
</style>
