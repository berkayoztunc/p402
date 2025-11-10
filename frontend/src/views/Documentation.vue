<template>
  <div class="documentation-page">
    <NavBar />
    
    <!-- Hero Section -->
    <section class="doc-hero">
      <div class="section-background">
        <div class="section-glow"></div>
      </div>
      <div class="container">
        <h1 class="page-title">
          <span class="gradient-text">Documentation</span>
        </h1>
        <p class="hero-subtitle">Learn how to use the x402 protocol and integrate with our platform</p>
      </div>
    </section>

    <div class="container">
      <div class="doc-container">
        <aside class="doc-sidebar">
          <h2 class="sidebar-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Guides
          </h2>
          <nav class="doc-nav">
            <button 
              v-for="doc in docList" 
              :key="doc.id"
              @click="selectDoc(doc)"
              :class="['doc-nav-item', { active: selectedDoc?.id === doc.id }]"
            >
              {{ doc.title }}
            </button>
          </nav>
        </aside>

        <main class="doc-content">
          <div v-if="loading" class="doc-loading">
            <div class="spinner"></div>
            <p>Loading documentation...</p>
          </div>

          <div v-else-if="error" class="doc-error">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2>Error Loading Document</h2>
            <p>{{ error }}</p>
          </div>

          <div v-else-if="selectedDoc" class="doc-viewer">
            <div class="doc-header">
              <h1>{{ selectedDoc.title }}</h1>
              <p class="doc-meta">Last updated: {{ selectedDoc.date }}</p>
            </div>
            <div class="markdown-content" v-html="renderedContent"></div>
          </div>

          <div v-else class="doc-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <h2>Welcome to Documentation</h2>
            <p>Select a guide from the sidebar to get started</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { marked } from 'marked';
import NavBar from '../components/NavBar.vue';

interface Doc {
  id: string;
  title: string;
  filename: string;
  date: string;
}

const docList: Doc[] = [
    { id: 'account-creation', title: 'How to Create an Account', filename: 'ACCOUNT_CREATION.md', date: 'Nov 2025' },
    { id: 'api-creation', title: 'How to Create a P402 API', filename: 'API_CREATION.md', date: 'Nov 2025' },
    { id: 'api-usage', title: 'How to Use P402 APIs', filename: 'API_USAGE.md', date: 'Nov 2025' },
    { id: 'facilitator', title: 'P402 Facilitator Guide', filename: 'FACILITATOR.md', date: 'Kas 2025' },
    { id: 'error-codes', title: 'Error Codes', filename: 'ERROR_CODES.md', date: 'Nov 2025' },
];

const selectedDoc = ref<Doc | null>(null);
const markdownContent = ref('');
const loading = ref(false);
const error = ref('');

const renderedContent = computed(() => {
  if (!markdownContent.value) return '';
  return marked(markdownContent.value);
});

async function selectDoc(doc: Doc) {
  selectedDoc.value = doc;
  loading.value = true;
  error.value = '';
  
  try {
    // Fetch docs file from backend
    const response = await fetch(`/docs/${doc.filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load document: ${response.statusText}`);
    }
    markdownContent.value = await response.text();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error loading documentation:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  // Auto-select first document
  const firstDoc = docList[0];
  if (firstDoc) {
    selectDoc(firstDoc);
  }
});
</script>

<style scoped>
.documentation-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.doc-hero {
  position: relative;
  padding: 2rem 0 0;
  margin-bottom: 1.5rem;
  background: var(--bg-secondary);
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
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  filter: blur(50px);
}

.page-title {
  position: relative;
  z-index: 1;
  font-size: 2rem;
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

.hero-subtitle {
  position: relative;
  z-index: 1;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0.25rem 0 0;
}

.doc-container {
  display: flex;
  gap: 1.5rem;
}

/* Sidebar Styles */
.doc-sidebar {
  width: 260px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.5rem 0.75rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-title svg {
  color: var(--primary);
  width: 18px;
  height: 18px;
}

.doc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.doc-nav-item {
  padding: 0.625rem 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
}

.doc-nav-item:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary);
  color: var(--primary);
}

.doc-nav-item.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  font-weight: 600;
}

/* Content Styles */
.doc-content {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  background: var(--bg-secondary);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.doc-loading,
.doc-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2.5px solid var(--border-color);
  border-top: 2.5px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 0.75rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.doc-error {
  padding: 1.5rem;
  background: var(--bg-error-light);
  border: 1px solid var(--border-error);
  border-radius: 10px;
  color: var(--text-error);
}

.doc-error h2 {
  color: var(--text-error);
  margin: 0.5rem 0 0;
  font-size: 1rem;
}

.doc-placeholder h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0 0.25rem;
  color: var(--text-primary);
}

.doc-placeholder p {
  font-size: 0.9rem;
}

/* Document Viewer */
.doc-viewer {
  max-width: 900px;
}

.doc-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.doc-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.doc-meta {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
}

/* Markdown Content */
.markdown-content {
  color: var(--text-primary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.markdown-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.markdown-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.25rem 0 0.625rem;
  padding-bottom: 0.375rem;
}

.markdown-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
}

.markdown-content :deep(p) {
  margin: 0.625rem 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin: 0.25rem 0;
}

.markdown-content :deep(a) {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.markdown-content :deep(a:hover) {
  border-bottom-color: var(--primary);
}

.markdown-content :deep(code) {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  padding: 0.15em 0.35em;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85em;
  color: var(--primary);
}

.markdown-content :deep(pre) {
  background: #1e1e2e;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.markdown-content :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.85rem;
  line-height: 1.5;
}

.markdown-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border-left: 3px solid var(--primary);
}

.markdown-content :deep(blockquote p) {
  margin: 0;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.markdown-content :deep(th) {
  background: var(--bg-input);
  padding: 0.625rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.markdown-content :deep(td) {
  padding: 0.625rem;
  border-bottom: 1px solid var(--border-color);
}

.markdown-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.markdown-content :deep(em) {
  color: var(--text-secondary);
}

/* Scrollbar */
.doc-sidebar::-webkit-scrollbar,
.doc-content::-webkit-scrollbar {
  width: 6px;
}

.doc-sidebar::-webkit-scrollbar-track,
.doc-content::-webkit-scrollbar-track {
  background: transparent;
}

.doc-sidebar::-webkit-scrollbar-thumb,
.doc-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.doc-sidebar::-webkit-scrollbar-thumb:hover,
.doc-content::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .doc-container {
    flex-direction: column;
  }

  .doc-sidebar {
    width: 100%;
    position: relative;
    top: 0;
  }

  .doc-content {
    padding: 1.5rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .doc-hero {
    padding: 1.5rem 0 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .doc-header h1 {
    font-size: 1.25rem;
  }

  .doc-content {
    padding: 1rem 1rem;
  }
}
</style>

