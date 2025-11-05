<script setup>
import { ref, onMounted, onBeforeUnmount, watch,} from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  movies: {
    type: Array,
    default: () => [],
  },
})

const scrollerRef = ref(null)
const isAnimating = ref(false)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

function getItemWidth() {
  const track = scrollerRef.value?.querySelector('.row-track')
  const first = track?.children?.[0]
  return first ? first.getBoundingClientRect().width : 220
}

function scrollPage(direction = 1) {
  if (!scrollerRef.value) return

  const viewport = scrollerRef.value.getBoundingClientRect().width
  const itemW = getItemWidth()
  const itemsPerPage = Math.max(1, Math.floor(viewport / itemW))
  const distance = direction * itemsPerPage * (itemW + 16)
  animateScroll(distance, 1200)
}

const scrollPrev = () => scrollPage(-1)
const scrollNext = () => scrollPage(1)

function updateArrowState() {
  const el = scrollerRef.value
  if (!el) return
  const { scrollLeft, scrollWidth, clientWidth } = el
  const maxScroll = scrollWidth - clientWidth
  const epsilon = 2
  canScrollPrev.value = scrollLeft > epsilon
  canScrollNext.value = scrollLeft < maxScroll - epsilon
}

function handleViewportChange() {
  updateArrowState()
}

onMounted(() => {
  updateArrowState()
  scrollerRef.value?.addEventListener('scroll', handleViewportChange, { passive: true })
  window.addEventListener('resize', handleViewportChange)
})

onBeforeUnmount(() => {
  scrollerRef.value?.removeEventListener('scroll', handleViewportChange)
  window.removeEventListener('resize', handleViewportChange)
})

watch(
  () => props.movies,
  (newMovies) => {
    if (newMovies && newMovies.length > 0) {
      requestAnimationFrame(() => {
        updateArrowState()
      })
    }
  },
  { immediate: true, deep: true },
)

function animateScroll(distance, duration = 1200) {
  const el = scrollerRef.value
  if (!el) return
  const start = el.scrollLeft
  const target = start + distance
  const t0 = performance.now()

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    el.scrollLeft = start + (target - start) * easeOutCubic(p)
    if (p < 1) {
      requestAnimationFrame(step)
    } else {
      isAnimating.value = false
      updateArrowState()
    }
  }

  isAnimating.value = true
  requestAnimationFrame(step)
}
</script>

<template>
  <section class="movie-section">
    <div class="container">
      <div class="section-header">
        <div class="title-wrap">
          <div class="titles">
            <h2 class="section-title">
              {{ title }}
              <span class="title-arrow" aria-hidden="true">
                <img src="@/assets/arrow.svg" width="28" height="28" />
              </span>
            </h2>
            <p class="section-subtitle" v-if="subtitle">
              {{ subtitle }}
            </p>
          </div>
        </div>
        <div class="controls">
          <button
            class="ctrl-btn"
            :class="{ disabled: !canScrollPrev }"
            aria-label="previous"
            @click="scrollPrev"
          >
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
          <button
            class="ctrl-btn"
            :class="{ disabled: !canScrollNext }"
            aria-label="next"
            @click="scrollNext"
          >
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
        <div ref="scrollerRef" class="row-scroller" :class="{ 'no-snap': isAnimating }">
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
  display: inline-flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #f5c518;
  margin-right: 8px;
  transform: translateY(-1px);
}

.title-arrow {
  display: inline-flex;
  margin-left: 6px;
  color: #919191;
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

.ctrl-btn.disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.movies-row {
  overflow: hidden;
}

.row-scroller {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  scroll-behavior: auto;
  scroll-snap-type: x mandatory;
}
.row-scroller.no-snap {
  scroll-snap-type: none;
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
