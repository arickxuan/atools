// import os from "os";
import {homeDir} from "@tauri-apps/api/path";

let configDirName = '.atools';
let configDir = '.atools';

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
    // console.log("home",home)
    configDir = home + configDirName
    return configDir
}

export {
    getPluginDir,
    getConfigDir,
    configDirName,
}