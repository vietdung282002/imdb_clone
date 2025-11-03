<script setup>
import { ref, onMounted } from 'vue'
import MovieSection from '@/components/MovieSection.vue'
import { api } from '@/services/api'

const popularMovies = ref([])
const nowPlayingMovies = ref([])
const upcomingMovies = ref([])
const topRatedMovies = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [popular, nowPlaying, upcoming, topRated] = await Promise.all([
      api.getPopularMovies(),
      api.getNowPlayingMovies(),
      api.getUpcomingMovies(),
      api.getTopRatedMovies(),
    ])

    popularMovies.value = popular
    nowPlayingMovies.value = nowPlaying
    upcomingMovies.value = upcoming
    topRatedMovies.value = topRated
  } catch (error) {
    console.error('Error loading movies:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="home">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">Chào mừng đến với IMDb Clone</h1>
        <p class="hero-subtitle">Khám phá những bộ phim hay nhất</p>
      </div>
    </div>

    <MovieSection title="Phổ biến" :movies="popularMovies" />
    <MovieSection title="Đang chiếu" :movies="nowPlayingMovies" />
    <MovieSection title="Sắp chiếu" :movies="upcomingMovies" />
    <MovieSection title="Xếp hạng cao" :movies="topRatedMovies" />
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  padding: 4rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #fff;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #999;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
