<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'

const STORAGE_KEY = 'taskflow_todos_v1'

function getInitialTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Gagal membaca data dari localStorage:', error)
  }
  return []
}

const tasks = ref(getInitialTasks())

// Save to localStorage automatically on any changes
watch(
  tasks,
  (newTasks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error)
    }
  },
  { deep: true },
)

// Form inputs
const newTaskTitle = ref('')
const newCategory = ref('Pekerjaan')
const newPriority = ref('Sedang')
const currentFilter = ref('all')

const categories = ['Pekerjaan', 'Pribadi', 'Belajar', 'Umum']
const priorities = ['Tinggi', 'Sedang', 'Rendah']

// Computed statistics
const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter((t) => t.completed).length)
const activeTasks = computed(() => tasks.value.filter((t) => !t.completed).length)
const progressPercentage = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

// Filtered list
const filteredTasks = computed(() => {
  if (currentFilter.value === 'active') {
    return tasks.value.filter((t) => !t.completed)
  }
  if (currentFilter.value === 'completed') {
    return tasks.value.filter((t) => t.completed)
  }
  return tasks.value
})

// Actions
function addTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return

  tasks.value.unshift({
    id: 'task-' + Date.now(),
    title,
    category: newCategory.value,
    priority: newPriority.value,
    completed: false,
    createdAt: new Date().toLocaleDateString('id-ID'),
  })

  newTaskTitle.value = ''
}

function toggleTask(task) {
  task.completed = !task.completed
}

function deleteTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function clearCompleted() {
  tasks.value = tasks.value.filter((t) => !t.completed)
}
</script>

<template>
  <div class="todo-page">
    <!-- Navbar -->
    <header class="app-navbar">
      <div class="nav-container">
        <RouterLink to="/" class="brand">
          <div class="brand-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="brand-name">TaskFlow</span>
        </RouterLink>

        <RouterLink to="/" class="btn-back">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Kembali ke Beranda</span>
        </RouterLink>
      </div>
    </header>

    <!-- Main Content -->
    <main class="todo-main">
      <div class="todo-container">
        <!-- Header Info -->
        <div class="page-header">
          <h1 class="page-title">Daftar Tugas Saya</h1>
          <p class="page-desc">
            Kelola aktivitas Anda dengan mudah. Tugas tersimpan otomatis di browser.
          </p>
        </div>

        <!-- Progress Summary -->
        <div class="progress-card">
          <div class="progress-info">
            <span class="progress-label">Progres Penyelesaian</span>
            <span class="progress-stats">
              <strong>{{ completedTasks }}</strong> dari <strong>{{ totalTasks }}</strong> selesai
              ({{ progressPercentage }}%)
            </span>
          </div>
          <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="progressPercentage"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- New Task Form -->
        <form class="task-form" @submit.prevent="addTask">
          <div class="input-row">
            <input
              v-model="newTaskTitle"
              type="text"
              class="task-input"
              placeholder="Tulis tugas baru Anda di sini..."
              aria-label="Judul tugas baru"
              required
            />
            <button
              type="submit"
              class="btn btn-primary btn-submit"
              :disabled="!newTaskTitle.trim()"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Tambah Tugas</span>
            </button>
          </div>

          <div class="options-row">
            <div class="option-group">
              <label for="category-select" class="option-label">Kategori:</label>
              <select id="category-select" v-model="newCategory" class="option-select">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div class="option-group">
              <label for="priority-select" class="option-label">Prioritas:</label>
              <select id="priority-select" v-model="newPriority" class="option-select">
                <option v-for="prio in priorities" :key="prio" :value="prio">{{ prio }}</option>
              </select>
            </div>
          </div>
        </form>

        <!-- Filter and Control Bar -->
        <div class="control-bar">
          <div class="filter-tabs">
            <button
              type="button"
              class="filter-btn"
              :class="{ active: currentFilter === 'all' }"
              @click="currentFilter = 'all'"
            >
              Semua ({{ totalTasks }})
            </button>
            <button
              type="button"
              class="filter-btn"
              :class="{ active: currentFilter === 'active' }"
              @click="currentFilter = 'active'"
            >
              Aktif ({{ activeTasks }})
            </button>
            <button
              type="button"
              class="filter-btn"
              :class="{ active: currentFilter === 'completed' }"
              @click="currentFilter = 'completed'"
            >
              Selesai ({{ completedTasks }})
            </button>
          </div>

          <button v-if="completedTasks > 0" type="button" class="btn-clear" @click="clearCompleted">
            Hapus Selesai
          </button>
        </div>

        <!-- Task List -->
        <div class="task-list-wrapper">
          <ul v-if="filteredTasks.length > 0" class="task-list" role="list">
            <li
              v-for="task in filteredTasks"
              :key="task.id"
              class="task-item"
              :class="{ completed: task.completed }"
            >
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  class="sr-only"
                  :checked="task.completed"
                  @change="toggleTask(task)"
                />
                <span class="custom-checkbox" :class="{ checked: task.completed }">
                  <svg
                    v-if="task.completed"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </label>

              <div class="task-content">
                <span class="task-title" :class="{ strikethrough: task.completed }">
                  {{ task.title }}
                </span>
                <div class="task-meta">
                  <span class="badge badge-category">{{ task.category }}</span>
                  <span
                    class="badge badge-priority"
                    :class="'priority-' + task.priority.toLowerCase()"
                  >
                    {{ task.priority }}
                  </span>
                  <span class="task-date">{{ task.createdAt }}</span>
                </div>
              </div>

              <button
                type="button"
                class="btn-delete"
                title="Hapus tugas"
                aria-label="Hapus tugas"
                @click="deleteTask(task.id)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 class="empty-title">
              {{ currentFilter === 'all' ? 'Belum Ada Tugas' : 'Tidak Ada Tugas' }}
            </h3>
            <p class="empty-desc">
              {{
                currentFilter === 'all'
                  ? 'Ketik tugas baru pada formulir di atas untuk memulai hari produktif Anda.'
                  : 'Tidak ada tugas yang sesuai dengan filter ini saat ini.'
              }}
            </p>
          </div>
        </div>

        <!-- Footer Note -->
        <div class="storage-note">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Data tersimpan otomatis di localStorage browser Anda.</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.todo-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--color-text);
  background-color: var(--color-background);
  font-family: inherit;
}

/* Navbar */
.app-navbar {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(var(--color-background), 0.85);
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--color-primary);
  color: #ffffff;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-heading);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  opacity: 0.85;
  transition:
    opacity 0.2s,
    color 0.2s;
}

.btn-back:hover {
  opacity: 1;
  color: var(--color-primary);
}

/* Main Container */
.todo-main {
  flex: 1;
  padding: 2.5rem 1.5rem 4rem;
}

.todo-container {
  max-width: 720px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.page-desc {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.85;
}

/* Progress Card */
.progress-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.progress-label {
  font-weight: 600;
  color: var(--color-heading);
}

.progress-stats {
  color: var(--color-text);
  opacity: 0.85;
}

.progress-track {
  width: 100%;
  height: 8px;
  background-color: var(--color-background-soft);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Form */
.task-form {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.input-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-direction: column;
}

@media (min-width: 600px) {
  .input-row {
    flex-direction: row;
  }
}

.task-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s;
}

.task-input:focus {
  border-color: var(--color-primary);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  white-space: nowrap;
}

.options-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
}

.option-label {
  color: var(--color-text);
  opacity: 0.85;
}

.option-select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 0.88rem;
  outline: none;
  cursor: pointer;
}

.option-select:focus {
  border-color: var(--color-primary);
}

/* Controls */
.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: 0.4rem;
}

.filter-btn {
  background: none;
  border: 1px solid var(--color-border);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--color-primary);
}

.filter-btn.active {
  background-color: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
}

.btn-clear {
  background: none;
  border: none;
  font-size: 0.82rem;
  color: #ef4444;
  cursor: pointer;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.btn-clear:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Task List */
.task-list-wrapper {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  padding: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.task-item:hover {
  border-color: var(--color-primary);
}

.task-item.completed {
  opacity: 0.6;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.custom-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  color: #ffffff;
  transition: all 0.2s;
}

.custom-checkbox.checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.task-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.task-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-heading);
  word-break: break-word;
}

.task-title.strikethrough {
  text-decoration: line-through;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.task-date {
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.6;
}

.badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}

.badge-category {
  background-color: var(--color-background-mute);
  color: var(--color-text);
}

.priority-tinggi {
  background-color: #fee2e2;
  color: #b91c1c;
}

.priority-sedang {
  background-color: #fef3c7;
  color: #b45309;
}

.priority-rendah {
  background-color: #dcfce7;
  color: #15803d;
}

@media (prefers-color-scheme: dark) {
  .priority-tinggi {
    background-color: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
  .priority-sedang {
    background-color: rgba(245, 158, 11, 0.2);
    color: #fcd34d;
  }
  .priority-rendah {
    background-color: rgba(34, 197, 94, 0.2);
    color: #86efac;
  }
}

.btn-delete {
  background: none;
  border: none;
  color: var(--color-text);
  opacity: 0.45;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-delete:hover {
  opacity: 1;
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

/* Empty State */
.empty-state {
  padding: 3.5rem 1.5rem;
  text-align: center;
}

.empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.4rem;
}

.empty-desc {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.75;
  max-width: 360px;
  margin: 0 auto;
}

/* Storage Note */
.storage-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.65;
}
</style>
