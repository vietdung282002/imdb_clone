import { defineStore } from 'pinia'
import { api, newsApi } from '@/services/api'

function createFetchAction(apiMethod, stateKey, errorMessage) {
  return async function () {
    this.loading = true
    this.error = null
    try {
      this[stateKey] = await apiMethod()
    } catch (e) {
      this.error = e?.message || errorMessage
    } finally {
      this.loading = false
    }
  }
}

export const useMovieStore = defineStore('movie', {
  state: () => ({
    popular: [],
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    boxOffice: [],
    news: [],
    streaming: {
      prime: [],
      disney: [],
      hulu: [],
      netflix: [],
      hbo: [],
    },
    loading: false,
    error: null,
  }),
  actions: {
    fetchPopular: createFetchAction(
      api.getPopularMovies,
      'popular',
      'Failed to fetch popular movies',
    ),
    fetchNowPlaying: createFetchAction(
      api.getNowPlayingMovies,
      'nowPlaying',
      'Failed to fetch now playing movies',
    ),
    fetchUpcoming: createFetchAction(
      api.getUpcomingMovies,
      'upcoming',
      'Failed to fetch upcoming movies',
    ),
    fetchTopRated: createFetchAction(
      api.getTopRatedMovies,
      'topRated',
      'Failed to fetch top rated movies',
    ),
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const [popular, now, up, top] = await Promise.all([
          api.getPopularMovies(),
          api.getNowPlayingMovies(),
          api.getUpcomingMovies(),
          api.getTopRatedMovies(),
        ])
        this.popular = popular
        this.nowPlaying = now
        this.upcoming = up
        this.topRated = top
      } catch (e) {
        this.error = e?.message || 'Failed to fetch movies'
      } finally {
        this.loading = false
      }
    },
    async fetchStreamingMovies() {
      this.loading = true
      this.error = null
      try {
        const [prime, disney, hulu, netflix, hbo] = await Promise.all([
          api.getMoviesByProvider(9),
          api.getMoviesByProvider(337),
          api.getMoviesByProvider(15),
          api.getMoviesByProvider(8),
          api.getMoviesByProvider(118),
        ])
        this.streaming.prime = prime
        this.streaming.disney = disney
        this.streaming.hulu = hulu
        this.streaming.netflix = netflix
        this.streaming.hbo = hbo
      } catch (e) {
        this.error = e?.message || 'Failed to fetch streaming movies'
      } finally {
        this.loading = false
      }
    },
    async fetchBoxOffice() {
      this.loading = true
      this.error = null
      try {
        const movies = await api.getNowPlayingMovies()
        const moviesWithRevenue = await Promise.all(
          movies.slice(0, 6).map(async (movie) => {
            const details = await api.getMovieDetails(movie.id)
            return { ...movie, revenue: details?.revenue || 0 }
          }),
        )
        console.log(moviesWithRevenue)
        this.boxOffice = moviesWithRevenue.sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
      } catch (e) {
        this.error = e?.message || 'Failed to fetch box office movies'
      } finally {
        this.loading = false
      }
    },
    async fetchMovieNews() {
      this.loading = true
      this.error = null
      try {
        const popularMovies = await api.getPopularMovies()
        const topMovies = popularMovies.slice(0, 3)
        const allNews = []
        for (const movie of topMovies) {
          const news = await newsApi.searchNews(movie.title, 5)
          allNews.push(...news.slice(0, 1))
        }
        this.news = allNews.slice(0, 10)
      } catch (e) {
        this.error = e?.message || 'Failed to fetch movie news'
      } finally {
        this.loading = false
      }
    },
  },
})
