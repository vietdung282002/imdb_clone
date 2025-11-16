<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  duration: {
    type: String,
    default: '2:50',
  },
  showReleaseDate: {
    type: Boolean,
    default: false,
  },
})

const posterUrl = computed(() => getImageUrl(props.movie.backdrop_path))

const formattedDate = computed(() => {
  if (!props.movie.release_date) return null
  const date = new Date(props.movie.release_date)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${months[date.getMonth()]} ${date.getDate()}`
})
</script>

<template>
  <div class="horizontal-movie-card">
    <div class="thumbnail-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="thumbnail" />
      <img
        v-if="showReleaseDate"
        class="bookmark-icon"
        src="@/assets/bookmark_btn.svg"
        width="32"
        height="40"
        alt="bookmark"
      />
      <div class="play-overlay">
        <img src="@/assets/play.svg" width="24" height="24" alt="play" class="play-icon" />
        <span class="duration">{{ duration }}</span>
      </div>
    </div>
    <div class="card-info">
      <div v-if="showReleaseDate && formattedDate" class="release-date">
        <svg
          class="calendar-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            stroke-width="2"
          />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" />
        </svg>
        <span class="date-text">{{ formattedDate }}</span>
      </div>
      <h3 class="card-title">{{ movie.title }}</h3>
      <a v-if="!showReleaseDate" href="#" class="watch-link">Watch now</a>
    </div>
  </div>
</template>

<style scoped>
.horizontal-movie-card {
  width: 343px;
  flex-shrink: 0;
  cursor: pointer;
}

.thumbnail-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 12px;
}

.bookmark-icon {
  position: absolute;
  top: 0px;
  left: 8px;
  z-index: 2;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  border-radius: 10px;
}

.play-overlay {
  width: fit-content;
  position: absolute;
  bottom: 19px;
  left: 14px;
  right: 0;
  padding: 7px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 45px;
  background: rgba(163, 163, 163, 0.15);
}

.play-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.duration {
  color: #c3c3c3;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.release-date {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.calendar-icon {
  color: #fff;
  flex-shrink: 0;
}

.date-text {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
}

.card-title {
  margin: 0;
  font-size: 0.9375rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.watch-link {
  color: #f5c518;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.watch-link:hover {
  color: #ffd700;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .horizontal-movie-card {
    width: 240px;
  }
}
</style>
