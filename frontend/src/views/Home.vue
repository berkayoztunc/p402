<template>
  <div class="app">
    <!-- Navigation -->
    <NavBar @connect="showWalletModal = true" />

    <!-- Hero Section - Always show on home -->
    <HeroSection 
      :is-authenticating="authStore.isAuthenticating"
      @connect="showWalletModal = true"
    />

    <!-- Wallet Selection Modal -->
    <WalletModal 
      :show="showWalletModal" 
      @close="showWalletModal = false"
      @select="onWalletSelect"
    />

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 P402. Built with ❤️ on Solana.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';
import NavBar from '../components/NavBar.vue';
import WalletModal from '../components/WalletModal.vue';
import HeroSection from '../components/HeroSection.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const showWalletModal = ref(false);

async function onWalletSelect() {
  try {
    await authStore.connectWallet();
    toast.success('Wallet connected successfully!');
    // Redirect to dashboard after successful connection
    router.push('/dashboard');
  } catch (error) {
    toast.error('Failed to connect wallet. Please try again.');
    console.error('Connection error:', error);
  }
}

onMounted(async () => {
  await authStore.checkSession();
  // If already authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    router.push('/dashboard');
  }
});
</script>

