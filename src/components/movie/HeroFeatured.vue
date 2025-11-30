<script setup>
import { computed, ref } from 'vue'
import FeaturedItem from './FeaturedItem.vue'
import NavButton from '../common/NavButton.vue'

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)

const hero = computed(() => {
  if (!props.movies || props.movies.length === 0) return null
  return props.movies[currentIndex.value] || null
})

const sideList = computed(() => {
  if (!props.movies || props.movies.length === 0) return []
  const total = props.movies.length
  if (total <= 1) return []

  const result = []
  for (let i = 0; i < 3; i++) {
    const nextIndex = (currentIndex.value + 1 + i) % total
    result.push(props.movies[nextIndex])
  }
  return result
})

function image(path, size = 'w780') {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

function nextHero() {
  if (!props.movies || props.movies.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.movies.length
}

function prevHero() {
  if (!props.movies || props.movies.length === 0) return
  currentIndex.value = currentIndex.value === 0 ? props.movies.length - 1 : currentIndex.value - 1
}
</script>

<template>
  <section class="hero">
    <div class="hero-inner" v-if="hero">
      <div class="hero-main-wrapper">
        <NavButton direction="prev" @click="prevHero" />
        <div class="hero-main" :style="{ backgroundImage: `url(${image(hero.backdrop_path, 'w1280')})` }">
          <div class="hero-overlay"></div>
        </div>
        <NavButton direction="next" @click="nextHero" />
        <div class="hero-content">
          <div class="poster">
            <img class="poster-img" :src="image(hero.poster_path, 'w342')" :alt="hero.title" />
            <img class="bookmark-icon" src="@/assets/bookmark_btn.svg" width="40" height="50" alt="bookmark" />
          </div>
          <div class="text">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="hero-play-icon" viewBox="0 0 24 24"
              fill="currentColor" role="presentation">
              <path
                d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z">
              </path>
              <path
                d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z">
              </path>
            </svg>
            <div class="text-content">
              <div class="title">
                <div class="title-text">'{{ hero.title }}' Make us Feel Every Emotion</div>
                <div class="duration">2:15</div>
              </div>
              <div class="subtitle">Watch the trailer</div>
              <div class="action-wrapper">
                <div class="action-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16"
                    class="ipc-icon ipc-icon--thumb-up ipc-reaction-summary__likes-icon" viewBox="0 0 24 24"
                    fill="currentColor" role="presentation">
                    <path
                      d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z">
                    </path>
                  </svg>
                  <span class="action-count">100</span>
                </div>
                <div class="action-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    class="ipc-reaction ipc-reaction--heart ipc-reaction--inline ipc-reaction-summary__reaction"
                    viewBox="0 0 24 24" fill="rgb(238, 62, 129)" role="presentation">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z">
                    </path>
                  </svg>
                  <span class="action-count">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside class="hero-side">
        <div class="side-header">
          <span class="title">Up next</span>
        </div>
        <div class="side-list">
          <FeaturedItem v-for="m in sideList" :key="m.id" :item="m" />
        </div>
        <div class="side-footer">
          <a href="#" class="footer-text">Browse trailers</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            class="ipc-icon ipc-icon--chevron-right chevron-right" viewBox="0 0 24 24" fill="currentColor"
            role="presentation">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z">
            </path>
          </svg>
        </div>
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
  max-width: 1280px;
  margin: 8px auto;
  display: grid;
  grid-template-columns: 1fr 370px;
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
  padding: 0 8px;
}

.hero-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 300px;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
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
  padding: 0 16px;
}

.poster {
  position: relative;
  flex-shrink: 0;
  margin-right: 8px;
}

.poster-img {
  width: 165px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  display: block;
  border-top-left-radius: 0
}

.bookmark-icon {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3;
}

.text {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.text-content .duration {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  margin-left: 32px;
}

.text-content .subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  margin-top: 4px;
}

.hero-play-icon {
  height: 72px;
  margin: 0px 16px 0px 0px;
  width: 72px;
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
  width: 400px;
  gap: 8px;
}

.side-header {
  display: inline-flex;
  gap: 8px;
  color: #cfcfcf;
  font-size: 14px;
  height: 52px;
}

.side-header .title {
  color: rgb(245, 197, 24);
  font-weight: 600;
  font-size: 20px;
  padding: 4px 0px;
}

.side-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(255, 255, 255, 0.05) 100%);
}

.side-footer {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 16px 16px 0;
}

.side-footer .footer-text {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  line-height: 1;
  transition: color 0.2s ease;
}

.side-footer:hover .footer-text,
.side-footer .footer-text:hover {
  color: rgb(245, 197, 24);
}

.side-footer .footer-text:active {
  color: rgb(245, 197, 24);
  opacity: 0.8;
}

.side-footer:hover .chevron-right,
.side-footer .footer-text:hover~.chevron-right {
  color: rgb(245, 197, 24);
}

.side-footer .footer-text:active~.chevron-right {
  color: rgb(245, 197, 24);
  opacity: 0.8;
}

.action-wrapper {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 4px;
  flex-direction: row;
  height: 24px;
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.action-count {
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
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
