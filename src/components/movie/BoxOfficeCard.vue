<script setup>
import { computed } from 'vue'

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
    </div>
    <img src="@/assets/bookmark_btn.svg" width="32" height="42" alt="add" />
    <div class="movie-info">
      <h3 class="movie-title">
        <a href="#" class="movie-link">{{ movie.title }}</a>
      </h3>
      <div class="box-office-row">
        <span class="box-office">{{ formatBoxOffice }}</span>
        <span class="dot">·</span>
        <span class="total-box-office">Total {{ formatBoxOffice }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-office-card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

.rank-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 16px 0 0;
}

.rank-number {
  color: #c3c3c3;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1;
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #1f1f1f 0%, #101010 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  padding: 0;
}

.movie-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0 0 0 12px;
}

.movie-title {
  margin: 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.box-office {
  color: #ffffffb3;
  font-size: 14px;
  font-weight: 400;
}

.box-office-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #797979;
  font-size: 0.9rem;
}

.dot {
  margin: 0 2px;
}

.total-box-office {
  color: #ffffffb3;
  font-size: 14px;
  font-weight: 400;
}

.movie-link {
  color: #5799ef;
  text-decoration: none;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'Roboto';
  line-height: 24px;
}

.movie-info .movie-title,
.movie-info .box-office-row {
  transition: filter 0.2s ease, opacity 0.2s ease;
}

.movie-info:hover .movie-title,
.movie-info:hover .box-office-row {
  filter: blur(0.4px);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .box-office-card {
    padding: 8px 0;
  }
}
</style>
