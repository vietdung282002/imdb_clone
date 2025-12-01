<script setup>
import { onMounted } from 'vue'
import ContentSection from '@/components/common/ContentSection.vue'
import { useMovieStore } from '@/stores/movie'
import { usePeopleStore } from '@/stores/people'
import HeroFeatured from '@/components/movie/HeroFeatured.vue'
import PopularCelebritiesSection from '@/components/people/PopularCelebritiesSection.vue'
import HorizontalMovieCard from '@/components/movie/HorizontalMovieCard.vue'
import StreamingSection from '@/components/common/StreamingSection.vue'
import BoxOfficeSection from '@/components/common/BoxOfficeSection.vue'
import GenreCard from '@/components/movie/GenreCard.vue'

const movieStore = useMovieStore()
const peopleStore = usePeopleStore()

onMounted(() => {
  movieStore.fetchAll()
  movieStore.fetchStreamingMovies()
  movieStore.fetchBoxOffice()
  movieStore.fetchGenres()
  peopleStore.fetchPopular()
})
</script>

<template>
  <main class="home">
    <HeroFeatured :movies="movieStore.popular" />
    <PopularCelebritiesSection :people="peopleStore.popular" />
    <ContentSection title="From your Watchlist" :showEmptyState="true" />
    <ContentSection title="Fan favorites" subtitle="This week's top TV and movies" :content="movieStore.popular" />
    <ContentSection title="Popular interests" :content="movieStore.genres">
      <template #card="{ movie: genre }">
        <GenreCard :genre="genre" />
      </template>
    </ContentSection>
    <BoxOfficeSection title="Top box office (US)" subtitle="Weekend of March 8-10" :content="movieStore.boxOffice" />
    <ContentSection title="IMDb Originals"
      subtitle="Celebrity interviews, trending entertainment stories, and expert analysis"
      :content="movieStore.topRated">
      <template #card="{ movie }">
        <HorizontalMovieCard :movie="movie" />
      </template>
    </ContentSection>
    <StreamingSection />
    <ContentSection subtitle="Trailers for Upcoming Releases" :content="movieStore.upcoming">
      <template #card="{ movie }">
        <HorizontalMovieCard :movie="movie" :showReleaseDate="true" />
      </template>
    </ContentSection>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 120px;
  background-color: #000;
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
