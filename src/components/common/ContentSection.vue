<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import VerticalMovieCard from '@/components/movie/VerticalMovieCard.vue'
import NavButton from '@/components/common/NavButton.vue'

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
  showEmptyState: {
    type: Boolean,
    default: false,
  },
  emptyStateTitle: {
    type: String,
    default: 'Sign in to access your Watchlist',
  },
  emptyStateDescription: {
    type: String,
    default: 'Save shows and movies to keep track of what you want to watch.',
  },
  emptyStateButtonText: {
    type: String,
    default: 'Sign in to IMDb',
  },
})

const scrollerRef = ref(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const isHovered = ref(false)

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
                <svg width="16" height="24" xmlns="http://www.w3.org/2000/svg"
                  class="ipc-icon--chevron-right-inline title-chevron" viewBox="0 0 24 24" fill="currentColor"
                  role="presentation">
                  <path
                    d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                  </path>
                </svg>
              </h2>
              <p class="section-subtitle" v-if="subtitle">
                {{ subtitle }}
              </p>
            </div>
          </div>
        </div>

        <div class="movies-row" v-if="content.length > 0">
          <div class="movies-row-wrapper" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
            <NavButton v-if="canScrollPrev && isHovered" direction="prev" offset="0px" @click="scrollPrev"
              class="row-nav-btn row-nav-btn-prev" />
            <div ref="scrollerRef" class="row-scroller">
              <div class="row-track">
                <template v-for="(item, index) in content" :key="item.id || item.url || index">
                  <slot name="card" :movie="item" :article="item">
                    <VerticalMovieCard :movie="item" />
                  </slot>
                </template>
              </div>
            </div>
            <NavButton v-if="canScrollNext" direction="next" offset="0px" @click="scrollNext"
              class="row-nav-btn row-nav-btn-next" />
          </div>
        </div>
        <div v-else-if="showEmptyState" class="empty-state">
          <div class="empty-state-content">
            <div class="empty-state-icon">
              <img src="@/assets/bookmark_btn.svg" alt="Watchlist Empty State" />
            </div>
            <div class="empty-state-content-inner">
              <h3 class="empty-state-title">{{ emptyStateTitle }}</h3>
              <p class="empty-state-description">{{ emptyStateDescription }}</p>
              <button class="empty-state-button">{{ emptyStateButtonText }}</button>
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
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 1.2em;
  background-color: #f5c518;
  margin-right: 8px;
  flex-shrink: 0;
  border-radius: 4px;
}

.title-chevron {
  display: inline-flex;
  margin-left: 6px;
  color: #fff;
  width: 16px;
  height: 16px;
  transition: fill 0.2s ease;
}

.section-title:hover .title-chevron {
  fill: #f5c518;
}

.section-subtitle {
  margin: 0;
  margin-top: 2px;
  color: #919191;
  font-size: 0.875rem;
}

.movies-row {
  overflow: hidden;
  position: relative;
}

.movies-row-wrapper {
  position: relative;
}

.row-scroller {
  position: relative;
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

.row-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.row-nav-btn-prev {
  left: 0;
}

.row-nav-btn-next {
  right: 0;
}

.empty-state {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 12px;
  margin: 0 24px;
  padding: 24px;
}

.empty-state-content {
  text-align: center;
}

.empty-state-icon {
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.empty-state-icon svg {
  width: 48px;
  height: 48px;
}

.empty-state-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}

.empty-state-description {
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
}

.empty-state-button {
  min-height: 2.25rem;
  background-color: #ffffff14;
  color: #5799ef;
  border: none;
  border-radius: 24px;
  padding: 0px 32px;
  margin: 32px 0 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  font-family: 'Roboto';
  cursor: pointer;
}

.empty-state-button:hover {
  background-color: #3a3a3a;
}

.empty-state-content-inner {
  margin-top: 0.5rem;
}
</style>
