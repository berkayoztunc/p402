<template>
  <div class="stats-grid">
    <div class="stat-card">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="o1" x1="0" y1="0" x2="48" y2="48">
<stop offset="0%" stop-color="#FF7A00"/>
<stop offset="100%" stop-color="#FFA734"/>
</linearGradient>
</defs>
<rect x="10" y="26" width="6" height="12" rx="2" stroke="url(#o1)" stroke-width="3"/>
<rect x="21" y="18" width="6" height="20" rx="2" stroke="url(#o1)" stroke-width="3"/>
<rect x="32" y="10" width="6" height="28" rx="2" stroke="url(#o1)" stroke-width="3"/>
</svg>

      <p class="stat-label">Total APIs</p>
      <h3 class="stat-value">{{ totalApis }}</h3>
    </div>
    <div class="stat-card">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
<defs>
<linearGradient id="o1" x1="0" y1="0" x2="48" y2="48">
<stop offset="0%" stop-color="#FF7A00"/>
<stop offset="100%" stop-color="#FFA734"/>
</linearGradient>
</defs>
<path d="M24 6L8 14V24C8 34 14 40 24 42C34 40 40 34 40 24V14L24 6Z"
stroke="url(#o1)" stroke-width="3"/>
<path d="M17 24L22 29L31 19" stroke="url(#o1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <p class="stat-label">Active APIs</p>
      <h3 class="stat-value">{{ activeApis }}</h3>
    </div>
    <div class="stat-card">
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none">
<defs>
<linearGradient id="o1" x1="0" y1="0" x2="48" y2="48">
<stop offset="0%" stop-color="#FF7A00"/>
<stop offset="100%" stop-color="#FFA734"/>
</linearGradient>
</defs>
<rect x="8" y="10" width="32" height="28" rx="3" stroke="url(#o1)" stroke-width="3"/>
<circle cx="14" cy="18" r="2" fill="url(#o1)"/>
<circle cx="14" cy="30" r="2" fill="url(#o1)"/>
<circle cx="30" cy="24" r="7" stroke="url(#o1)" stroke-width="3"/>
<circle cx="30" cy="24" r="2.5" fill="url(#o1)"/>
<line x1="30" y1="17" x2="30" y2="14" stroke="url(#o1)" stroke-width="2"/>
<line x1="30" y1="33" x2="30" y2="30" stroke="url(#o1)" stroke-width="2"/>
<line x1="23" y1="24" x2="20" y2="24" stroke="url(#o1)" stroke-width="2"/>
<line x1="39" y1="24" x2="36" y2="24" stroke="url(#o1)" stroke-width="2"/>
</svg>

      <p class="stat-label">Total Revenue</p>
      <h3 class="stat-value">${{ revenue }}</h3>
    </div>
    <div class="stat-card">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
<defs>
<linearGradient id="o1" x1="0" y1="0" x2="48" y2="48">
<stop offset="0%" stop-color="#FF7A00"/>
<stop offset="100%" stop-color="#FFA734"/>
</linearGradient>
</defs>
<path d="M10 34L18 26L26 30L38 18" stroke="url(#o1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30 18H38V26" stroke="url(#o1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <p class="stat-label">Total Requests</p>
      <h3 class="stat-value">{{ requests }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalApis: number;
  activeApis: number;
  revenue: string;
  requests: number;
}>();
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 60px;
}

.stat-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 107, 0, 0.25);
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  border-color: rgba(255, 107, 0, 0.5);
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-2px);
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
  margin: 0;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #ff6b00;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.5px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-value {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
