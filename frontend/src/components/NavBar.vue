<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-brand" @click="$router.push('/')">
        <span class="brand-icon">⚡</span>
        <span class="brand-text">P402</span>
      </div>
      
      <div class="nav-links">
        <button @click="$router.push('/')" class="nav-link">
          Home
        </button>
        <button @click="$router.push('/marketplace')" class="nav-link">
          Marketplace
        </button>
      </div>
      
      <div class="nav-actions">
        <button v-if="!isAuthenticated" @click="handleConnect" class="btn btn-primary">
          Connect Wallet
        </button>
        <template v-else>
          <button @click="$router.push('/dashboard')" class="btn btn-outline">
            Dashboard
          </button>
          <button @click="handleLogout" class="btn btn-danger">
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const emit = defineEmits<{
  connect: [];
}>();

function handleConnect() {
  emit('connect');
}

async function handleLogout() {
  await authStore.disconnectWallet();
  router.push('/');
}
</script>

<style scoped>
.navbar {
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 2px solid rgba(255, 107, 0, 0.3);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-brand:hover {
  transform: translateY(-2px);
}

.brand-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 8px rgba(255, 107, 0, 0.6));
}

.brand-text {
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  font-family: inherit;
}

.nav-link:hover {
  color: #ff6b00;
  background: rgba(255, 107, 0, 0.1);
}

.nav-actions {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .nav-content {
    padding: 16px 20px;
    gap: 16px;
  }

  .nav-links {
    display: none;
  }

  .brand-text {
    font-size: 24px;
  }

  .brand-icon {
    font-size: 28px;
  }

  .nav-actions {
    gap: 8px;
  }

  .nav-actions .btn {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>
