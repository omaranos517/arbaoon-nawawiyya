<script setup>
import hadiths from '../data/hadiths.js'
import HadithCard from '../components/HadithCard.vue'
import Header from '../components/Header.vue'
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
                <HadithCard v-for="hadith in hadiths" :id="hadith.id" :num="hadith.num" :title="hadith.title" :key="hadith.id" />
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
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        background-image: linear-gradient(
            to top,
            var(--primary),
            var(--success),
            var(--warning)
        );
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

    @media (max-width: 900px) {
        .grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 560px) {
        .grid { grid-template-columns: 1fr; }
    }
</style>