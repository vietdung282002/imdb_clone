import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    popular: [],
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPopular() {
      this.loading = true
      this.error = null
      try {
        this.popular = await api.getPopularMovies()
      } catch (e) {
        this.error = e?.message || 'Failed to fetch popular movies'
      } finally {
        this.loading = false
      }
    },
    async fetchNowPlaying() {
      this.loading = true
      this.error = null
      try {
        this.nowPlaying = await api.getNowPlayingMovies()
      } catch (e) {
        this.error = e?.message || 'Failed to fetch now playing movies'
      } finally {
        this.loading = false
      }
    },
    async fetchUpcoming() {
      this.loading = true
      this.error = null
      try {
        this.upcoming = await api.getUpcomingMovies()
      } catch (e) {
        this.error = e?.message || 'Failed to fetch upcoming movies'
      } finally {
        this.loading = false
      }
    },
    async fetchTopRated() {
      this.loading = true
      this.error = null
      try {
        this.topRated = await api.getTopRatedMovies()
      } catch (e) {
        this.error = e?.message || 'Failed to fetch top rated movies'
      } finally {
        this.loading = false
      }
    },
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
  },
})
