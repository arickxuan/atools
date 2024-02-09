use std::sync::Mutex;

use tauri::{ClipboardManager, Manager};
// use crate::window::text_translate;
use tauri_plugin_clipboard;

pub struct ClipboardMonitorEnableWrapper(pub Mutex<String>);

pub fn start_clipboard_monitor(app_handle: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        return;
        let mut pre_text = "".to_string();
        let mut img = "";
        let mut files: Vec<String> = Vec::new();
        let clipboard = app_handle.state::<tauri_plugin_clipboard::ClipboardManager>();
        loop {
            if let Ok(result) = clipboard.read_text() {
                // if result != pre_text {
                pre_text = result;
                log::info!("Clipboard changed: {}", pre_text);
                // }
            }
            if let Ok(result) = clipboard.read_files() {
                if result != files {
                    files = result;
                    // log::info!("Clipboard changed: {}", result.first().unwrap());
                }
            }
            if let Ok(result) = clipboard.read_image() {
                // if img != result {
                img = &result;
                log::info!("Clipboard changed: {}", result);
                // }
            }

            std::thread::sleep(std::time::Duration::from_millis(500));
        }
    });
}

pub fn listen_clipboard(app_handle: &tauri::AppHandle) {
    let clipboard = app_handle.state::<tauri_plugin_clipboard::ClipboardManager>();
    //let mut re = clipboard.read_text().unwrap();
    let mut text = "";
    let mut img = "";
    let mut files: Vec<String> = Vec::new();
    if let Ok(result) = clipboard.read_text() {
        log::info!("Clipboard changed: {}", result);
        text = &result;
    }
    if let Ok(result) = clipboard.read_files() {
        log::info!("Clipboard changed: {}", result.first().unwrap());
        files = result
    }
    if let Ok(result) = clipboard.read_image() {
        log::info!("Clipboard changed: {}", result);
        img = &result;
    }
}
