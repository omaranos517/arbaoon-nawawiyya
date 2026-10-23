import './assets/main.css'

// Vue.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// capacitor
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { App as CapApp } from '@capacitor/app'

const app = createApp(App)

app.use(router)

app.mount('#app')

// FIXME: need to be fixed because it is not working on Android
const setupStatusBar = async () => {
    if (!Capacitor.isNativePlatform()) return
    try {
        await StatusBar.setStyle({ style: Style.Dark })
        await StatusBar.setOverlaysWebView({ overlay: true })
    } catch (e) {
        console.warn('StatusBar setup failed', e)
    }
}
setupStatusBar()

const setupBackButton = () => {
    if (!Capacitor.isNativePlatform()) return

    CapApp.addListener('backButton', () => {
        const parent = router.currentRoute.value.meta.parent

        if (parent) {
            router.replace({ name: parent })
        } else {
            CapApp.exitApp()
        }
    })
}
setupBackButton()
