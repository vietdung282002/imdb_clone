<script setup>
import { onMounted } from 'vue'
import ContentSection from '@/components/ContentSection.vue'
import { useMovieStore } from '@/stores/movie'
import { usePeopleStore } from '@/stores/people'
import HeroFeatured from '@/components/HeroFeatured.vue'
import PersonCard from '@/components/PersonCard.vue'

const movieStore = useMovieStore()
const peopleStore = usePeopleStore()

onMounted(() => {
  movieStore.fetchAll()
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
    <ContentSection
      title="IMDb Originals"
      subtitle="Celebrity interviews, trending entertainment stories, and expert analysis"
      :content="movieStore.upcoming"
      watermarkText="Videos"
    />
    <ContentSection title="Born Today" :content="peopleStore.popular" subtitle="People born today">
      <template #card="{ movie }">
        <PersonCard :person="movie" />
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
