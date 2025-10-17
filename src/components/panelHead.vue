<template>
    <div class="panel-heading">
        <div class="panel-lead">
            <div class="title"></div>
            <p class="description">我是描述</p>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="less" scoped>
.panel-heading{
    padding:15px;
    background-clip: white;
    border-color: white;
    position: relative;
    .panel-lead{
        font-size: 14px;
        .title{
            font-weight: bold;
            font-style: normal;
        }
        .description{
            margin-top: 5px;
        }
    }
}
</style>
