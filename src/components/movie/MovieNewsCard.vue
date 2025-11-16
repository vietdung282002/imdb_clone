<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  if (!props.article.publishedAt) return ''
  const date = new Date(props.article.publishedAt)
  const day = date.getDate()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
})

const sourceName = computed(() => {
  return props.article.source?.name || 'Unknown'
})
</script>

<template>
  <div class="news-card">
    <div class="image-wrapper">
      <img
        :src="article.urlToImage || 'https://via.placeholder.com/140x210?text=No+Image'"
        :alt="article.title"
        class="news-image"
      />
    </div>
    <div class="news-content">
      <h3 class="news-title">{{ article.title }}</h3>
      <div class="news-meta">
        <span class="news-date">{{ formattedDate }}</span>
        <span class="meta-separator">•</span>
        <span class="news-username">username</span>
      </div>
      <div class="news-source">{{ sourceName }}</div>
    </div>
  </div>
</template>

<style scoped>
.news-card {
  display: flex;
  gap: 16px;
  width: 465px;
  flex-shrink: 0;
  cursor: pointer;
  padding: 12px;
  background-color: rgba(163, 163, 163, 0.05);
  border-radius: 10px;
  transition: all 0.2s;
}

.news-card:hover {
  transform: translateY(-2px);
  background-color: rgba(163, 163, 163, 0.1);
}

.image-wrapper {
  position: relative;
  width: 140px;
  flex-shrink: 0;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 8px;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.news-title {
  margin: 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #919191;
  font-size: 0.875rem;
}

.meta-separator {
  color: #919191;
}

.news-date,
.news-username {
  color: #919191;
}

.news-source {
  color: #f5c518;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .news-card {
    width: 300px;
  }
}
</style>
