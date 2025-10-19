const localData = localStorage.getItem('pz_v3pz')
// 拿到menu就设置，否则设置为初始数据
const state = localData ? localData.menu :{
    // 菜单栏的展开和收起
    isCollapse: false,
    selectMenu: [],
    routerList: [],
    // 菜单索引
    menuActive:'1-1'
}

const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload) {
        // 对数据进行去重
        if (state.selectMenu.findIndex(item => item.path == payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state, payload) {
        // 找到对应tag的索引就删除1个
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        state.selectMenu.splice(index,1)
    },
    dynamicMenu(state,payload) {
        // 通过globe导入文件(并匹配多个模块)
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules)
        // 拼接路径
        function routerSet(router) {
            router.forEach(route => {
                // 没有子菜单就拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    route.component = modules[url]
                } else {
                    // 有子菜单就递归拿到子菜单
                    routerSet(route.children)
                }
            });  
        }
        routerSet(payload)
        //拿到完整的路由数据
        state.routerList = payload
    },
    updateMenuActive(state, payload) {
        state.menuActive = payload
    }
}

export default {
    state,
    mutations
}