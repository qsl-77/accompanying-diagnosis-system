const state = {
    // 菜单栏的展开和收起
    isCollapse: false,
    selectMenu: []
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
    }
}

export default {
    state,
    mutations
}