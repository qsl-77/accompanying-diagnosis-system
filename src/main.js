import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import stores from './stores'
import PanelHead from '@/components/panelHead.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 刷新后的动态路由添加
const localData = localStorage.getItem('pz_v3pz')
if (localData) {
    stores.commit('dynamicMenu', JSON.parse(localData).menu.routerList)
    stores.state.menu.routerList.forEach(item => {
        router.addRoute('main',item)
    })
}

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

app.component('PanelHead', PanelHead)

app.use(createPinia())
// 挂载router
app.use(router)

// 挂载stores
app.use(stores)

app.mount('#app')


