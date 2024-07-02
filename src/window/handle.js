import {  WebviewWindow,appWindow, getCurrent, getAll } from '@tauri-apps/api/window'
// import { appWindow } from "@tauri-apps/api/window";
// import { WebviewWindow } from "@tauri-apps/api/webview";


export function getWebWindow(label ,options) {
    let web =  WebviewWindow.getByLabel(label)
    if (web == null) {
        console.log("webview is null")
        let win = new WebviewWindow(label, options)
        return win
    } else {
        console.log("webview is not null")
        return web
        
    }
}