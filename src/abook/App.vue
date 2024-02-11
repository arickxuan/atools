<script setup>
import {onMounted, ref} from "vue";

const screenHeight = ref(500);

window.addEventListener("resize", function (event) {
  // 窗口大小改变时触发的代码
  // console.log_init("窗口大小已改变！", event);
  screenHeight.value = window.innerHeight;
});

onMounted(() => {
  screenHeight.value = window.innerHeight;
});
</script>
<script>
export default {
  name: "App", //组件名
};
</script>

<template>
  <div class="main-content">
    <!-- 主要显示区域 -->
    <RouterView />
  </div>
  <div class="bottom-nav">
    <!-- 底部导航 -->
    <RouterLink to="/">主页</RouterLink>
     |
    <RouterLink to="/movies">movies</RouterLink>
    |
    <RouterLink to="/book">book</RouterLink>
    |
    <RouterLink to="/found">发现</RouterLink>
    |
    <RouterLink to="/search">搜索</RouterLink>
    |
    <RouterLink to="/my">我的</RouterLink>
  </div>
</template>

<style scoped>
.main-content {
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 80vh; /* 最小高度为80%视口高度 */
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #81a6a7;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}
</style>