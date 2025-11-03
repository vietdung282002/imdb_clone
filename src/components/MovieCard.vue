<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const posterUrl = computed(() => getImageUrl(props.movie.poster_path))
const rating = computed(() => props.movie.vote_average?.toFixed(1) || 'N/A')
</script>

<template>
  <div class="movie-card">
    <div class="poster-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <div class="rating-badge">{{ rating }}</div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-date">{{ movie.release_date?.split('-')[0] || 'N/A' }}</p>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.poster-wrapper {
  position: relative;
  width: 100%;
  padding-top: 150%; /* 2:3 aspect ratio */
  overflow: hidden;
  background-color: #2a2a2a;
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #000;
  color: #f5c518;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.875rem;
}

.movie-info {
  padding: 1rem;
}

.movie-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-date {
  margin: 0;
  color: #999;
  font-size: 0.875rem;
}
</style>
