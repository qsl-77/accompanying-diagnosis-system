<template>
    <el-menu
        :style="{ width: !isCollapse ? '250px' : '70px'}"
        class="aside-container"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-active="active"
      >

      <p class="logo-lg">{{!isCollapse ? '智能陪护' :'智陪'}}</p>
      <TreeMenu :index="1" :menuData="menuData"/>
        
      </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import { useRouter } from 'vue-router';
import { reactive,computed } from 'vue';
import { useStore } from 'vuex';


const router = useRouter()
// console.log(router,'router')
// const menuData = reactive(router.options.routes[0].children)

const store = useStore()
const menuData = computed(() => store.state.menu.routerList)

const isCollapse = computed(()=>store.state.menu.isCollapse)

const active =computed(()=>store.state.menu.menuActive)

// 定义两个方法
const handleOpen = () => {
    
}
const handleClose = () => {
    
}
</script>

<style lang="less" scoped>
.aside-container{
    height: 100%;
    .logo-lg {
      text-align: center;
      font-size: 20px;
      height:50px;
      line-height: 50px;
      color: rgb(87, 134, 87);
    }
}

</style>