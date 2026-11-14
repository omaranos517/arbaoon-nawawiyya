import { createRouter, createWebHistory } from 'vue-router'

let homeScrollPosition = 0

const afterNextPaint = () =>
    new Promise((resolve) => {
        // RouterView uses an out-in transition (250 ms), so wait for the
        // incoming home view to mount before applying its saved position.
        window.setTimeout(() => {
            requestAnimationFrame(() => requestAnimationFrame(resolve))
        }, 300)
    })

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // Restore the previous position when navigating back/forward.
        if (savedPosition) return savedPosition

        // The native Android back button replaces the route, so it has no
        // browser history position to restore.
        if (to.name === 'home' && from.name === 'hadith') {
            return afterNextPaint().then(() => ({ top: homeScrollPosition }))
        }

        // Start each newly opened page at the top.
        return { top: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
            meta: { parent: 'home' },
        },
        {
            path: '/hadith/:id',
            name: 'hadith',
            component: () => import('../views/HadithView.vue'),
            meta: { parent: 'home' },
        },
        {
            path: '/empty',
            name: 'empty',
            component: () => import('../views/EmptyView.vue'),
        },
    ],
})

// Capture before the route transition starts. On Android, the outgoing view
// can change the WebView's scroll position before scrollBehavior runs.
router.beforeEach((to, from) => {
    if (from.name === 'home' && to.name === 'hadith') {
        homeScrollPosition = window.scrollY || document.documentElement.scrollTop
    }
})

export default router
