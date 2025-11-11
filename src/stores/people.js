import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const usePeopleStore = defineStore('people', {
  state: () => ({
    popular: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPopular() {
      this.loading = true
      this.error = null
      try {
        const people = await api.getPopularPeople()
        // Fetch details for first 20 people to get birthday
        const peopleWithDetails = await Promise.all(
          people.slice(0, 20).map(async (person) => {
            const details = await api.getPersonDetails(person.id)
            return { ...person, ...details }
          }),
        )
        this.popular = [...peopleWithDetails, ...people.slice(20)]
      } catch (e) {
        this.error = e?.message || 'Failed to fetch popular people'
      } finally {
        this.loading = false
      }
    },
  },
})
