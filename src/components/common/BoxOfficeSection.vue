<script setup>
import { computed } from 'vue'
import BoxOfficeCard from '@/components/movie/BoxOfficeCard.vue'

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
})

const displayMovies = computed(() => {
  return props.content.slice(0, 6)
})
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
                <span class="title-arrow" aria-hidden="true">
                  <img src="@/assets/arrow.svg" width="28" height="28" />
                </span>
              </h2>
              <p class="section-subtitle" v-if="subtitle">
                {{ subtitle }}
              </p>
            </div>
          </div>
        </div>

        <div class="box-office-grid" v-if="displayMovies.length > 0">
          <BoxOfficeCard v-for="(movie, index) in displayMovies" :key="movie.id" :movie="movie" :rank="index + 1" />
        </div>
        <div v-else class="empty-state">
          <p>Không có dữ liệu box office</p>
        </div>
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
  margin-bottom: 1.5rem;
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
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #f5c518;
  margin-right: 8px;
  transform: translateY(-1px);
}

.title-arrow {
  display: inline-flex;
  margin-left: 6px;
  color: #919191;
}

.section-subtitle {
  margin: 0;
  margin-top: 2px;
  color: #919191;
  font-size: 0.875rem;
}

.box-office-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #919191;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .box-office-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .box-office-grid {
    grid-template-columns: 1fr;
  }
}
</style>
