<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

function getPosterUrl(size = 'w300') {
  const path = props.item?.poster_path
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Poster'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

function getBackdropUrl(size = 'w300') {
  const path = props.item?.backdrop_path
  if (!path) return 'https://via.placeholder.com/600x340?text=No+Backdrop'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

const backdropImageUrl = computed(() => getBackdropUrl('w300'))
const posterImageUrl = computed(() => getPosterUrl('w185'))

const title = computed(() => props.item.title || props.item.name || 'Untitled')
</script>

<template>
  <div class="side-item">
    <div class="side-item-inner">
      <div class="side-item-image">
        <img :src="posterImageUrl" :alt="title" />
      </div>
      <div class="side-item-content">
        <div class="play-wrapper">
          <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" class="play-btn" viewBox="0 0 24 24"
            fill="currentColor" role="presentation">
            <path
              d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z">
            </path>
            <path
              d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z">
            </path>
          </svg>
          <span class="duration">3:18</span>
        </div>
        <p class="title">{{ title }}</p>
        <p class="subtitle">Watch Now</p>
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
</template>

<style scoped>
.side-item {
  position: relative;
  height: 148px;
}

.side-item-image {
  position: relative;
  height: 100%;
  width: 88px;
  overflow: hidden;
}

.side-item-image img {
  height: 100%;
  width: 88px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 16px;
}

.side-item-inner {
  padding: 0px 16px;
  flex-direction: row;
  display: flex;
}

.side-item-content {
  flex: 1;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 8px 0 16px;
  display: flex;
}

.title {
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtitle {
  max-width: 100%;
  color: #c3c3c3;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-wrapper {
  display: flex;
  align-items: end;
  justify-content: start;
  margin-bottom: 10px;
}

.play-btn {
  margin-right: 8px;
}

.play-btn:hover {
  color: #f5c518;
}

.duration {
  color: #c3c3c3;
  font-size: 16px;
  line-height: 1;
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
</style>
