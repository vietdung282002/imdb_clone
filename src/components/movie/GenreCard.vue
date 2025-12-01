<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  genre: {
    type: Object,
    required: true,
  },
})

const backgroundUrl = computed(() => {
  const path = props.genre.firstMovie?.backdrop_path || props.genre.firstMovie?.poster_path
  return getImageUrl(path)
})
</script>

<template>
  <div class="genre-card">
    <div class="genre-image" :style="{ backgroundImage: `url(${backgroundUrl})` }">
      <div class="genre-overlay">
        <button class="add-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
            role="presentation">
            <path
              d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
            </path>
          </svg>
        </button>
      </div>
    </div>
    <div class="genre-name">
      {{ genre.name }}
    </div>
  </div>
</template>

<style scoped>
.genre-card {
  width: 300px;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.genre-image {
  position: relative;
  width: 100%;
  padding-top: 60%;
  background-size: cover;
  background-position: center;
}

.genre-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
}

.add-btn {
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 2;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background-color: rgba(15, 15, 15, 0.9);
  color: #fff;
  cursor: pointer;
}

.add-btn svg {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.genre-name {
  background-color: rgb(26, 26, 26);
  padding: 8px 12px 12px;
  color: #fff;
  font-size: 0.95rem;
}
</style>
