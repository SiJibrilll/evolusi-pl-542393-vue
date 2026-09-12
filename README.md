# TaskFlow (evolusi-pl-fe-jibril)

[![CI/CD](https://github.com/SiJibrilll/evolusi-pl-542393-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/SiJibrilll/evolusi-pl-542393-vue/actions/workflows/ci.yml)

Aplikasi To-Do List modern dan sederhana dengan Vue 3, Vite, dan localStorage.

## 📦 Bundle Size Summary

Hasil build produksi dioptimalkan agar tetap ringan, cepat dimuat, dan hemat bandwidth:

<!-- BUNDLE_SIZE_START -->
| Asset | Deskripsi | Ukuran (Raw) | Gzipped |
| --- | --- | --- | --- |
| `index-CqN4eyvf.css` | Style Global & Landing | 8.49 KB | 2.11 KB |
| `index-nV3KbuCF.js` | Bundel Utama (Core JS) | 94.60 KB | 35.58 KB |
| `TodoView-BlP6ORkc.css` | Scoped CSS | 7.99 KB | 1.77 KB |
| `TodoView-DU_yhMl2.js` | Lazy Route JS | 7.74 KB | 2.90 KB |
| **Total Dist** | **Seluruh Aset Produksi** | **118.82 KB** | **42.35 KB** |
<!-- BUNDLE_SIZE_END -->

> 💡 *Catatan: Ringkasan ukuran bundel ini juga dihitung dan ditampilkan secara otomatis pada setiap proses build di GitHub Actions CI/CD workflow.*

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
