<template>
    <el-menu
        :style="{ width: '250px'}"
        default-active="2"
        class="aside-container"
        @open="handleOpen"
        @close="handleClose"
      >

      <p class="logo-lg">智能陪护</p>
      <TreeMenu :index="1" :menuData="menuData"/>
        
      </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter()
// console.log(router,'router')
const menuData = reactive(router.options.routes[0].children)

// 定义两个方法
const handleOpen = () => {
    
}
const handleClose = () => {
    
}
</script>

<style lang="less" scoped>
.aside-container{
    height: 100%;
    padding: 20px;
    .logo-lg {
      text-align: center;
      font-size: 20px;
      height:50px;
      line-height: 50px;
      color: rgb(87, 134, 87);
    }
}

</style>