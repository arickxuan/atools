use log::info;
use png::Compression;
use std::io::Read;
use tauri::api::path::cache_dir;

#[tauri::command]
pub fn screenshot(x: i32, y: i32) {
    use crate::APP;
    use std::fs;
    use xcap::Monitor;
    info!("Screenshot screen with position: x={}, y={}", x, y);
    // let screens = Screen::all().unwrap();
    let monitors = Monitor::all().unwrap();
    for monitor in monitors {
        let info = monitor.name();
        info!("Screen: {:?}", info);
        if monitor.x() == x && monitor.y() == y {
            // let handle = APP.get().unwrap();
            // let mut app_cache_dir_path = cache_dir();
            // app_cache_dir_path
            //     .push(&handle.config().tauri.bundle.identifier)
            //     .expect("Create Cache Dir Failed");
            // if !app_cache_dir_path.exists() {
            //     // 创建目录
            //     fs::create_dir_all(&app_cache_dir_path).expect("Create Cache Dir Failed");
            // }
            // app_cache_dir_path.push("pot_screenshot.png");
            //
            // let image = monitor.capture_image().unwrap();
            // let buffer = image.to_png(Compression::Fast).unwrap();
            //
            // fs::write(app_cache_dir_path, buffer).unwrap();
            let image = monitor.capture_image().unwrap();
            image
                .save(format!("target/window-{}-{}.png", "tremp", "ok"))
                .unwrap();
        }
    }
}
