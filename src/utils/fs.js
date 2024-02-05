import {BaseDirectory, createDir, exists, readDir, writeTextFile} from "@tauri-apps/api/fs";
import {appConfigDir} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api";

async function createConfigDir(dirname) {
    try{
    let re = await createDir(dirname, { dir: BaseDirectory.AppConfig, recursive: true });
    console.log(re);
    }catch(e){
        console.log(e);
    }
}
function createConfigDirRust(dirname) {
    invoke("creat_config_dir", { path: dirname});
    // console.log_init(content);
}

async function readFile(path) {
    // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
    const content = await invoke("my_read_file", { path: path });
    return content;
}

async function isExists(path) {
    let re = await exists(path, { dir: BaseDirectory.AppConfig });
    return re;
}

async function read_dir() {
    const appConfigDirPath = await appConfigDir();
    const content = invoke("my_read_dir", { path: appConfigDirPath });

    // Reads the `$APPDATA/users` directory recursively
    const entries = await readDir("/", {
        dir: BaseDirectory.AppConfig,
        recursive: true,
    });
    processEntries(entries);
}
function processEntries(entries) {
    for (const entry of entries) {
        console.log(`Entry: ${entry.path}`);
        // if (entry.children) {
        //   processEntries(entry.children)
        // }
    }
}

async function writeFile(file, content) {
    await writeTextFile(file, content, { dir: BaseDirectory.AppConfig });
}

export  {
    createConfigDirRust,
    readFile,
    read_dir,
    isExists,
    writeFile
}
// exports.createConfigDirRust = createConfigDirRust;  
// exports.readFile = readFile;
// exports.read_dir = read_dir;
// exports.isExists = isExists;
// exports.writeFile = writeFile;

// export default createConfigDirRust;