<script setup>
import { ref, onMounted, computed } from 'vue'
import PersonCard from './PersonCard.vue'
import NavButton from '@/components/common/NavButton.vue'
import { getImageUrl } from '@/services/api'

const props = defineProps({
    people: {
        type: Array,
        default: () => [],
    },
})

const scrollerRef = ref(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const isHovered = ref(false)

const displayPeople = computed(() => {
    if (props.people && props.people.length > 0) {
        return props.people.map((person, index) => ({
            ...person,
            rank: person.rank || index + 1,
            rankChange: person.rankChange || (index < 2 ? Math.floor(Math.random() * 10000) : Math.floor(Math.random() * 20) - 10),
        }))
    }
    return []
})

const topRising = computed(() => displayPeople.value.slice(0, 2))
const byRanking = computed(() => displayPeople.value.slice(2))

function updateArrowState() {
    const el = scrollerRef.value
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    const epsilon = 2
    canScrollPrev.value = scrollLeft > epsilon
    canScrollNext.value = scrollLeft < maxScroll - epsilon
}

function scrollPage(direction = 1) {
    if (!scrollerRef.value) return
    const viewport = scrollerRef.value.getBoundingClientRect().width
    const itemW = 180 + 16
    const itemsPerPage = Math.max(1, Math.floor(viewport / itemW))
    const distance = direction * itemsPerPage * itemW
    scrollerRef.value.scrollLeft += distance
    updateArrowState()
}

const scrollPrev = () => scrollPage(-1)
const scrollNext = () => scrollPage(1)

function handleViewportChange() {
    updateArrowState()
}

onMounted(() => {
    updateArrowState()
    scrollerRef.value?.addEventListener('scroll', handleViewportChange, { passive: true })
    window.addEventListener('resize', handleViewportChange)
})
</script>

<template>
    <div class="popular-celebrities-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    Most popular celebrities
                    <svg width="16" height="24" xmlns="http://www.w3.org/2000/svg"
                        class="ipc-icon--chevron-right-inline" viewBox="0 0 24 24" fill="currentColor"
                        role="presentation">
                        <path
                            d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                        </path>
                    </svg>
                </h2>
            </div>

            <div class="celebrities-row" v-if="displayPeople.length > 0">
                <div class="celebrities-row-wrapper" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                    <NavButton v-if="canScrollPrev && isHovered" direction="prev" offset="0px" @click="scrollPrev"
                        class="row-nav-btn row-nav-btn-prev" />
                    <div ref="scrollerRef" class="row-scroller">
                        <div class="row-track">
                            <div class="row-track-item">
                                <div class="subtitle-label subtitle-top-rising" v-if="topRising.length > 0">
                                    TOP RISING
                                </div>
                                <div class="row-track-items">
                                    <PersonCard v-for="person in topRising" :key="person.id" :person="person" />
                                </div>
                            </div>
                            <div class="row-track-item">
                                <div class="subtitle-label subtitle-by-ranking" v-if="byRanking.length > 0">
                                    BY RANKING
                                </div>
                                <div class="row-track-items">
                                    <PersonCard v-for="person in byRanking" :key="person.id" :person="person" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <NavButton v-if="canScrollNext" direction="next" offset="0px" @click="scrollNext"
                        class="row-nav-btn row-nav-btn-next" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popular-celebrities-section {
    position: relative;
    margin-top: 0;
}

.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
}

.section-header {
    margin-bottom: 1rem;
}

.section-title {
    color: #fff;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
}

.section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 1.2em;
    background-color: #f5c518;
    margin-right: 8px;
    flex-shrink: 0;
    border-radius: 4px;
}

.section-title:hover .ipc-icon--chevron-right-inline {
    fill: #f5c518;
}

.ipc-icon--chevron-right-inline {
    transition: fill 0.2s ease;
}

.celebrities-row {
    overflow: hidden;
    position: relative;
}

.celebrities-row-wrapper {
    position: relative;
}

.row-scroller {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    scroll-behavior: auto;
    scroll-snap-type: x mandatory;
}

.row-scroller::-webkit-scrollbar {
    display: none;
}

.row-track {
    display: flex;
    gap: 1rem;
    padding-bottom: 2px;
    align-items: flex-start;
}

.row-track>* {
    flex: 0 0 auto;
    scroll-snap-align: start;
}

.row-track-items {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
}

.subtitle-label {
    color: #f5c518;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    padding: 0 0 12px;
}

.subtitle-top-rising {
    padding-left: 0;
}

.subtitle-by-ranking {
    padding-left: 0;
}

.row-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}

.row-nav-btn-prev {
    left: 0;
}

.row-nav-btn-next {
    right: 0;
}
</style>
