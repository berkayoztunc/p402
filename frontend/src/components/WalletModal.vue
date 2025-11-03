<template>
  <div v-if="showModal" class="wallet-modal-overlay" @click.self="close">
    <div class="wallet-modal">
      <div class="wallet-modal-header">
        <h2>Connect Wallet</h2>
        <button @click="close" class="close-btn">&times;</button>
      </div>
      
      <div class="wallet-modal-body">
        <p class="wallet-description">
          Choose your preferred Solana wallet to connect
        </p>
        
        <div class="wallet-list">
          <button
            v-for="wallet in availableWallets"
            :key="wallet.adapter.name"
            @click="selectWallet(wallet.adapter.name)"
            class="wallet-option"
            :disabled="!wallet.readyState"
          >
            <img
              v-if="wallet.adapter.icon"
              :src="wallet.adapter.icon"
              :alt="wallet.adapter.name"
              class="wallet-icon"
            />
            <div class="wallet-info">
              <span class="wallet-name">{{ wallet.adapter.name }}</span>
              <span v-if="!wallet.readyState" class="wallet-status">Not Installed</span>
            </div>
          </button>
        </div>
        
        <p class="wallet-note">
          Don't have a wallet? 
          <a href="https://phantom.app/" target="_blank" rel="noopener">Get Phantom</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useWallet } from 'solana-wallets-vue';

const props = defineProps<{
  show: boolean
}>();

const emit = defineEmits<{
  close: []
  select: []
}>();

const showModal = ref(props.show);

watch(() => props.show, (newVal) => {
  showModal.value = newVal;
});

const { wallets, select } = useWallet();

const availableWallets = computed(() => {
  return wallets.value || [];
});

function selectWallet(walletName: string) {
  select(walletName as any);
  emit('select');
  close();
}

function close() {
  emit('close');
}
</script>

<style scoped>
.wallet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.wallet-modal {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%);
  border: 2px solid rgba(255, 107, 0, 0.4);
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(255, 107, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.wallet-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 2px solid rgba(255, 107, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.05) 100%);
}

.wallet-modal-header h2 {
  font-size: 28px;
  font-weight: 800;
  color: #ff6b00;
  margin: 0;
}

.close-btn {
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  color: #ff6b00;
  font-size: 28px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 300;
}

.close-btn:hover {
  background: rgba(255, 107, 0, 0.2);
  border-color: rgba(255, 107, 0, 0.5);
  transform: rotate(90deg);
}

.wallet-modal-body {
  padding: 32px;
}

.wallet-description {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 28px;
  text-align: center;
  font-size: 15px;
}

.wallet-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.wallet-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 107, 0, 0.3);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
}

.wallet-option:hover:not(:disabled) {
  background: rgba(255, 107, 0, 0.1);
  border-color: rgba(255, 107, 0, 0.5);
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(255, 107, 0, 0.2);
}

.wallet-option:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: rgba(255, 255, 255, 0.1);
}

.wallet-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
}

.wallet-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.wallet-name {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
}

.wallet-status {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.wallet-note {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding-top: 20px;
  border-top: 1px solid rgba(255, 107, 0, 0.2);
}

.wallet-note a {
  color: #ff6b00;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s ease;
}

.wallet-note a:hover {
  color: #ff8c00;
  text-decoration: underline;
}
</style>
