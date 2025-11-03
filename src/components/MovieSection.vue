<script setup>
import MovieCard from './MovieCard.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="movie-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="movies-grid" v-if="movies.length > 0">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <div v-else class="loading">Đang tải...</div>
    </div>
  </section>
</template>

<style scoped>
.movie-section {
  margin-bottom: 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.loading {
  color: #999;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
