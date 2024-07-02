// import { register } from '@tauri-apps/plugin-global-shortcut';
import { register } from '@tauri-apps/api/globalShortcut';
import { isRegistered } from '@tauri-apps/api/globalShortcut';
import { unregister,unregisterAll } from '@tauri-apps/api/globalShortcut';
import { getWebWindow } from '../window/handle';
import { invoke } from '@tauri-apps/api/tauri';

export async function  doRegister() {
    // getWebWindow("pot",{url:"pot.html"}).hide()
    // getWebWindow("paste",{url:"paste.html"}).hide()
    console.log('3333 ');

    const isRegisteredre = await isRegistered('CommandOrControl+Shift+V');
    if (isRegisteredre) {
        console.log('isRegistered ');
        await unregister('CommandOrControl+Shift+V');
    }
    console.log('Shortcut paste');

    await register('CommandOrControl+Shift+V', () => {
        console.log('Shortcut paste');
        let options = {
            url:"paste.html",
            title: "paste",
        }
        let win = getWebWindow("paste", options)
        // getWindow("pot", options).hide()
        
        win.show()
        win.setFocus()
    });

    // invoke('register_shortcut_by_frontend', {
    //     name: "hotkey_paste",
    //     shortcut: 'CommandOrControl+Shift+V',
    // })
}
export function  test() {
    console.log("win")
}