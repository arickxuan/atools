import { Window, WindowOptions, getCurrent, getAll } from '@tauri-apps/api/window'
import { Webview } from "@tauri-apps/api/webview";
export function getWindow(label: string, options?: WindowOptions): Window {
    console.log(getCurrent.name)
    const windows = getAll()
    // for (const window of windows) {
    //     if (window.label === label) {
    //         console.log("window found")
    //         return window
    //     }
    // }
    // let newWindow: Window = new Window(label,options)
    let labelExists = Window.getByLabel(label)
    if (labelExists) {
        console.log("label exists")
        return labelExists
    } else {
        console.log("label does not exist")
        return new Window(label, options)
    }
}

export function getWebWindow(label: string,url:string ,options?: WindowOptions): Webview {
    let web = Webview.getByLabel("label")
    if (web) {
        return web
    } else {
        let win = getWindow(label, options)
        return new Webview(win,label,{url:url,x:0,y:0,width:800,height:600})
        
    }
}