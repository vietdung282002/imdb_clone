const API_KEY = import.meta.env.VITE_API_KEY || 'a78465ca31af77ddc48dc5e525d629ba'
const API_BASE_URL = 'https://api.themoviedb.org/3'

export const api = {
  async getPopularMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      return []
    }
  },

  async getNowPlayingMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching now playing movies:', error)
      return []
    }
  },

  async getUpcomingMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching upcoming movies:', error)
      return []
    }
  },

  async getTopRatedMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      return []
    }
  },

  async searchMovies(query) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
      )
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error searching movies:', error)
      return []
    }
  },

  async getMovieDetails(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching movie details:', error)
      return null
    }
  },
}

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
