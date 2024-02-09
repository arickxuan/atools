<script setup>
import {onEventShowMenu} from "tauri-plugin-context-menu";

onEventShowMenu("contextmenu", (e) => ({ /* menuOptions */ }));
</script>

<template>
<h1>右键菜单</h1>
</template>
<script>
export default {
  name: "BookList",
}
</script>
<style scoped>

</style>