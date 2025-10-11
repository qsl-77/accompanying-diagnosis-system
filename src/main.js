import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import stores from './stores'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局注册所有icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key,component)
}

app.use(createPinia())
// 挂载router
app.use(router)

// 挂载stores
app.use(stores)

app.mount('#app')


