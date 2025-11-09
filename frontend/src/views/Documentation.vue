<template>
  <div class="documentation-page">
    <NavBar />
    
    <div class="doc-container">
      <aside class="doc-sidebar">
        <h2 class="sidebar-title">Documentation</h2>
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
          <h2>⚠️ Error Loading Document</h2>
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
          <h2>📚 Welcome to Documentation</h2>
          <p>Select a document from the sidebar to get started.</p>
        </div>
      </main>
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
  background: #0a0a0a
}

.doc-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
}

/* Sidebar Styles */
.doc-sidebar {
  width: 280px;
  background: #0a0a0a;
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 107, 0, 0.2);
  padding: 2rem 1rem;
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b00;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.doc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.doc-nav-item {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 0.95rem;
}

.doc-nav-item:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: rgba(255, 107, 0, 0.3);
  color: #ff6b00;
  transform: translateX(4px);
}

.doc-nav-item.active {
  background: rgba(255, 107, 0, 0.15);
  border-color: #ff6b00;
  color: #ff6b00;
  font-weight: 600;
}

/* Content Styles */
.doc-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
}

.doc-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 107, 0, 0.1);
  border-top: 3px solid #ff6b00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.doc-error {
  padding: 2rem;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 12px;
  color: #fca5a5;
}

.doc-error h2 {
  color: #ef4444;
  margin-bottom: 1rem;
}

.doc-placeholder {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.doc-placeholder h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Document Viewer */
.doc-viewer {
  max-width: 900px;
}

.doc-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 107, 0, 0.3);
}

.doc-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.doc-meta {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

/* Markdown Content Styles */
.markdown-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1rem;
}

/* Headings */
.markdown-content :deep(h1) {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ff6b00;
  margin: 2.5rem 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 107, 0, 0.3);
}

.markdown-content :deep(h2) {
  font-size: 1.875rem;
  font-weight: 600;
  color: #ff8533;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(255, 107, 0, 0.2);
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffa366;
  margin: 1.75rem 0 0.875rem 0;
}

.markdown-content :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffb380;
  margin: 1.5rem 0 0.75rem 0;
}

/* Paragraphs */
.markdown-content :deep(p) {
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.85);
}

/* Lists */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.85);
}

.markdown-content :deep(li::marker) {
  color: #ff6b00;
}

/* Links */
.markdown-content :deep(a) {
  color: #ff6b00;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.markdown-content :deep(a:hover) {
  color: #ff8533;
  border-bottom-color: #ff8533;
}

/* Inline Code */
.markdown-content :deep(code) {
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: #ffa366;
}

/* Code Blocks */
.markdown-content :deep(pre) {
  background: #0d0d0d;
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.markdown-content :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Blockquotes */
.markdown-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: rgba(255, 107, 0, 0.05);
  border-left: 4px solid #ff6b00;
  border-radius: 4px;
}

.markdown-content :deep(blockquote p) {
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

/* Tables */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(20, 20, 20, 0.5);
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content :deep(th) {
  background: rgba(255, 107, 0, 0.2);
  color: #ff6b00;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(255, 107, 0, 0.3);
}

.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.markdown-content :deep(tr:hover) {
  background: rgba(255, 107, 0, 0.05);
}

/* Horizontal Rule */
.markdown-content :deep(hr) {
  border: none;
  border-top: 2px solid rgba(255, 107, 0, 0.2);
  margin: 2rem 0;
}

/* Strong/Bold */
.markdown-content :deep(strong) {
  color: #fff;
  font-weight: 600;
}

/* Emphasis/Italic */
.markdown-content :deep(em) {
  color: #ffa366;
  font-style: italic;
}

/* Images */
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Scrollbar Styling */
.doc-sidebar::-webkit-scrollbar,
.doc-content::-webkit-scrollbar {
  width: 8px;
}

.doc-sidebar::-webkit-scrollbar-track,
.doc-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.doc-sidebar::-webkit-scrollbar-thumb,
.doc-content::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 0, 0.5);
  border-radius: 4px;
}

.doc-sidebar::-webkit-scrollbar-thumb:hover,
.doc-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 107, 0, 0.7);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .doc-container {
    flex-direction: column;
  }

  .doc-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid rgba(255, 107, 0, 0.2);
  }

  .doc-content {
    padding: 2rem 1.5rem;
    max-height: none;
  }

  .markdown-content :deep(h1) {
    font-size: 1.875rem;
  }

  .markdown-content :deep(h2) {
    font-size: 1.5rem;
  }

  .markdown-content :deep(pre) {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .doc-content {
    padding: 1.5rem 1rem;
  }

  .doc-header h1 {
    font-size: 2rem;
  }

  .markdown-content :deep(h1) {
    font-size: 1.5rem;
  }

  .markdown-content :deep(h2) {
    font-size: 1.25rem;
  }

  .markdown-content :deep(h3) {
    font-size: 1.125rem;
  }

  .markdown-content :deep(pre) {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
}
</style>

