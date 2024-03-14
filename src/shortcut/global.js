// import { register } from '@tauri-apps/plugin-global-shortcut';
import { register } from '@tauri-apps/api/globalShortcut';
import { getWebWindow } from '../window/handle';

export async function doRegister() {
    // getWebWindow("pot",{url:"pot.html"}).hide()
    getWebWindow("paste",{url:"paste.html"}).hide()

    register('CommandOrControl+Shift+B', () => {
        console.log('Shortcut paste');
        let options = {
            url:"paste.html",
            title: "paste",
        }
        let win = getWebWindow("paste", options)
        console.log(win)
        // getWindow("pot", options).hide()
        
        win.show()
        win.setFocus()
    });
}