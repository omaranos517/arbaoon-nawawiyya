import { createRouter, createWebHistory } from 'vue-router'

let homeScrollPosition = 0

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // Restore the previous position when navigating back/forward.
        if (savedPosition) return savedPosition

        // The native Android back button replaces the route, so it has no
        // browser history position to restore. Keep the home list position
        // while a hadith is open and restore it when returning.
        if (from.name === 'home' && to.name === 'hadith') {
            homeScrollPosition = window.scrollY
        }
        if (to.name === 'home' && from.name === 'hadith') {
            return new Promise((resolve) => {
                window.setTimeout(() => resolve({ top: homeScrollPosition }), 260)
            })
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

export default router
