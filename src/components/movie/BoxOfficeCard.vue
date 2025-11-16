<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
})

const posterUrl = computed(() => getImageUrl(props.movie.poster_path))
const rating = computed(() => props.movie.vote_average?.toFixed(1) || 'N/A')

const formatBoxOffice = computed(() => {
  const revenue = props.movie.revenue || props.movie.box_office || 0
  if (revenue >= 1000000) {
    const millions = revenue / 1000000
    if (millions >= 10) {
      return `$${Math.round(millions)}M`
    }
    return `$${millions.toFixed(1)}M`
  }
  if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}K`
  }
  return `$${revenue}`
})
</script>

<template>
  <div class="box-office-card">
    <div class="rank-section">
      <span class="rank-number">{{ rank }}</span>
      <div class="rank-bar"></div>
    </div>
    <div class="poster-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <img
        class="bookmark-icon"
        src="@/assets/bookmark_btn.svg"
        width="32"
        height="40"
        alt="bookmark"
      />
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <div class="box-office">{{ formatBoxOffice }}</div>
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
          <img src="@/assets/info.svg" width="18" height="18" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-office-card {
  display: flex;
  gap: 20px;
  padding: 12px 40px 12px 12px;
  background-color: rgba(163, 163, 163, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.rank-section {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 10px;
  flex-shrink: 0;
}

.rank-number {
  color: #c3c3c3;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
}

.rank-bar {
  width: 3px;
  height: 40px;
  background-color: #f5c518;
  border-radius: 2px;
}

.poster-wrapper {
  position: relative;
  height: 194px;
  width: 126px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 5px;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.movie-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.movie-title {
  margin: 0;
  font-size: 1.125rem;
  color: #c3c3c3;
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.box-office {
  color: #797979;
  font-size: 1.25rem;
  font-weight: 500;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: #bdbdbd;
  font-size: 0.875rem;
}

.imdb-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0px;
}

.imdb-rating .action-icon {
  display: block;
}

.score {
  color: #c3c3c3;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1;
}

.rate {
  color: #bdbdbd;
  font-size: 1.125rem;
}

.info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
}

.bookmark-icon {
  position: absolute;
  top: 0px;
  left: 8px;
  z-index: 2;
}

@media (max-width: 768px) {
  .box-office-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .rank-section {
    flex-direction: row;
  }

  .rank-bar {
    width: 40px;
    height: 3px;
  }

  .poster-wrapper {
    width: 120px;
  }
}
</style>
