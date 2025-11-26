<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  hasPlayButton: {
    type: Boolean,
    default: true,
  },
})

const posterUrl = computed(() => getImageUrl(props.movie.poster_path))
const rating = computed(() => props.movie.vote_average?.toFixed(1) || 'N/A')
</script>

<template>
  <div class="movie-card">
    <div class="poster-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <img class="bookmark-icon" src="@/assets/bookmark_btn.svg" width="40" height="50" alt="bookmark" />

    </div>
    <div class="movie-info">
      <div class="meta-row">
        <div class="imdb-rating">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 24 24"
            fill="#f5c518" role="presentation">
            <path
              d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z">
            </path>
          </svg>
          <span class="score">{{ rating }}</span>
        </div>
        <button class="star-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="action-icon" viewBox="0 0 24 24"
            fill="rgb(87, 153, 239)" role="presentation">
            <path
              d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z">
            </path>
          </svg>
        </button>
      </div>
      <a href="#" class="movie-title">
        <span class="movie-title-text">
          {{ movie.title }}
        </span>
      </a>
      <div class="watch-list-btn-wrapper">
        <button class="watch-list-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="watch-list-icon" viewBox="0 0 24 24"
            fill="rgb(87, 153, 239)" role="presentation">
            <path
              d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
            </path>
          </svg>
          <span class="watch-list-text">Watchlist</span>
        </button>
        <div class="trailer-btn-wrapper" v-if="hasPlayButton">
          <a href="#" class="trailer-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              class="ipc-icon ipc-icon--play-arrow ipc-btn__icon ipc-btn__icon--pre" viewBox="0 0 24 24"
              fill="currentColor" role="presentation">
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z">
              </path>
            </svg>
            <span class="trailer-text">Trailer</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  width: 200px;
  background-color: rgb(26, 26, 26);
  border-top-left-radius: 0;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 16px;
}

.poster-wrapper {
  position: relative;
  width: 100%;
  padding-top: 150%;
  overflow: hidden;
  background-color: #2a2a2a;
  margin-bottom: 8px;
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bookmark-icon {
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 2;
}

.movie-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
  font-size: 1rem;
  color: rgb(255, 255, 255);
  font-weight: 400;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  text-decoration: none;
  padding: 0 8px;
  line-height: 1.25rem;
}

.movie-title:hover {
  text-decoration: underline;
}

.meta-row {
  display: flex;
  align-items: center;
  color: #bdbdbd;
  margin: 0 0 4px;
  padding: 0 8px;
}

.imdb-rating {
  display: inline-flex;
  align-items: center;
  margin-right: .5rem;
}

.action-icon {
  height: .8em;
  width: 1em;
  margin-right: .15em;
}

.score {
  color: #c3c3c3;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Roboto';
}

.star-button {
  background: none;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
  padding: 0 12px;
  height: 32px;
  width: 48px;
}

.star-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
}

.star-button:hover svg {
  fill: #fff;
}

.muted {
  color: #777;
}

.rate-btn {
  background: none;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
}

.trailer-btn {
  display: flex;
  align-items: center;
  min-height: 2.25rem;
  justify-content: center;
  width: auto;
  padding: 0 1rem;
  border: none;
  border-radius: 24px;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
}

.trailer-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.trailer-text {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
}

.trailer-btn-wrapper {
  display: flex;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.5rem 0px;
  margin-bottom: -1rem;
  justify-content: space-around;

}

.watch-list-btn-wrapper {
  padding: 12px 8px 0;
}

.watch-list-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.25rem;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  background-color: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 24px;
  box-shadow: none;
  cursor: pointer;
}

.watch-list-text {
  color: rgb(87, 153, 239);
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
}
</style>
