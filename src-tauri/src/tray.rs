use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu, Window,
};

use crate::trace_err;

// mod helper;

pub fn menu() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "退出应用");
    let show = CustomMenuItem::new("show".to_string(), "打开主窗口");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏主窗口");
    let restart = CustomMenuItem::new("restart".to_string(), "重启应用");

    let showbook = CustomMenuItem::new("showbook".to_string(), "打开abook");
    let showAria2 = CustomMenuItem::new("showAria2".to_string(), "打开下载");
    let tray_menu = SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new(
            "选择图床",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("new_file".to_string(), "alist"))
                .add_item(CustomMenuItem::new("edit_file".to_string(), "custom")),
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(showbook)
        .add_item(showAria2)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(restart)
        .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);
    tray
}

#[tauri::command]
pub fn creatWin(label: String, url: String, handle: &tauri::AppHandle) -> Window {
    let win = tauri::WindowBuilder::new(
        handle,
        label, /* the unique window label */
        tauri::WindowUrl::External(url.parse().unwrap()),
    )
    .build()
    .unwrap();

    win
}

// 菜单事件
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
    // 获取应用窗口
    // let window = app.get_window("main");
    // let parent_window = Some(&window);
    // 匹配点击事件
    match event {
        // 左键点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a left click");
        }
        // 右键点击
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        // 双击，macOS / Linux 不支持
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
        }
        // 根据菜单 id 进行事件匹配
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "alist" => {
                // message(parent_window, "Eidt File", "TODO");
            }
            "custom" => {
                // message(parent_window, "New File", "TODO");
            }
            "quit" => {
                std::process::exit(0);
            }
            "restart" => {
                // app.reload().unwrap();
                app.restart();
            }
            "showAria2" => {
                if let Some(window) = app.get_window("aria2") {
                    trace_err!(window.unminimize(), "set win unminimize");
                    trace_err!(window.show(), "set win visible");
                    trace_err!(window.set_focus(), "set win focus");
                    return;
                }
                let local_window = tauri::WindowBuilder::new(
                    app,
                    "aria2",
                    tauri::WindowUrl::App("aria.html".into()),
                )
                .build()
                .expect("msg");
                let _ = local_window.set_title("aria2");
                local_window.show().expect("msg");
            }
            "showbook" => {
                if let Some(window) = app.get_window("abook") {
                    trace_err!(window.unminimize(), "set win unminimize");
                    trace_err!(window.show(), "set win visible");
                    trace_err!(window.set_focus(), "set win focus");
                    return;
                }
                let builder = tauri::window::WindowBuilder::new(
                    app,
                    "abook".to_string(),
                    tauri::WindowUrl::App("book.html".into()),
                )
                .title("abook")
                .fullscreen(false)
                // .min_inner_size(600.0, 520.0)
                .build()
                .unwrap();
                builder.show();
                log::info!(" book none");
            }
            "show" => {
                if let Some(window) = app.get_window("main") {
                    trace_err!(window.unminimize(), "set win unminimize");
                    trace_err!(window.show(), "set win visible");
                    trace_err!(window.set_focus(), "set win focus");
                    return;
                }
                let builder = tauri::window::WindowBuilder::new(
                    app,
                    "main".to_string(),
                    tauri::WindowUrl::App("index.html".into()),
                )
                .title("main")
                .fullscreen(false)
                // .min_inner_size(600.0, 520.0)
                .build()
                .unwrap();
                builder.show();
                log::info!(" main none");
            }
            "hide" => {
                if let Some(window) = app.get_window("main") {
                    trace_err!(window.hide(), "set win hidden");
                    return;
                }
                let builder = tauri::window::WindowBuilder::new(
                    app,
                    "main".to_string(),
                    tauri::WindowUrl::App("index.html".into()),
                )
                .title("main")
                .fullscreen(false)
                .min_inner_size(600.0, 520.0)
                .build()
                .unwrap();
                builder.hide();
            }
            _ => {}
        },
        _ => {}
    }
}

pub fn get_main_window(app_handle: &AppHandle, window: Option<Window>) {
    if let Some(window) = window {
        trace_err!(window.unminimize(), "set win unminimize");
        trace_err!(window.show(), "set win visible");
        trace_err!(window.set_focus(), "set win focus");
        return;
    }

    let mut builder = tauri::window::WindowBuilder::new(
        app_handle,
        "main".to_string(),
        tauri::WindowUrl::App("index.html".into()),
    )
    .title("main")
    .fullscreen(false)
    .min_inner_size(600.0, 520.0);
}
