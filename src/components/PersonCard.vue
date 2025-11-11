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
</script>

<template>
  <div class="person-card">
    <div class="profile-wrapper">
      <img :src="profileUrl" :alt="person.name" class="profile-image" />
    </div>
    <div class="person-info">
      <h3 class="person-name">{{ person.name }}</h3>
      <p class="person-age" v-if="age">{{ age }}</p>
    </div>
  </div>
</template>

<style scoped>
.person-card {
  width: 180px;
  cursor: pointer;
}

.profile-wrapper {
  position: relative;
  width: 180px;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.person-info {
  text-align: start;
}

.person-name {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: #c3c3c3;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.person-age {
  margin: 0;
  font-size: 0.75rem;
  color: #919191;
}
</style>
