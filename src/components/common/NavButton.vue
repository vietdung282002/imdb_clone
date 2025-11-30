<script setup>
const props = defineProps({
    direction: {
        type: String,
        required: true,
        validator: (value) => ['prev', 'next'].includes(value),
    },
    offset: {
        type: String,
        default: '8px',
    },
})

const emit = defineEmits(['click'])

function handleClick() {
    emit('click')
}
</script>

<template>
    <div :class="['nav-btn', `nav-btn-${direction}`]"
        :style="direction === 'prev' ? { left: props.offset } : { right: props.offset }" @click="handleClick"
        :aria-label="direction === 'prev' ? 'Previous' : 'Next'">
        <svg v-if="direction === 'prev'" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
            class="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" viewBox="0 0 24 24"
            fill="#fff" role="presentation">
            <path
                d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z" />
        </svg>
        <svg v-else width="24" height="24" xmlns="http://www.w3.org/2000/svg"
            class="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon" viewBox="0 0 24 24"
            fill="#fff" role="presentation">
            <path
                d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z" />
        </svg>
    </div>
</template>

<style scoped>
.nav-btn {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    z-index: 10;
    width: 50px;
    height: 66px;
    background: #12121273;
    border: 1px solid #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    padding: 20px 12px;
}

.nav-btn:hover svg {
    fill: rgb(245, 197, 24);
}


.nav-btn svg {
    transition: fill 0.2s ease;
}
</style>
