<template>
 <home-nav/>
 <home-main class="home-main"/>
 <layout-footer/>
</template>

<script setup>
import LayoutFooter from '@components/LayoutFooter.vue'
import HomeNav from './components/HomeNav.vue'
import HomeMain from './components/HomeMain.vue'
</script>

<style scoped lang="scss">
.home-main {
  padding: 50px 0;
  background-color: #f7f7f7;
}
</style>
