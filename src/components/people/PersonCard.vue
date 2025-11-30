<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

const profileUrl = computed(() => getImageUrl(props.person.profile_path))
const age = computed(() => {
  if (!props.person.birthday) return null
  const birthDate = new Date(props.person.birthday)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
})

const rank = computed(() => props.person.rank || null)
const rankChange = computed(() => props.person.rankChange || 0)
const isRankUp = computed(() => rankChange.value > 0)
const isRankDown = computed(() => rankChange.value < 0)
const rankChangeValue = computed(() => {
  if (rankChange.value === 0) return null
  return Math.abs(rankChange.value).toLocaleString()
})
</script>

<template>
  <div class="person-card">
    <div class="profile-wrapper">
      <img :src="profileUrl" :alt="person.name" class="profile-image" />
    </div>
    <div class="person-info">
      <div class="rank-info" v-if="rank !== null">
        <span class="rank-number">{{ rank }}</span>
        <span v-if="rankChangeValue" class="rank-change">
          (
          <svg v-if="isRankUp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="rank-icon rank-icon-up"
            viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M8.71 12.29L11.3 9.7a.996.996 0 0 1 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z">
            </path>
          </svg>
          <svg v-else-if="isRankDown" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            class="rank-icon rank-icon-down" viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z">
            </path>
          </svg>
          {{ rankChangeValue }})
        </span>
      </div>
      <h3 class="person-name">{{ person.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.person-card {
  width: 194px;
  cursor: pointer;
}

.profile-wrapper {
  position: relative;
  width: 194px;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 50%;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.person-info {
  text-align: start;
}

.rank-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 0;
  justify-content: center;
}

.rank-number {
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
}

.rank-change {
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
}

.rank-icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: -0.5em;
  margin-right: -0.5em;
}

.rank-icon-up {
  color: #46d369;
}

.rank-icon-down {
  color: #e50914;
}

.person-name {
  font-size: 1rem;
  color: #fff;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
