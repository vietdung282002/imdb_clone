<script setup>
import { onMounted } from 'vue'
import MovieSection from '@/components/MovieSection.vue'
import { useMovieStore } from '@/stores/movie'
import HeroFeatured from '@/components/HeroFeatured.vue'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.fetchAll()
})
</script>

<template>
  <main class="home">
    <HeroFeatured :movies="movieStore.popular" />
    <MovieSection
      title="Top Picks"
      subtitle="TV shows and movies just for you"
      :movies="movieStore.popular"
    />
    <MovieSection title="Top on IMDb this week" :movies="movieStore.nowPlaying" />
    <MovieSection
      title="IMDb Originals"
      subtitle="Celebrity interviews, trending entertainment stories, and expert analysis"
      :movies="movieStore.upcoming"
    />
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 120px;
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
