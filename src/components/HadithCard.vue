<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
    id: { type: Number, required: true },
    num: { type: String, required: true },
    title: { type: String, required: true },
})
</script>
<template>
    <RouterLink :to="`/hadith/${id}`" class="card">
        <span class="num">{{ id }}</span>
        <div class="text">
            <small>{{ num }}</small>
            <h2>{{ title }}</h2>
        </div>
    </RouterLink>
</template>
<style scoped>
    .card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem 1rem;
        background-color: var(--card);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        text-decoration: none;
        color: var(--text-primary);
        transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .card:hover {
        border-color: var(--elevated-surface);
        transform: translateY(-2px);
    }

    .num {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        background: var(--primary);
        color: #5e3901;
        font-size: 1.25rem;
        font-weight: 700;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 0;
    }

    small {
        font-size: 0.75rem;
        color: #8b949e;
    }

    h2 {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.5;
    }
</style>