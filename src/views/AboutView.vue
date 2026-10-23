<!-- This page is vibe-coded and need to be rewroten -->
<script setup>
import Header from '../components/Header.vue'

const projectRepositoryUrl = 'https://github.com/omaranos517/REPOSITORY-NAME'
</script>

<template>
    <Header />
    <main class="about-page" dir="rtl">
        <section class="about-card">
            <p class="eyebrow">نبذة عني</p>
            <h1>أنا عمر عنوس</h1>
            <p class="description">
                مبرمج ومطوّر ويب من الإسكندرية، مصر. أعمل بـ HTML وCSS وJavaScript وPHP وPython،
                وأتعلّم Laravel. أهتم أيضاً بتطوير الألعاب والتكنولوجيا والطاقة المتجددة.
            </p>
            <div class="links" aria-label="روابط التواصل">
                <a href="mailto:omaranos517@gmail.com"
                    >راسلني عبر البريد <span aria-hidden="true">↗</span></a
                >
                <a href="https://wa.me/201277633481" target="_blank" rel="noreferrer">
                    تواصل عبر واتساب <span aria-hidden="true">↗</span>
                </a>
                <a href="https://github.com/omaranos517" target="_blank" rel="noreferrer">
                    حسابي على GitHub <span aria-hidden="true">↗</span>
                </a>
            </div>
        </section>

        <section class="about-card app-card">
            <p class="eyebrow">عن التطبيق</p>
            <h2>الأربعون النووية</h2>
            <p class="description">
                تطبيق يجمع أحاديث الأربعين النووية، ويتيح قراءة نص الحديث وشرحه والتعرّف على راويه،
                بواجهة عربية مريحة وسهلة الاستخدام.
            </p>
            <a
                class="repository-link"
                :href="projectRepositoryUrl"
                target="_blank"
                rel="noreferrer"
            >
                مستودع المشروع <span aria-hidden="true">↗</span>
                <small>استبدل REPOSITORY-NAME باسم المستودع عند رفع المشروع</small>
            </a>
        </section>
    </main>
</template>

<style scoped>
.about-page {
    display: grid;
    gap: 1rem;
    max-width: 760px;
    padding: 2.5rem 1.25rem;
}

.about-card {
    padding: clamp(1.5rem, 5vw, 2.25rem);
    border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
    border-radius: 18px;
    background:
        radial-gradient(
            circle at 100% 0%,
            color-mix(in srgb, var(--primary) 9%, transparent),
            transparent 45%
        ),
        var(--surface);
}

.eyebrow {
    margin: 0 0 0.3rem;
    color: var(--primary);
    font-size: 0.95rem;
}

h1,
h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.8rem;
}

.description {
    max-width: 650px;
    margin: 0.6rem 0 0;
    color: var(--text-secondary);
    font-size: 1.08rem;
    line-height: 1.9;
}

.links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.25rem;
}

.links a,
.repository-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.8rem;
    border: 1px solid color-mix(in srgb, var(--primary) 24%, transparent);
    border-radius: 9px;
    color: var(--text-primary);
    font-size: 0.92rem;
    transition:
        border-color 180ms ease,
        background-color 180ms ease;
}

.links a:hover,
.repository-link:hover {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.links a span,
.repository-link > span {
    color: var(--primary);
}

.repository-link {
    display: inline-grid;
    gap: 0.2rem;
    margin-top: 1rem;
    font-weight: 700;
}

.repository-link small {
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 400;
}

@media (max-width: 600px) {
    .about-page {
        padding: 1.25rem 1rem;
    }
}
</style>
