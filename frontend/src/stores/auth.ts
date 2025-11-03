import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import bs58 from 'bs58';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAuthStore = defineStore('auth', () => {
  const address = ref<string>('');
  const isConnected = ref(false);
  const isAuthenticating = ref(false);

  const isAuthenticated = computed(() => isConnected.value && address.value !== '');

  async function connectWallet() {
    try {
      isAuthenticating.value = true;

      const { connect, publicKey, signMessage } = useWallet();
      
      // Connect wallet
      await connect();

      if (!publicKey.value) {
        throw new Error('Wallet connection failed');
      }

      const walletAddress = publicKey.value.toBase58();

      // Request nonce from backend
      const nonceResponse = await apiClient.post('/auth/nonce', {
        address: walletAddress
      });

      const { message } = nonceResponse.data;

      // Sign message with wallet
      if (!signMessage || !signMessage.value) {
        throw new Error('Wallet does not support message signing');
      }

      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = await signMessage.value(messageBytes);
      const signature = bs58.encode(signatureBytes);

      // Verify signature and create session
      const verifyResponse = await apiClient.post('/auth/verify', {
        address: walletAddress,
        message,
        signature
      });

      if (verifyResponse.data.success) {
        address.value = walletAddress;
        isConnected.value = true;
        
        // Save to localStorage
        localStorage.setItem('walletAddress', walletAddress);
        
        return walletAddress;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    } finally {
      isAuthenticating.value = false;
    }
  }

  async function disconnectWallet() {
    try {
      // Logout from backend
      await apiClient.post('/auth/logout');

      // Disconnect wallet
      const { disconnect } = useWallet();
      await disconnect();

      address.value = '';
      isConnected.value = false;
      localStorage.removeItem('walletAddress');
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  }

  async function checkSession() {
    try {
      const response = await apiClient.get('/auth/session');
      
      if (response.data.authenticated && response.data.address) {
        address.value = response.data.address;
        isConnected.value = true;
        localStorage.setItem('walletAddress', response.data.address);
        return true;
      } else {
        address.value = '';
        isConnected.value = false;
        localStorage.removeItem('walletAddress');
        return false;
      }
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  }

  return {
    address,
    isConnected,
    isAuthenticated,
    isAuthenticating,
    connectWallet,
    disconnectWallet,
    checkSession,
  };
});

