<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon" size="30"><Fold /></el-icon>
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

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.flex-box{
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
        }
        .icon:hover {
            background-color: #b6d9ce;
            cursor: pointer;
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