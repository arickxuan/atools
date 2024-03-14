<script setup>
import { doRegister } from "../shortcut/global.js"
import { ref, onMounted } from "vue";
// import Main from "./views/Main.vue";
// import Index from "./components/Index.vue";
// import SongList from "./components/SongList.vue";
// import Music from "./views/Music.vue";

onMounted(() => {

    //doRegister()
})

</script>

<template>
    <!-- <Main /> -->
    <!-- <Index /> -->
    <RouterView />
</template>

<style scoped>
</style>
