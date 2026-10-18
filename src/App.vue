<script setup>
import { RouterView } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
    <Analytics />
    <SpeedInsights />
    <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.Transition || 'slide'" mode="out-in">
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>

<style scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.25s ease, opacity 0.25s ease;
    }

    .slide-enter-from {
        opacity: 0;
        transform: translateX(20px);
    }

    .slide-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }

    /* تأثير الـ Fade (احتياطي لو أردته) */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
