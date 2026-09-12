<script setup>
import { RouterLink } from 'vue-router'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="landing-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="nav-container">
        <div class="brand">
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
        </div>

        <nav class="nav-links">
          <button type="button" class="nav-link" @click="scrollToSection('fitur')">Fitur</button>
          <button type="button" class="nav-link" @click="scrollToSection('cara-kerja')">
            Cara Kerja
          </button>
        </nav>

        <div class="nav-actions">
          <RouterLink to="/todos" class="btn btn-primary"> Buka Aplikasi </RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <!-- <div class="pill-badge">
            <span class="badge-dot"></span>
            <span>To-Do List Sederhana</span>
          </div> -->

          <h1 class="hero-title">Kelola tugas harian jadi lebih mudah dan teratur.</h1>

          <p class="hero-description">
            Catat tugas, atur prioritas, dan selesaikan pekerjaan Anda tanpa ribet.
          </p>

          <div class="hero-buttons">
            <RouterLink to="/todos" class="btn btn-primary btn-lg"> Mulai Sekarang </RouterLink>
            <button
              type="button"
              class="btn btn-secondary btn-lg"
              @click="scrollToSection('fitur')"
            >
              Lihat Fitur
            </button>
          </div>

          <div class="hero-highlights">
            <div class="highlight-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Cepat &amp; Ringan</span>
            </div>
            <div class="highlight-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Atur Prioritas</span>
            </div>
            <div class="highlight-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Pantau Progres</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="fitur" class="features-section">
        <div class="section-header">
          <span class="section-tag">Fitur Utama</span>
          <h2 class="section-title">Apa yang Bisa Dilakukan?</h2>
          <p class="section-subtitle">Fokus pada hal penting dengan fitur yang praktis.</p>
        </div>

        <div class="features-grid">
          <article class="feature-card">
            <div class="feature-icon icon-indigo">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3 class="feature-card-title">Catat Cepat</h3>
            <p class="feature-card-desc">
              Tulis ide dan tugas harian dalam hitungan detik agar tidak terlewat.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon icon-emerald">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                ></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <h3 class="feature-card-title">Kategori Tugas</h3>
            <p class="feature-card-desc">
              Kelompokkan tugas kerja, pribadi, atau belajar agar lebih rapi.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon icon-amber">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 class="feature-card-title">Tingkat Prioritas</h3>
            <p class="feature-card-desc">
              Tandai tugas penting agar Anda tahu mana yang harus dikerjakan dulu.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon icon-blue">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 class="feature-card-title">Pantau Selesai</h3>
            <p class="feature-card-desc">
              Lihat progres harian dan centang tugas yang telah Anda selesaikan.
            </p>
          </article>
        </div>
      </section>

      <!-- How It Works Section -->
      <section id="cara-kerja" class="how-it-works-section">
        <div class="section-header">
          <span class="section-tag">Cara Kerja</span>
          <h2 class="section-title">3 Langkah Mudah</h2>
          <p class="section-subtitle">Mulai hari produktif tanpa repot.</p>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Catat</h3>
            <p class="step-desc">Tulis semua daftar tugas Anda hari ini.</p>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Urutkan</h3>
            <p class="step-desc">Tentukan tugas yang paling penting lebih dulu.</p>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Selesaikan</h3>
            <p class="step-desc">Centang tugas selesai dan nikmati hari Anda.</p>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section id="mulai" class="cta-section">
        <div class="cta-card">
          <h2 class="cta-title">Siap lebih produktif hari ini?</h2>
          <p class="cta-desc">
            Kelola daftar tugas Anda dengan mudah. Gratis dan langsung bisa digunakan.
          </p>
          <RouterLink to="/todos" class="btn btn-primary btn-lg">
            Mulai Sekarang — Gratis
          </RouterLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <span class="brand-name">TaskFlow</span>
          <p class="footer-tagline">Aplikasi to-do list sederhana dan fokus.</p>
        </div>
        <p class="footer-copy">
          &copy; {{ new Date().getFullYear() }} TaskFlow. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Container & Global Page Styles */
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--color-text);
  background-color: var(--color-background);
  font-family: inherit;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(var(--color-background), 0.85);
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  max-width: 1120px;
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

.nav-links {
  display: none;
  align-items: center;
  gap: 1.75rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  background: none;
  border: none;
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.85;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition:
    opacity 0.2s,
    color 0.2s;
}

.nav-link:hover {
  opacity: 1;
  color: var(--color-primary);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--color-card);
  color: var(--color-heading);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-lg {
  padding: 0.85rem 1.6rem;
  font-size: 1.05rem;
}

/* Main Container */
main {
  flex: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

/* Hero Section */
.hero-section {
  padding: 5rem 0 4rem;
  text-align: center;
}

.hero-content {
  max-width: 720px;
  margin: 0 auto;
}

.pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
}

.hero-description {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.highlight-item svg {
  color: var(--color-primary);
}

/* Shared Section Header */
.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-heading);
  margin-bottom: 0.6rem;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.85;
}

/* Features Grid */
.features-section {
  padding: 4.5rem 0 3.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  padding: 1.75rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  margin-bottom: 1.25rem;
}

.icon-indigo {
  background-color: rgba(79, 70, 229, 0.12);
  color: #4f46e5;
}

.icon-emerald {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.icon-amber {
  background-color: rgba(245, 158, 11, 0.12);
  color: #d97706;
}

.icon-blue {
  background-color: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.feature-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.feature-card-desc {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.85;
}

/* How It Works Section */
.how-it-works-section {
  padding: 4rem 0 5rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.75rem;
}

.step-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  padding: 2rem 1.5rem;
  text-align: center;
}

.step-number {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.step-desc {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.85;
}

/* CTA Section */
.cta-section {
  padding: 2rem 0 6rem;
}

.cta-card {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(99, 102, 241, 0.16));
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 3.5rem 2rem;
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-heading);
  margin-bottom: 0.85rem;
}

.cta-desc {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.9;
  max-width: 520px;
  margin: 0 auto 2rem;
}

/* Footer */
.footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  padding: 2.5rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  .footer-container {
    flex-direction: row;
    text-align: left;
  }
}

.footer-tagline {
  font-size: 0.88rem;
  color: var(--color-text);
  opacity: 0.75;
  margin-top: 0.25rem;
}

.footer-copy {
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.7;
}
</style>
