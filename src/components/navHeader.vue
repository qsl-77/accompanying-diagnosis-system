<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon" size="25" @click="store.commit('collapseMenu')"><Fold /></el-icon>
            <ul class="flex-box">
                <li
                    v-for="(item,index) in selectMenu"
                    :key="item.path"
                    :class="{selected: route.path === item.path}"
                    class="tab flex-box"
                >
                    <el-icon size="20"><component :is="item.icon" /></el-icon>
                    <router-link class="text flex-box" :to="{ path:item.path }">
                        {{ item.name }}
                    </router-link>
                    <el-icon class="close" size="20"><Close /></el-icon>
                </li>
            </ul>
        </div>
        <div class="header-right">
        <el-dropdown>
            <div class="el-dropdown-link flex-box">
            <div>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <p class="user-name">admin</p>                
            </div>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
        </div>

    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const store = useStore()
// 拿到当前的route对象
const route = useRoute()

const selectMenu =computed(()=>store.state.menu.selectMenu)

</script>

<style lang="less" scoped>
.flex-box{
    height: 100%;
    display: flex;
    align-items: center;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: white;
    .header-left{
        height: 100%;
        .icon{
            height: 100%;
            width: 60px;
            color: rgb(87, 134, 87);
        }
        .icon:hover {
            background-color: #b6d9ce;
            cursor: pointer;
        }
        .tab {
            padding: 0 10px;
            height: 100%;
            color: rgb(87, 134, 87);
            .text {
                margin: 0 5px;
                color: rgb(87, 134, 87);

            }
            .close {
                visibility: hidden;
            }
            // 和tab同级
            &.selected {
                a {
                    color: rgb(239, 129, 129);
                }
                i {
                    color: rgb(239, 129, 129);
                }
                background-color: rgb(247, 223, 223);
            }
        }
        .tab:hover {
            color: rgb(87, 134, 87);
            background-color: #b6d9ce;
            .close {
                visibility: inherit;
                cursor: pointer;
            }

        }
        
    }
    .header-right {
        margin-right: 20px;
        .user-name {
            margin-left: 20px;
        }
    }
}

</style>