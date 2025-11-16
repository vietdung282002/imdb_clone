<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #000;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #242424;
  --text-primary: #fff;
  --text-secondary: #c3c3c3;
  --text-muted: #666;
  --accent-color: #f5c518;
  --border-color: #333;
}

.dark {
  --bg-primary: #0e0e0e;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #242424;
  --text-primary: #fff;
  --text-secondary: #c3c3c3;
  --text-muted: #666;
  --accent-color: #f5c518;
  --border-color: #333;
}

.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e5e5e5;
  --text-primary: #000;
  --text-secondary: #333;
  --text-muted: #666;
  --accent-color: #f5c518;
  --border-color: #ddd;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition:
    background-color 0.3s,
    color 0.3s;
}

#app {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
