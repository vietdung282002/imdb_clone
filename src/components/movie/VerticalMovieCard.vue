<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  hasPlayButton: {
    type: Boolean,
    default: true,
  },
})

const posterUrl = computed(() => getImageUrl(props.movie.poster_path))
const rating = computed(() => props.movie.vote_average?.toFixed(1) || 'N/A')
</script>

<template>
  <div class="movie-card">
    <div class="poster-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <img
        class="bookmark-icon"
        src="@/assets/bookmark_btn.svg"
        width="40"
        height="50"
        alt="bookmark"
      />
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <div class="meta-row">
        <div class="imdb-rating">
          <img class="action-icon" src="@/assets/filled_star.svg" width="24" height="24" />
          <span class="score">{{ rating }}</span>
        </div>
        <div class="imdb-rating">
          <img class="action-icon" src="@/assets/star.svg" width="24" height="24" />
          <span class="rate">Rate</span>
        </div>
        <div class="info-btn">
          <img src="@/assets/info.svg" width="20" height="20" />
        </div>
      </div>
      <button class="trailer-btn" v-if="hasPlayButton">
        <img src="@/assets/play.svg" width="24" height="24" />
        <span>Trailer</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  width: 220px;
  background-color: rgba(163, 163, 163, 0.05);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 12px;
}

.poster-wrapper {
  position: relative;
  width: 100%;
  padding-top: 150%;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 5px;
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.bookmark-icon {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 2;
}

.movie-title {
  margin: 1rem 0;
  font-size: 1rem;
  color: #c3c3c3;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #bdbdbd;
  font-size: 0.875rem;
}

.imdb-rating {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 9px 7px;
}

.imdb-rating .action-icon {
  display: block;
}

.score {
  color: #c3c3c3;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
}

.muted {
  color: #777;
}

.rate-btn {
  background: none;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
}

.trailer-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 18px;
  background-color: rgba(163, 163, 163, 0.06);
  color: #cfcfcf;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  font-family: 'Roboto';
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
</style>
