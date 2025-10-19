import { createStore } from "vuex";
import menu from './menu'
// 防止原来的vuex一刷新页面就初始化数据，即引入插件使数据长久存在
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
    plugins: [new createPersistedstate({
        key:'pz_v3pz'
    })],
    modules: {
        menu
    }
})