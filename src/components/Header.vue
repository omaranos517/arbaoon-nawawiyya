<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import InfoIcon from './icons/infoIcon.vue'

const route = useRoute()
const router = useRouter()
let isAboutPage = computed(() => route.name === 'about')
function handleAboutClick() {
    if (isAboutPage.value) {
        router.back()
    } else {
        router.push('/about')
    }
}
</script>
<template>
    <header>
        <div class="logo">
            <RouterLink to="/" class="logo-text"><h1>الأربعون النووية</h1></RouterLink>
        </div>
            <nav>
            <button class="about-link" @click="handleAboutClick" aria-label="عن التطبيق"><InfoIcon /></button>
            </nav>
    </header>
</template>
<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 60px;
        padding: 15px 5%;
        background-color: rgba(48, 36, 29, 0.75);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
        transition: var(--transition);
    }

    .logo {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
    }

    .logo-text {
        font-size: 1.5rem;
        font-weight: 800;
        text-decoration: none;

        background-image: linear-gradient(
            to top,
            var(--primary),
            var(--success),
            var(--warning)
        );
        background-size: 100% 200%;
        background-position: 0% 100%;

        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;

        transition: background-position 0.6s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .logo-text h1 {
        margin: 0;
        font-size: inherit;
        line-height: 1.2;
    }

    .logo::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 3px;
        background: linear-gradient(
            90deg,
            var(--primary),
            var(--success),
            var(--warning)
        );
        border-radius: 5px;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s ease;
    }

    @media (hover: hover) and (pointer: fine) {
        .logo:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }

        .logo-text:hover {
            background-position: 0% 0%;
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
        }
    }

    @media (hover: none) and (pointer: coarse) {
        .logo:active::after {
            transform: scaleX(1);
            transform-origin: left;
        }

        .logo-text:active {
            background-position: 0% 0%;
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
        }
    }

    .about-link {
        display: flex;
        color: white;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .about-link:hover {
        color: var(--primary);
    }
</style>