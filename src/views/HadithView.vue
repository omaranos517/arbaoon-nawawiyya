<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import hadiths from '../data/hadiths.js'

import textIcon from '@/components/icons/textIcon.vue'
import explanationIcon from '@/components/icons/explanationIcon.vue'
import narratorIcon from '@/components/icons/personIcon.vue'
import soundIcon from '@/components/icons/soundIcon.vue'
import ArrowIcon from '@/components/icons/backArrowIcon.vue'
import OptionsIcon from '@/components/icons/optionsIcon.vue'
import ZoomInIcon from '@/components/icons/zoomInIcon.vue'
import ZoomOutIcon from '@/components/icons/zoomOutIcon.vue'
// import OptionsMenu from '@/components/menu.vue'
import OptionsMenu from '@/components/floutMenu.vue'


const route = useRoute()
const hadith = computed(() =>
    hadiths.find(h => h.id === Number(route.params.id))
)


// tabs =============================================
const tabs = [
    { key: 'text', label: 'نص الحديث', icon: textIcon },
    { key: 'explanation', label: 'الشرح', icon: explanationIcon },
    { key: 'narrator', label: 'الراوي', icon: narratorIcon },
    { key: 'sound', label: 'مسموع', icon: soundIcon },
]

const active = ref('text')

// المحتوى بيتحسب من التبويب النشط، والمفتاح هو نفس اسم الحقل في hadiths.js
const content = computed(() => hadith.value?.[active.value] ?? '')

const QUOTED = /("[^"]*"|“[^”]*”|«[^»]*»|\([^)]*\)|\{[^}]*\}|'[^']*')/
const segments = computed(() =>
    content.value
        .split(QUOTED)
        .map((text, i) => ({ text, quoted: i % 2 === 1 }))
        .filter(s => s.text)
)

// font size =============================================
const FONT_KEY = 'hadith:fontSize'
const FONT_MIN = 0.8
const FONT_MAX = 2.5
const FONT_STEP = 0.15
const FONT_DEFAULT = 1.4

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

function loadFontSize() {
    try {
        const v = parseFloat(localStorage.getItem(FONT_KEY))
        return Number.isFinite(v) ? clamp(v, FONT_MIN, FONT_MAX) : FONT_DEFAULT
    } catch {
        return FONT_DEFAULT
    }
}

const fontSize = ref(loadFontSize())

watch(fontSize, (v) => {
    try { localStorage.setItem(FONT_KEY, String(v)) } catch {}
})

const setFont = (v) => {
    fontSize.value = Math.round(clamp(v, FONT_MIN, FONT_MAX) * 100) / 100
}
const zoomIn  = () => setFont(fontSize.value + FONT_STEP)
const zoomOut = () => setFont(fontSize.value - FONT_STEP)


// Pop-up menu =============================================
const optionsBtn = ref(null)
const menuOpen = ref(false)

const menuItems = [
    { key: 'zoom-in', label: 'تكبير', icon: ZoomInIcon, action: zoomIn },
    { key: 'zoom-out', label: 'تصغير', icon: ZoomOutIcon, action: zoomOut },
]

const FAB_SIZE = 48
const menuPos = ref({ top: 0, left: 0 })

const openMenu = () => {
    const r = optionsBtn.value.getBoundingClientRect()
    const centerX = r.left + r.width / 2   // الدوائر تتوسّط تحت الزر
    menuPos.value = {
        top: r.bottom + 12,
        left: Math.min(Math.max(8, centerX - FAB_SIZE / 2), window.innerWidth - FAB_SIZE - 8),
    }
    menuOpen.value = true
}
const closeMenu = () => { menuOpen.value = false }


// =============================================
watch(() => route.params.id, () => { 
    // يرجع لـ "نص الحديث" لما تنتقل لحديث تاني
    active.value = 'text'
    // اقفل القايمة لما تنتقل لحديث تاني
    closeMenu()
})

const sentinel = ref(null)
const atBottom = ref(false)
let observer
const topSentinel = ref(null)
const scrolled = ref(false)
let topObserver

onMounted(() => {
    window.addEventListener('scroll', closeMenu, { passive: true })

    topObserver = new IntersectionObserver(
        ([e]) => { scrolled.value = !e.isIntersecting }, { threshold: 0 })
    topObserver.observe(topSentinel.value)

    observer = new IntersectionObserver(
        ([e]) => { atBottom.value = e.isIntersecting }, { threshold: 0 })
    observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', closeMenu)
    topObserver?.disconnect()
    observer?.disconnect()
})
</script>

<template>
    <main>
        <div ref="topSentinel" class="sentinel"></div>
        <div v-if="hadith" dir="rtl">
                <div class="head" :class="{ compact: scrolled }">
                    <div class="head-row">
                        <button ref="optionsBtn" class="options-btn" aria-label="الخيارات"
                                aria-haspopup="menu" :aria-expanded="menuOpen"
                                @click="menuOpen ? closeMenu() : openMenu()">
                            <OptionsIcon />
                        </button>
                        <RouterLink to="/" class="home-btn" aria-label="العودة للرئيسية">
                            <ArrowIcon />
                        </RouterLink>
                        <h2>{{ hadith.num }}</h2>
                    </div>
                    <p>{{ hadith.title }}</p>
                </div>
            <div class="tabs" role="tablist">
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    role="tab"
                    :aria-selected="active === tab.key"
                    :class="['tab', { active: active === tab.key }]"
                    @click="active = tab.key"
                >
                    <component :is="tab.icon" class="icon" aria-hidden="true" />
                    <span>{{ tab.label }}</span>
                </button>
            </div>

            <section class="panel" :class="active" :style="{ fontSize: `${fontSize}rem` }">
                <template v-if="segments.length > 0" v-for="(seg, i) in segments" :key="i" id="main-text"><span v-if="seg.quoted" class="quoted">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template>
                <template v-else>
                    <h3 style="text-align: center;">لا يوجد محتوى</h3>
                    <p>قد يكون هذا الجزء تحت التطوير</p>
                </template>
            </section>
        </div>
        <p v-else class="not-found">الحديث غير موجود</p>
        <div v-if="hadith" class="navication-buttons" :class="{ expanded: atBottom }" dir="rtl">
            <RouterLink v-if="hadith.id > 1" :to="`/hadith/${hadith.id - 1}`" class="navicate">
                <span class="arrow" aria-hidden="true">→</span>
                <span class="label">الحديث السابق</span>
            </RouterLink>
            <span v-else class="navicate disabled">
                <span class="arrow" aria-hidden="true">→</span>
                <span class="label">الحديث السابق</span>
            </span>

            <RouterLink v-if="hadith.id < hadiths.length" :to="`/hadith/${hadith.id + 1}`" class="navicate">
                <span class="label">الحديث التالي</span>
                <span class="arrow" aria-hidden="true">←</span>
            </RouterLink>
            <span v-else class="navicate disabled">
                <span class="label">الحديث التالي</span>
                <span class="arrow" aria-hidden="true">←</span>
            </span>
        </div>
        <div ref="sentinel" class="sentinel"></div>
        <OptionsMenu :open="menuOpen" :pos="menuPos" :items="menuItems"
                @select="item => item.action()" @close="closeMenu" />
    </main>
</template>

<style scoped>
    .head {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.75rem 0;
        background: var(--background);
        transition: padding 0.4s ease;
    }

    .head-row {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: 3.5rem;
        gap: 0.5rem;
        width: 100%;
    }

    .home-btn,
    .options-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: grid;
        place-items: center;
        width: 3.7rem;
        height: 3.7rem;
        flex-shrink: 0;
        padding: 0;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 16%, transparent);
        -webkit-backdrop-filter: blur(14px) saturate(140%);
        backdrop-filter: blur(14px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        text-decoration: none;
        cursor: pointer;
        transition: width 0.4s ease, height 0.4s ease, background-color 0.2s ease;
    }

    .home-btn { inset-inline-start: 0; }
    .options-btn { inset-inline-end: 0; }

    @media(hover: hover) {
        .home-btn:hover,
        .options-btn:hover {
            background: var(--surface-elevated);
        }
    }
    .head h2 {
        margin: 0;
        padding: 0.35rem 1.25rem;
        font-size: clamp(1.6rem, 7vw, 2.3rem);
        white-space: nowrap;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 16%, transparent);
        -webkit-backdrop-filter: blur(14px) saturate(140%);
        backdrop-filter: blur(14px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        transition: font-size 0.4s ease, padding 0.4s ease;
    }

    .head p {
        margin: 0.5rem 0 0;
        font-size: clamp(1.6rem, 4.5vw, 2.1rem);
        overflow: hidden;
        max-height: 6em;
        text-align: center;
        transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.4s ease;
    }

    .head.compact .home-btn,
    .head.compact .options-btn {
        width: 3rem;
        height: 3rem;
    }

    .head.compact h2 {
        font-size: 1.50rem;
        padding: 0.25rem 1rem;
    }

    .head.compact p {
        opacity: 0;
    }

    .tabs {
        display: flex;
        gap: 0.25rem;
        padding: 0.4rem;
        background: var(--card);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        margin-bottom: 1.5rem;
    }

    .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        flex: 1;
        padding: 0.75rem 1rem;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #8b949e;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .tab .icon {
        display: block;
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
        color: var(--primary);
    }

    .tab:hover:not(.active) {
        color: var(--text-primary);
        background: var(--surface-elevated);
    }

    .tab.active {
        background: var(--primary);
        color: #12181c;
    }

    .tab.active .icon {
        color: #311d00;
    }

    .panel {
        background: var(--card);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-inline-start: 4px solid var(--warning);
        border-radius: 12px;
        padding: 1.5rem;
        font-size: 1.4rem;
        line-height: 2.2;
        white-space: pre-line;
    }

    /* الشرح والراوي نص طويل، فخط أصغر */
    .panel.explanation,
    .panel.narrator {
        font-size: 1.1rem;
        line-height: 2;
    }

    .quoted {
        font-weight: 800;
        color: var(--primary);
    }

    .navication-buttons {
        position: sticky;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 4.5rem;
        gap: 1rem;
        margin-top: auto;
        padding: 0.75rem 0;
        width: 100%;
        background: var(--background);
    }
    
    .navicate {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        padding: 0.75rem 1.25rem;
        background: var(--surface-elevated);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        font-size: 1.05rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition:
            padding 0.4s ease,
            gap 0.4s ease,
            background-color 0.2s ease,
            color 0.2s ease;
    }

    .navicate.disabled {
        color: var(--text-secondary);
        cursor: not-allowed;
    }

    .label {
        display: inline-block;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: max-width 0.4s ease, opacity 0.3s ease;
    }

    .navication-buttons.expanded .navicate {
        background: var(--card);
        border-radius: 10px;
    }

    .navication-buttons.expanded .label {
        max-width: 10rem;
        opacity: 1;
    }

    .sentinel {
        height: 1px;
    }
    
    @media (max-width: 600px) {
        .tab span {
            display: none;
        }
    }
</style>