#[tauri::command]
pub fn creat_config_dir(path: String) {
    let re = std::fs::create_dir(path);
}

#[tauri::command]
pub async fn my_read_file(path: std::path::PathBuf) -> String {
    // 读取文件内容，以文本字符串形式返回
    std::fs::read_to_string(path).unwrap()
}

#[tauri::command]
pub fn my_read_dir(path: String) {
    match std::fs::read_dir(path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let file_name = entry.file_name();
                        // let file_path = entry.path();
                        // 在此，`entry` 是 `DirEntry`。
                        if let Ok(file_type) = entry.file_type() {
                            // 现在，让我们显示条目的文件类型！
                            println!("{:?}:{:?}: {:?}", entry.path(), file_name, file_type);
                        } else {
                            println!("Couldn't get file type for {:?}", entry.path());
                        }
                    }
                    Err(e) => {
                        println!("Error reading entry: {:?}", e);
                    }
                }
            }
        }
        Err(e) => {
            println!("An error occurred: {:?}", e);
        }
    }
}
