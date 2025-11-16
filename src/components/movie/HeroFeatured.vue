<script setup>
import { computed } from 'vue'
import FeaturedItem from './FeaturedItem.vue'

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
})

const hero = computed(() => props.movies?.[0] || null)
const sideList = computed(() => props.movies?.slice(1, 4) || [])

function image(path, size = 'w780') {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
</script>

<template>
  <section class="hero">
    <div class="hero-inner" v-if="hero">
      <div class="hero-main-wrapper">
        <div
          class="hero-main"
          :style="{ backgroundImage: `url(${image(hero.backdrop_path, 'w1280')})` }"
        >
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <div class="poster">
            <img class="poster-img" :src="image(hero.poster_path, 'w342')" :alt="hero.title" />
            <img
              class="bookmark-icon"
              src="@/assets/bookmark_btn.svg"
              width="40"
              height="50"
              alt="bookmark"
            />
          </div>
          <div class="text">
            <img src="@/assets/play_btn.svg" width="120" height="120" />
            <div class="text-content">
              <h1 class="title">'{{ hero.title }}' Make us Feel Every Emotion</h1>
              <p class="subtitle">Watch the new "{{ hero.title }}" trailer</p>
            </div>
          </div>
        </div>
      </div>
      <aside class="hero-side">
        <div class="side-header">
          <span class="dot"></span>
          <span class="title">Featured Videos</span>

          <div class="spacer"></div>

          <button class="browse-btn">
            <span>Browse Trailers</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul class="side-list">
          <FeaturedItem v-for="m in sideList" :key="m.id" :item="m" />
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  padding: 16px 0 24px 0;
}

.hero-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 370px;
  gap: 32px;
}

.hero-main {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
}

.hero-main-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 300px;
  width: 100%;
  background: linear-gradient(to top, rgba(14, 14, 14, 1) 0%, rgba(14, 14, 14, 0) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero-content {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding: 24px;
}

.poster {
  position: relative;
  flex-shrink: 0;
}

.poster-img {
  width: 190px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  display: block;
}

.bookmark-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
}

.text {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.text img {
  flex-shrink: 0;
}

.text-content {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.text-content .title {
  color: #fff;
  margin: 0 0 8px 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.text-content .subtitle {
  color: #cfcfcf;
  margin: 0;
  font-size: 28px;
  line-height: 1;
}

.play-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(163, 163, 163, 0.08);
  color: #e5e5e5;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
}

.hero-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spacer {
  flex: 1;
}

.side-header {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #cfcfcf;
  font-size: 14px;
  margin-bottom: 26px;
}

.side-header .dot {
  width: 4px;
  height: 4px;
  background: #f5c518;
  border-radius: 999px;
}

.side-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.side-item {
  position: relative;
}
.side-item img {
  width: 100%;
  border-radius: 8px;
  display: block;
}
.side-meta {
  position: absolute;
  inset: auto 8px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.side-title {
  color: #fff;
  margin: 0;
  font-size: 13px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
.mini-play {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.browse-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  height: 42px;
  background-color: rgba(163, 163, 163, 0.06);
  color: #cfcfcf;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  font-family: 'Roboto';
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .hero-main {
    min-height: 280px;
  }
  .poster img {
    width: 120px;
  }
}
</style>
