const state = {
    // 菜单栏的展开和收起
    isCollapse: false,
    selectMenu: []
}

const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    } 
}

export default {
    state,
    mutations
}