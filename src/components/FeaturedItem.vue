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
  <li class="side-item">
    <div class="side-item-inner">
      <img class="backdrop" :src="backdropImageUrl" :alt="title" />
      <div class="overlay"></div>
      <div class="movie-info">
        <img class="poster" :src="posterImageUrl" :alt="title" />
        <div class="content">
          <p class="title">{{ title }}</p>
          <p class="subtitle">Watch the new "{{ title }}"" Trailer</p>
          <div class="spacer"></div>
          <div class="play-wrapper">
            <div class="spacer"></div>
            <span class="duration">3:18</span>
            <img class="play-btn" src="@/assets/play_btn.svg" width="50" height="50" />
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.side-item-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 371 / 183;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 20px;
}

.side-item {
  position: relative;
}
.backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-info {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 22px 14px;
  gap: 1rem;
}

.poster {
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}
.content {
  display: flex;
  flex: 1;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  margin-bottom: 10px;
  color: #c3c3c3;
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

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.play-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  margin-left: 10px;
}

.duration {
  color: #c3c3c3;
  font-size: 16px;
  line-height: 1;
}

.spacer {
  flex: 1;
}
</style>
