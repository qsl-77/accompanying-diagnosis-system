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
    },
    closeMenu(state, payload) {
        // 找到对应tag的索引就删除1个
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        state.selectMenu.splice(index,1)
    }
}

export default {
    state,
    mutations
}