// use crate::window::text_translate;
use std::sync::Mutex;
use tauri::{ClipboardManager, Manager};

pub struct ClipboardMonitorEnableWrapper(pub Mutex<String>);

pub fn start_clipboard_monitor(app_handle: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        let mut pre_text = "".to_string();
        loop {
            if let Ok(result) = app_handle.clipboard_manager().read_text() {
                match result {
                    Some(v) => {
                        if v != pre_text {
                            v.clone();
                            // text_translate(v.clone());
                            pre_text = v;
                            log::info!("Clipboard changed: {}", pre_text);
                        }
                    }
                    None => {
                        log::warn!("Failed to read clipboard")
                    }
                }
            }

            std::thread::sleep(std::time::Duration::from_millis(500));
        }
    });
}
