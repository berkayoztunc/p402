# 🎨 P402 Frontend - Component Library

Frontend'de kullanılan bileşenler ve gelecekteki geliştirmeler için bileşen fikirleri.

## 📦 Mevcut Bileşenler

### 1. Home.vue (Main One-Pager)

Ana sayfa bileşeni, tüm özellikleri içerir:
- Hero section
- Feature cards
- Dashboard
- API management
- Modals

## 🔮 Gelecek Bileşenler (İsteğe Bağlı)

### 1. LoadingSpinner.vue

```vue
<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 107, 0, 0.1);
  border-top-color: #ff6b00;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

### 2. Toast.vue (Notification)

```vue
<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :class="type">
      <div class="toast-icon">{{ icon }}</div>
      <div class="toast-content">
        <div class="toast-title">{{ title }}</div>
        <div class="toast-message">{{ message }}</div>
      </div>
      <button @click="close" class="toast-close">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  title: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

const icon = computed(() => {
  switch (props.type) {
    case 'success': return '✓'
    case 'error': return '✕'
    case 'warning': return '⚠'
    default: return 'ℹ'
  }
})

const close = () => {
  visible.value = false
  setTimeout(() => emit('close'), 300)
}

onMounted(() => {
  visible.value = true
  if (props.duration !== 0) {
    setTimeout(close, props.duration || 3000)
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  padding: 16px;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid rgba(255, 107, 0, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.toast.success { border-color: #10b981; }
.toast.error { border-color: #ef4444; }
.toast.warning { border-color: #f59e0b; }
.toast.info { border-color: #3b82f6; }

.toast-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.toast.success .toast-icon { color: #10b981; }
.toast.error .toast-icon { color: #ef4444; }
.toast.warning .toast-icon { color: #f59e0b; }
.toast.info .toast-icon { color: #3b82f6; }

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
  color: #aaa;
}

.toast-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
```

### 3. ConfirmDialog.vue

```vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="cancel">
        <div class="confirm-dialog">
          <div class="confirm-icon" :class="type">{{ icon }}</div>
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>
          <div class="confirm-actions">
            <button @click="cancel" class="btn btn-outline">
              {{ cancelText }}
            </button>
            <button @click="confirm" class="btn" :class="`btn-${type}`">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  message: string
  type?: 'danger' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const visible = ref(true)

const icon = computed(() => {
  switch (props.type) {
    case 'danger': return '⚠️'
    case 'warning': return '⚡'
    default: return 'ℹ️'
  }
})

const confirm = () => {
  visible.value = false
  emit('confirm')
}

const cancel = () => {
  visible.value = false
  emit('cancel')
}
</script>

<style scoped>
.confirm-dialog {
  background: #1a1a1a;
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  text-align: center;
}

.confirm-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.confirm-dialog h3 {
  font-size: 24px;
  margin-bottom: 12px;
}

.confirm-dialog p {
  color: #aaa;
  margin-bottom: 24px;
  line-height: 1.6;
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.btn-danger {
  background: #ef4444;
}

.btn-warning {
  background: #f59e0b;
}
</style>
```

### 4. ApiCard.vue (Extract from Home.vue)

```vue
<template>
  <div class="api-card">
    <div class="api-header">
      <div>
        <h3>{{ api.api_name }}</h3>
        <span class="api-network">{{ api.network }}</span>
      </div>
      <div class="api-status">
        <label class="switch">
          <input 
            type="checkbox" 
            :checked="api.is_active === 1"
            @change="$emit('toggle', api)"
          >
          <span class="slider"></span>
        </label>
      </div>
    </div>
    
    <p class="api-description">{{ api.description || 'No description' }}</p>
    
    <div class="api-details">
      <div class="detail-item">
        <span class="label">Target URL:</span>
        <span class="value">{{ api.target_url }}</span>
      </div>
      <div class="detail-item">
        <span class="label">Price:</span>
        <span class="value price">{{ api.price }}</span>
      </div>
      <div class="detail-item">
        <span class="label">Proxy URL:</span>
        <code class="proxy-url" @click="$emit('copy', api.id)">
          {{ proxyUrl }}
        </code>
      </div>
    </div>
    
    <div class="api-actions">
      <button @click="$emit('edit', api)" class="btn btn-outline btn-sm">
        Edit
      </button>
      <button @click="$emit('delete', api)" class="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Api } from '../types'

const props = defineProps<{
  api: Api
}>()

defineEmits<{
  toggle: [api: Api]
  copy: [id: string]
  edit: [api: Api]
  delete: [api: Api]
}>()

const proxyUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
  return `${baseUrl}/api/${props.api.id}`
})
</script>

<style scoped>
/* Styles from Home.vue */
</style>
```

### 5. StatCard.vue

```vue
<template>
  <div class="stat-card">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-content">
      <h3>{{ value }}</h3>
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  value: string | number
  label: string
}>()
</script>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.05) 100%);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  font-size: 36px;
}

.stat-content h3 {
  font-size: 36px;
  font-weight: 800;
  color: #ff6b00;
  margin-bottom: 5px;
}

.stat-content p {
  color: #aaa;
  font-size: 14px;
}
</style>
```

## 🎯 Composables (Vue 3 Composition Utilities)

### useToast.ts

```typescript
import { ref } from 'vue'

interface Toast {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const show = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ ...toast, id })
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration || 3000)
    }
  }
  
  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const success = (title: string, message: string) => {
    show({ title, message, type: 'success' })
  }
  
  const error = (title: string, message: string) => {
    show({ title, message, type: 'error' })
  }
  
  const info = (title: string, message: string) => {
    show({ title, message, type: 'info' })
  }
  
  const warning = (title: string, message: string) => {
    show({ title, message, type: 'warning' })
  }
  
  return {
    toasts,
    show,
    remove,
    success,
    error,
    info,
    warning
  }
}
```

### useClipboard.ts

```typescript
import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
      return true
    } catch (error) {
      console.error('Failed to copy:', error)
      return false
    }
  }
  
  return {
    copied,
    copy
  }
}
```

### useConfirm.ts

```typescript
import { ref } from 'vue'

interface ConfirmOptions {
  title: string
  message: string
  type?: 'danger' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
}

export function useConfirm() {
  const isOpen = ref(false)
  const options = ref<ConfirmOptions | null>(null)
  let resolvePromise: ((value: boolean) => void) | null = null
  
  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    options.value = opts
    isOpen.value = true
    
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }
  
  const handleConfirm = () => {
    isOpen.value = false
    resolvePromise?.(true)
  }
  
  const handleCancel = () => {
    isOpen.value = false
    resolvePromise?.(false)
  }
  
  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel
  }
}
```

## 🎨 Kullanım Örnekleri

### Toast Kullanımı

```vue
<script setup>
import { useToast } from '@/composables/useToast'

const toast = useToast()

const handleSuccess = () => {
  toast.success('Success!', 'API created successfully')
}

const handleError = () => {
  toast.error('Error', 'Failed to create API')
}
</script>
```

### Confirm Dialog Kullanımı

```vue
<script setup>
import { useConfirm } from '@/composables/useConfirm'

const confirm = useConfirm()

const handleDelete = async () => {
  const confirmed = await confirm({
    title: 'Delete API',
    message: 'Are you sure you want to delete this API?',
    type: 'danger',
    confirmText: 'Delete',
    cancelText: 'Cancel'
  })
  
  if (confirmed) {
    // Delete API
  }
}
</script>
```

### Clipboard Kullanımı

```vue
<script setup>
import { useClipboard } from '@/composables/useClipboard'

const { copied, copy } = useClipboard()

const handleCopy = async () => {
  await copy('Text to copy')
  if (copied.value) {
    console.log('Copied!')
  }
}
</script>

<template>
  <button @click="handleCopy">
    {{ copied ? 'Copied!' : 'Copy' }}
  </button>
</template>
```

## 📚 Daha Fazla Geliştirme

Bu bileşenler isteğe bağlıdır. Mevcut uygulama tam fonksiyoneldir ve bu bileşenler kullanıcı deneyimini iyileştirebilir.

---

Built with ❤️ using Vue 3
