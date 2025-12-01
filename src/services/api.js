const API_KEY = import.meta.env.VITE_API_KEY || 'a78465ca31af77ddc48dc5e525d629ba'
const API_BASE_URL = 'https://api.themoviedb.org/3'

async function fetchAPI(endpoint, errorMessage, additionalParams = '') {
  try {
    const separator = endpoint.includes('?') ? '&' : '?'
    const url = `${API_BASE_URL}${endpoint}${separator}api_key=${API_KEY}${additionalParams}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(errorMessage, error)
    return []
  }
}

async function fetchDetailAPI(endpoint, errorMessage) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}?api_key=${API_KEY}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(errorMessage, error)
    return null
  }
}

export const api = {
  async getPopularMovies() {
    return fetchAPI('/movie/popular', 'Error fetching popular movies:')
  },

  async getNowPlayingMovies() {
    return fetchAPI('/movie/now_playing', 'Error fetching now playing movies:')
  },

  async getUpcomingMovies() {
    return fetchAPI('/movie/upcoming', 'Error fetching upcoming movies:')
  },

  async getTopRatedMovies() {
    return fetchAPI('/movie/top_rated', 'Error fetching top rated movies:')
  },

  async searchMovies(query) {
    return fetchAPI(
      '/search/movie',
      'Error searching movies:',
      `&query=${encodeURIComponent(query)}`,
    )
  },

  async getMovieDetails(movieId) {
    return fetchDetailAPI(`/movie/${movieId}`, 'Error fetching movie details:')
  },

  async searchTV(query) {
    return fetchAPI(
      '/search/tv',
      'Error searching TV shows:',
      `&query=${encodeURIComponent(query)}`,
    )
  },

  async searchPeople(query) {
    return fetchAPI(
      '/search/person',
      'Error searching people:',
      `&query=${encodeURIComponent(query)}`,
    )
  },

  async getPopularPeople() {
    return fetchAPI('/person/popular', 'Error fetching popular people:')
  },

  async getPersonDetails(personId) {
    return fetchDetailAPI(`/person/${personId}`, 'Error fetching person details:')
  },

  async getMoviesByProvider(providerId, page = 1) {
    return fetchAPI(
      '/discover/movie',
      `Error fetching movies for provider ${providerId}:`,
      `&with_watch_providers=${providerId}&page=${page}`,
    )
  },

  async getGenres() {
    const data = await fetchDetailAPI('/genre/movie/list', 'Error fetching genres:')
    return data?.genres || []
  },

  async getMoviesByGenre(genreId, page = 1) {
    return fetchAPI(
      '/discover/movie',
      `Error fetching movies for genre ${genreId}:`,
      `&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`,
    )
  },
}

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
