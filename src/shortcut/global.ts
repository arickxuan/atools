import { register } from '@tauri-apps/plugin-global-shortcut';
import { getWindow } from '../window/handle';

export async function doRegister() {
    getWindow("pot").hide()
    getWindow("paste").hide()

    register('CommandOrControl+Shift+v', () => {
        console.log('Shortcut paste');
        let options = {
            // url:"pot.html"
            title: "paste",
        }
        let win = getWindow("paste", options)
        console.log(win)
        // getWindow("pot", options).hide()
        
        win.show()
        win.setFocus()
    });
}