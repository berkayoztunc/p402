<template>
  <nav class="navbar">
    <div class="nav-background"></div>
    <div class="nav-content">
      <!-- Brand -->
      <div class="nav-brand" @click="$router.push('/')">
        <div >
          <img src="/logo.png" alt="P402 Logo" class="brand-logo" />
        </div>
      </div>
      
      <!-- Desktop Links -->
      <div class="nav-links-desktop">
        <button @click="navigateTo('/')" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </button>
        <button @click="navigateTo('/marketplace')" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Marketplace
        </button>
        <button @click="navigateTo('/playground')" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Playground
        </button>
        <button @click="navigateTo('/payment-history')" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Payments
        </button>
        <button @click="navigateTo('/documentation')" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Docs
        </button>
      </div>
      
      <!-- Desktop Actions -->
      <div class="nav-actions-desktop">
        <button v-if="!isAuthenticated" @click="handleConnect" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Sign In
        </button>
        <template v-else>
          <button @click="navigateTo('/dashboard')" class="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </button>
          <button @click="handleLogout" class="btn btn-danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'open': mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="mobileMenuOpen = false"></div>
    </transition>
    
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <h3>Navigation</h3>
          <button class="close-btn" @click="mobileMenuOpen = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="mobile-nav-links">
          <button @click="navigateTo('/')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="navigateTo('/marketplace')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Marketplace</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="navigateTo('/playground')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>Playground</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="navigateTo('/dashboard')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Dashboard</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="navigateTo('/payment-history')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span>Payment History</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="navigateTo('/documentation')" class="mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>Documentation</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div class="mobile-menu-divider"></div>

        <div class="mobile-menu-actions">
          <button v-if="!isAuthenticated" @click="handleConnect" class="btn btn-primary btn-mobile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Sign In
          </button>
          <template v-else>
            <button @click="navigateTo('/dashboard')" class="btn btn-outline btn-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Dashboard
            </button>
            <button @click="handleLogout" class="btn btn-danger btn-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const mobileMenuOpen = ref(false);

const isAuthenticated = computed(() => authStore.isAuthenticated);

const emit = defineEmits<{
  connect: [];
}>();

function handleConnect() {
  emit('connect');
  mobileMenuOpen.value = false;
}

async function handleLogout() {
  await authStore.disconnectWallet();
  mobileMenuOpen.value = false;
  router.push('/');
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function navigateTo(path: string) {
  router.push(path);
  mobileMenuOpen.value = false;
}
</script>

<style scoped>
/* Navbar */
.navbar {
  background: var(--bg-dark);
  border-bottom: 1px solid var(--border-color-light);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 107, 0, 0.03) 0%, transparent 50%, rgba(255, 107, 0, 0.02) 100%);
  pointer-events: none;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.brand-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-brand:hover .brand-icon-wrapper {
  background: rgba(255, 107, 0, 0.15);
  border-color: rgba(255, 107, 0, 0.4);
  box-shadow: 0 0 12px rgba(255, 107, 0, 0.2);
}

.brand-logo {
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(255, 107, 0, 0.5));
}

/* Desktop Links */
.nav-links-desktop {
  display: flex;
  gap: 4px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(255, 107, 0, 0.1);
}

.nav-link svg {
  flex-shrink: 0;
}

/* Desktop Actions */
.nav-actions-desktop {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn {
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
}

.btn-outline {
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: var(--primary);
}

.btn-danger {
  background: rgba(255, 80, 80, 0.1);
  color: #ff5050;
  border: 1px solid rgba(255, 80, 80, 0.3);
}

.btn-danger:hover {
  background: rgba(255, 80, 80, 0.15);
  border-color: #ff5050;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 105;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2.5px;
  background: var(--primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.mobile-menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 101;
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-overlay.v-enter-active,
.mobile-menu-overlay.v-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-dark);
  z-index: 102;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu.open {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color-light);
  background: rgba(255, 107, 0, 0.05);
  position: sticky;
  top: 0;
}

.mobile-menu-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.close-btn:hover {
  background: rgba(255, 107, 0, 0.1);
  color: var(--primary);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  flex: 1;
}

.mobile-nav-link {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.875rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  border: 1px solid transparent;
}

.mobile-nav-link:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: rgba(255, 107, 0, 0.2);
  color: var(--primary);
}

.mobile-nav-link svg {
  flex-shrink: 0;
  color: var(--primary);
}

.mobile-nav-link .arrow {
  margin-left: auto;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover .arrow {
  opacity: 1;
  transform: translateX(2px);
}

.mobile-menu-divider {
  height: 1px;
  background: var(--border-color-light);
  margin: 0.5rem 0;
}

.mobile-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.btn-mobile {
  width: 100%;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-content {
    padding: 0.75rem 1.5rem;
    gap: 1.5rem;
  }

  .nav-links-desktop {
    display: none;
  }

  .nav-actions-desktop {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }

  .brand-logo {
    height: 28px;
  }

  .brand-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .mobile-menu {
    max-width: 100%;
  }
}

/* Mobile Menu Animations */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
