import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import stores from './stores'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 路由守卫的前置导航守卫：在进入路由前执行此回调函数
router.beforeEach((to,from) =>{
    const token = localStorage.getItem('pz_token')
    // 不是登录页面并且token不存在，跳回登录页面
    if (!token && to.path !== '/login') {
        return '/login'
    }
    // 是登陆页面并且存在token，跳回根目录
    else if (token && to.path === '/login') {
        return '/'
    } else {
        return true
    }
})

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


