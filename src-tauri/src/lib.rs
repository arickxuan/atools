// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn testhttp() {
    use tauri_plugin_http::reqwest;

    let res = reqwest::get("https://api.myip.la/cn?json").await;
    // println!("{:?}", res.unwrap().status()); // e.g. 200
    println!("{:?}", res.unwrap().text().await); // e.g Ok("{ Content }")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // testhttp().await;
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_http::init())
        .invoke_handler(tauri::generate_handler![greet, testhttp])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
