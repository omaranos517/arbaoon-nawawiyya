<script setup>
import hadiths from '../data/hadiths.js'
import HadithCard from '../components/HadithCard.vue'
import Header from '../components/Header.vue'

const vInView = {
    mounted(el, binding) {
        const className = binding.value?.class ?? 'in-view'
        const once = binding.value?.once ?? true

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(className)
                    if (once) observer.unobserve(el)
                } else if (!once) {
                    el.classList.remove(className)
                }
            },
            { threshold: 0.15 },
        )

        observer.observe(el)
        el._inViewObserver = observer
    },
    unmounted(el) {
        el._inViewObserver?.disconnect()
    },
}
</script>
<template>
    <div>
        <Header />
        <main dir="rtl">
            <div class="hero">
                <h2 id="hero-title">الأربعون النووية</h2>
                <p>نصّ كل حديث وشرحه وترجمة راويه في تصميم مريح للقراءة.</p>
            </div>
            <div class="grid">
                <div
                    v-for="hadith in hadiths"
                    :key="hadith.id"
                    class="reveal"
                    v-in-view="{ class: 'visible', once: false }"
                >
                    <HadithCard :id="hadith.id" :num="hadith.num" :title="hadith.title" />
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.hero {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.hero h2 {
    /* margin: 0; */
    margin-top: 30px;
    font-size: 2rem;
    font-weight: 700;
    background-image: linear-gradient(to top, var(--primary), var(--success), var(--warning));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero p {
    padding: 0 20px;
    font-size: 1.5rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
}

.reveal {
    opacity: 0;
    /* filter: blur(2px); */
    transform: translateX(-15px);
    transition:
        opacity 0.35s ease,
        filter 0.35s ease,
        transform 0.35s ease;
}

.reveal.visible {
    opacity: 1;
    /* filter: blur(0); */
    transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        opacity: 1;
        filter: none;
        transform: none;
        transition: none;
    }
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 560px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
