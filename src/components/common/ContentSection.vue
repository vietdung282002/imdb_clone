<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import VerticalMovieCard from '@/components/movie/VerticalMovieCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: Array,
    default: () => [],
  },
})

const scrollerRef = ref(null)
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
  () => props.content,
  (newMovies) => {
    if (newMovies && newMovies.length > 0) {
      requestAnimationFrame(() => {
        updateArrowState()
      })
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="content-section-wrapper">
    <section class="content-section">
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
            <button class="ctrl-btn" :class="{ disabled: !canScrollPrev }" aria-label="previous" @click="scrollPrev">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <button class="ctrl-btn" :class="{ disabled: !canScrollNext }" aria-label="next" @click="scrollNext">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div class="movies-row" v-if="content.length > 0">
          <div ref="scrollerRef" class="row-scroller">
            <div class="row-track">
              <template v-for="(item, index) in content" :key="item.id || item.url || index">
                <slot name="card" :movie="item" :article="item">
                  <VerticalMovieCard :movie="item" />
                </slot>
              </template>
            </div>
          </div>
        </div>
        <div v-else></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section-wrapper {
  position: relative;
}

.content-section {
  position: relative;
  z-index: 1;
  margin-top: 0;
}

.container {
  max-width: 1280px;
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
  gap: 8px;
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

.row-scroller::-webkit-scrollbar {
  display: none;
}

.row-track {
  display: flex;
  gap: 1rem;
  padding-bottom: 2px;
}

.row-track>* {
  flex: 0 0 auto;
  scroll-snap-align: start;
}
</style>
