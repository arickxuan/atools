<template>
    <div>
        <button type="button" @click="createWin">creat win</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createWindow } from '@tauri-apps/api/window'
import { getWindow,getWebWindow } from '../window/handle';
function createWin() {
    let win = getWindow('paste')
    win.show()
    win.setFocus()
    // let win2 = getWebWindow('aria2','aria2.html')
    // win2.show()
}
</script>

<style scoped>

</style>