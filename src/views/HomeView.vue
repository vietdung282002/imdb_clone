<script setup>
import { onMounted } from 'vue'
import ContentSection from '@/components/common/ContentSection.vue'
import { useMovieStore } from '@/stores/movie'
import { usePeopleStore } from '@/stores/people'
import HeroFeatured from '@/components/movie/HeroFeatured.vue'
import PersonCard from '@/components/people/PersonCard.vue'
import HorizontalMovieCard from '@/components/movie/HorizontalMovieCard.vue'
import StreamingSection from '@/components/common/StreamingSection.vue'
import BoxOfficeSection from '@/components/common/BoxOfficeSection.vue'
import MovieNewsCard from '@/components/movie/MovieNewsCard.vue'

const movieStore = useMovieStore()
const peopleStore = usePeopleStore()

onMounted(() => {
  movieStore.fetchAll()
  movieStore.fetchStreamingMovies()
  movieStore.fetchBoxOffice()
  movieStore.fetchMovieNews()
  peopleStore.fetchPopular()
})
</script>

<template>
  <main class="home">
    <HeroFeatured :movies="movieStore.popular" />
    <ContentSection
      title="Top Picks"
      subtitle="TV shows and movies just for you"
      :content="movieStore.popular"
      watermarkText="What to Watch"
    />
    <ContentSection title="Top on IMDb this week" :content="movieStore.nowPlaying" />
    <BoxOfficeSection
      title="Top box office (US)"
      subtitle="Weekend of March 8-10"
      :content="movieStore.boxOffice"
      watermarkText="Explore"
    />
    <ContentSection
      title="IMDb Originals"
      subtitle="Celebrity interviews, trending entertainment stories, and expert analysis"
      :content="movieStore.topRated"
      watermarkText="Videos"
    >
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
    <ContentSection title="Born Today" :content="peopleStore.popular" subtitle="People born today">
      <template #card="{ movie }">
        <PersonCard :person="movie" />
      </template>
    </ContentSection>
    <ContentSection title="Top News" :content="movieStore.news">
      <template #card="{ movie: article }">
        <MovieNewsCard :article="article" />
      </template>
    </ContentSection>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 120px;
  padding-bottom: 120px;
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
