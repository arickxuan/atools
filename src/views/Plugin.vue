<template>
    <div>
        <h2>Plugin</h2>
        <button @click="showAbout">win</button>
        <button @click="newWin2">win2</button>
        <button @click="doRelaunch">relaunch</button>
    </div>
</template>
<script setup>
import {createWin} from "@/router/actions";
import {WebviewWindow} from "@tauri-apps/api/window";
import {emit, listen} from "@tauri-apps/api/event";

// listen to the `click` event and get a function to remove the event listener
// there's also a `once` function that subscribes to an event and automatically unsubscribes the listener on the first event
const unlisten = listen("win-relaunch", async (event) => {
    console.log("relaunch", event.payload);
    // await relaunch();
});

async function doRelaunch() {
    // await relaunch();
    emit("win-relaunch", {
        theMessage: "Tauri is awesome!",
    });
}

function newWin2() {
    const webview = new WebviewWindow("theUniqueLabel", {
        url: "https://picgo.github.io/PicGo-Core-Doc/",
    });
    webview.show();
    webview;
    // since the webview window is created asynchronously,
    // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
    webview.once("tauri://created", function () {
        // webview window successfully created
    });
    webview.once("tauri://error", function (e) {
        // an error occurred during webview window creation
    });
}

function showAbout() {
    aboutWin();
}

const manageWin = () => {
    createWin({
        label: "Manage",
        title: "管理页面",
        url: "/manage",
        width: 600,
        height: 450,
        minWidth: 300,
        minHeight: 200,
    });
};

const aboutWin = () => {
    console.log("aboutWin");
    createWin({
        label: "About2",
        title: "关于页面",
        url: "/about",
        width: 500,
        height: 500,
        resizable: false,
        alwaysOnTop: false,
        show: true,
    });
};
</script>
<script>
export default {
    name: "Plugin",
};
</script>
<style scoped>
</style>
