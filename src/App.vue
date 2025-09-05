<script setup>
import UserNavbar from './组件-通用/用户导航栏.vue'
import WebNavBar from './组件-通用/网站导航栏.vue'
import Marketing from './组件-页面/营销页.vue'
import Thisgood from './组件-页面/推荐.vue'
import ThisAllgood from './组件-通用/推荐流.vue'
</script>
<template>
    <div class="导航栏相关">
        <UserNavbar />
        <WebNavBar />
    </div>
    <div class="页面相关">
        <Marketing />
        <Thisgood />
        <ThisAllgood />
    </div>
</template>

<style scoped>
@import "./style.css";
</style>
