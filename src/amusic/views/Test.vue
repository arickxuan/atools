<template>
    <div>
        <button type="button" @click="createWin">creat win</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// import { createWindow } from '@tauri-apps/api/window'
import { getWebWindow } from '../../window/handle';
function createWin() {
    let win = getWebWindow('paste',{url:'paste.html'})
    win.show()
    win.setFocus()
    // let win2 = getWebWindow('aria2','aria2.html')
    // win2.show()
}
</script>

<style scoped>

</style>