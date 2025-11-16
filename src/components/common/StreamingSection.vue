<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useMovieStore } from '@/stores/movie'
import VerticalMovieCard from '@/components/movie/VerticalMovieCard.vue'

const movieStore = useMovieStore()

const streamingServices = [
  { id: 'prime', name: 'Prime Video' },
  { id: 'disney', name: 'Disney+' },
  { id: 'hulu', name: 'Hulu' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'hbo', name: 'HBO Max' },
]

const selectedService = ref('prime')

const currentContent = computed(() => {
  return movieStore.streaming[selectedService.value] || []
})

const scrollerRef = ref(null)
const tabsScrollerRef = ref(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const canScrollTabsPrev = ref(false)
const canScrollTabsNext = ref(false)

const scrollPositions = ref({
  prime: 0,
  disney: 0,
  hulu: 0,
  netflix: 0,
  hbo: 0,
})

function getItemWidth() {
  const track = scrollerRef.value?.querySelector('.row-track')
  const first = track?.children?.[0]
  return first ? first.getBoundingClientRect().width : 220
}

function scrollPage(direction = 1) {
  if (!scrollerRef.value) return

  const viewport = scrollerRef.value.getBoundingClientRect().width
  const itemW = getItemWidth()
  const itemsPerPage = Math.max(1, Math.floor(viewport / (itemW + 16)))
  const distance = direction * itemsPerPage * (itemW + 16)
  scrollerRef.value.scrollLeft += distance
  updateArrowState()
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

function updateTabsArrowState() {
  const el = tabsScrollerRef.value
  if (!el) return
  const { scrollLeft, scrollWidth, clientWidth } = el
  const maxScroll = scrollWidth - clientWidth
  const epsilon = 2
  canScrollTabsPrev.value = scrollLeft > epsilon
  canScrollTabsNext.value = scrollLeft < maxScroll - epsilon
}

function handleViewportChange() {
  if (scrollerRef.value) {
    scrollPositions.value[selectedService.value] = scrollerRef.value.scrollLeft
  }
  updateArrowState()
  updateTabsArrowState()
}

onMounted(() => {
  if (movieStore.streaming.prime.length === 0) {
    movieStore.fetchStreamingMovies()
  }
  updateArrowState()
  updateTabsArrowState()
  scrollerRef.value?.addEventListener('scroll', handleViewportChange, { passive: true })
  tabsScrollerRef.value?.addEventListener('scroll', handleViewportChange, { passive: true })
  window.addEventListener('resize', handleViewportChange)
})

onBeforeUnmount(() => {
  scrollerRef.value?.removeEventListener('scroll', handleViewportChange)
  tabsScrollerRef.value?.removeEventListener('scroll', handleViewportChange)
  window.removeEventListener('resize', handleViewportChange)
})

watch(
  () => currentContent.value,
  (newMovies) => {
    if (newMovies && newMovies.length > 0) {
      requestAnimationFrame(() => {
        if (scrollerRef.value) {
          scrollerRef.value.scrollLeft = scrollPositions.value[selectedService.value] || 0
        }
        updateArrowState()
      })
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => selectedService.value,
  (newService, oldService) => {
    if (oldService && scrollerRef.value) {
      scrollPositions.value[oldService] = scrollerRef.value.scrollLeft
    }
    requestAnimationFrame(() => {
      if (scrollerRef.value) {
        scrollerRef.value.scrollLeft = scrollPositions.value[newService] || 0
      }
      updateArrowState()
    })
  },
)
</script>

<template>
  <div class="content-section-wrapper">
    <div class="watermark-text">Streaming Now</div>
    <section class="content-section">
      <div class="container">
        <div class="streaming-tabs-wrapper">
          <div ref="tabsScrollerRef" class="tabs-scroller">
            <div class="tabs-container">
              <button
                v-for="service in streamingServices"
                :key="service.id"
                class="streaming-tab"
                :class="{ active: selectedService === service.id }"
                @click="selectedService = service.id"
              >
                {{ service.name }}
              </button>
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

        <div class="movies-row" v-if="currentContent.length > 0">
          <div ref="scrollerRef" class="row-scroller">
            <div class="row-track">
              <template v-for="movie in currentContent" :key="movie.id">
                <slot name="card" :movie="movie">
                  <VerticalMovieCard :movie="movie" :hasPlayButton="false" />
                </slot>
              </template>
            </div>
          </div>
        </div>
        <div v-else class="empty-state"></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section-wrapper {
  position: relative;
}

.watermark-text {
  margin-top: 0;
  font-size: 10rem;
  font-weight: 700;
  color: rgba(195, 195, 195, 0.1);
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
  text-align: center;
  max-width: 1500px;
  margin: 0 auto;
}

.content-section {
  position: relative;
  z-index: 1;
  margin-top: 170px;
}

.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
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
  transition: all 0.2s;
}

.ctrl-btn:hover:not(.disabled) {
  background-color: #2a2a2a;
  border-color: #3f3f3f;
}

.ctrl-btn.disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.streaming-tabs-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tabs-scroller {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.tabs-scroller::-webkit-scrollbar {
  display: none;
}

.tabs-container {
  width: fit-content;
  display: flex;
  gap: 2rem;
  padding: 9px;
  background-color: #1a1a1a;
  border-radius: 18px;
}

.streaming-tab {
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  color: #c3c3c3;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 10px;
  transition: all 0.2s;
}

.streaming-tab.active {
  background-color: #f5c518;
  color: #121212;
  font-weight: 500;
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

.row-scroller::-webkit-scrollbar {
  display: none;
}

.row-track {
  display: flex;
  gap: 1rem;
  padding-bottom: 2px;
}

.row-track > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #919191;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .streaming-tabs-wrapper {
    flex-wrap: wrap;
  }
}
</style>
