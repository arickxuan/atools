<script setup></script>

<script>
import Person from "./components/Person.vue";
import Person2 from "./components/Person2.vue";
import Person3 from "./components/Person3.vue";

export default {
  name: "App", //组件名
  components: {
    Person, //注册组件
    Person2,
    Person3,
  },
};
</script>

<template>
  <div class="app">
    <!-- <Person3 /> -->
    <h1>about</h1>
    <RouterView />
  </div>
</template>

<style scoped></style>
