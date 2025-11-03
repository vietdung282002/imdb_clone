<script setup>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    default: () => [],
  },
})

const scrollerEl = ref(null)

function getCardWidth() {
  const track = scrollerEl.value?.querySelector('.row-track')
  const first = track?.children?.[0]
  return first ? first.getBoundingClientRect().width : 220
}

function scrollByPage(direction = 1) {
  if (!scrollerEl.value) return
  const viewport = scrollerEl.value.getBoundingClientRect().width
  const cardW = getCardWidth()
  const cardsPerPage = Math.max(1, Math.floor(viewport / (cardW + 16)))
  const distance = direction * cardsPerPage * (cardW + 16)
  scrollerEl.value.scrollBy({ left: distance, behavior: 'smooth' })
}

const scrollPrev = () => scrollByPage(-1)
const scrollNext = () => scrollByPage(1)
</script>

<template>
  <section class="movie-section">
    <div class="container">
      <div class="section-header">
        <div class="title-wrap">
          <span class="dot"></span>
          <div class="titles">
            <h2 class="section-title">{{ title }}</h2>
            <p class="section-subtitle">TV shows and movies just for you</p>
          </div>
        </div>
        <div class="controls">
          <button class="ctrl-btn" aria-label="previous" @click="scrollPrev">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="ctrl-btn" aria-label="next" @click="scrollNext">
            <svg
              width="18"
              height="18"
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
      </div>

      <div class="movies-row" v-if="movies.length > 0">
        <div ref="scrollerEl" class="row-scroller">
          <div class="row-track">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
          </div>
        </div>
      </div>
      <div v-else class="loading">Loading...</div>
    </div>
  </section>
</template>

<style scoped>
.movie-section {
  margin-bottom: 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #f5c518;
}

.titles {
  display: flex;
  flex-direction: column;
}

.section-title {
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
}

.section-subtitle {
  margin: 0;
  margin-top: 2px;
  color: #919191;
  font-size: 0.875rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ctrl-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #2f2f2f;
  background-color: #1a1a1a;
  color: #bdbdbd;
  cursor: pointer;
}

.movies-row {
  overflow: hidden;
}

.row-scroller {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}
.row-scroller::-webkit-scrollbar {
  display: none;
}

.row-track {
  display: flex;
  gap: 1rem;
  padding-bottom: 2px;
}

.row-track > * {
  flex: 0 0 220px;
  scroll-snap-align: start;
}

.loading {
  color: #999;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .row-inner {
    grid-template-columns: repeat(3, minmax(140px, 1fr));
  }
}
</style>
