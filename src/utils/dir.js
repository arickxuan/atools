// import os from "os";
import {homeDir} from "@tauri-apps/api/path";


function getPluginDir() {
    // let re = os.homedir();
    let re = process.env.HOME;
    if (process.platform === 'win32') {
        // console.log_init('This is a Windows system');
        re = re + '/.tauri/plugins';
    } else if (process.platform === 'darwin') {
        // console.log_init('This is a Mac system');
        re = re + '/Library/Application\ Support/com.tauri.dev/plugins';
    } else if (process.platform === 'linux') {
        // console.log_init('This is a Linux system');
        re = re + '/.tauri/plugins';
    } else {
        // console.log_init('This is another type of system');
        re = re + '';
    }

    return re;

}

async function getConfigDir(){
    let home = await homeDir()
    let path = homedir() + '/.atoolsplugin'
    return path
}

export {
    getPluginDir,
    getConfigDir
}