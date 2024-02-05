// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate log;
extern crate log4rs;

use std::env;
use std::path::PathBuf;
use std::string::String;
// use log_init::{info}; //trace, warn
use tauri::Manager;
use tauri::Window;
use tauri_plugin_log;
use tauri_plugin_log::LogTarget;
use tokio;
use tokio::time;

#[cfg(target_os = "macos")]

fn query_accessibility_permissions() -> bool {
    let trusted = macos_accessibility_client::accessibility::application_is_trusted_with_prompt();
    if trusted {
        print!("Application is totally trusted!");
    } else {
        print!("Application isn't trusted :(");
    }
    return trusted;
}

#[cfg(not(target_os = "macos"))]
fn query_accessibility_permissions() -> bool {
    print!("Who knows... 🤷‍♀️");
    return true;
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod aria;
mod clipboard;
mod dir;
mod fs;
mod log_init;
mod tray;

async fn print_tools() {
    let mut interval = time::interval(time::Duration::from_secs(1));
    loop {
        interval.tick().await;
        // println!("2333");
        // log::info!("2333");
    }
}
#[tauri::command]
fn log_info(str: String) {
    // trace!("Commencing yak shaving");

    warn!("web log_init: {}", str);
    let dir = env::current_dir()
        .expect("REASON")
        .as_os_str()
        .to_str()
        .unwrap()
        .to_string();

    print!("Got value: {}", dir);
    let home = env::var("HOME");
    if let Ok(value) = home {
        println!("Got value: {}", value);
    }
}
// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[tauri::command]
fn init_process(window: Window) {
    std::thread::spawn(move || loop {
        window
            .emit(
                "event-name",
                Payload {
                    message: "Tauri is awesome!".into(),
                },
            )
            .unwrap();
    });
}

#[tokio::main]
async fn main() {
    tokio::spawn(print_tools());
    // log_init::log4rs::init_file("log4rs.yaml", Default::default()).unwrap();
    // log_init::log_init();
    let context = tauri::generate_context!();

    let app = tauri::Builder::default()
        //.targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);

            //app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .setup(|app| {
            // let docs_window = tauri::WindowBuilder::new(
            //     app,
            //     "web", /* the unique window label */
            //     tauri::WindowUrl::External("https://www.baidu.com".parse().unwrap()),
            // )
            // .build()?;

            // listen to the `event-name` (emitted on any window)
            let id = app.listen_global("event-name", |event| {
                println!("got event-name with payload {:?}", event.payload());
            });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            app.unlisten(id);

            let main_window = app.get_window("main").unwrap();
            main_window.show();

            // listen to the `event-name` (emitted on the `main` window)
            let id2 = main_window.listen("event-name2", |event| {
                println!("got window event-name with payload {:?}", event.payload());
            });

            app.unlisten(id);
            let handle = app.handle();

            let res = dir::app_resources_dir(app.package_info());
            if let Ok(res) = res {
                println!("res: {res:?}");
                let str = res.into_os_string().into_string().unwrap();
                aria::run_aria(&str);
            }

            std::thread::spawn(move || {
                // let local_window = tauri::WindowBuilder::new(
                //     &handle,
                //     "settings",
                //     tauri::WindowUrl::App("/settings".into()),
                // )
                // .build()
                // .expect("msg2");
                // let _ = local_window.set_title("ok2");
                // local_window.show();
            });
            clipboard::start_clipboard_monitor(app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            log_info,
            // tray::creatWin,
            fs::my_read_file,
            fs::my_read_dir,
            fs::creat_config_dir
        ])
        .system_tray(tray::menu())
        .on_system_tray_event(tray::handler)
        // .run(context)
        .build(context)
        .expect("error while running tauri application");

    let local_window =
        tauri::WindowBuilder::new(&app, "aria", tauri::WindowUrl::App("aria.html".into()))
            .build()
            .expect("msg");
    let _ = local_window.set_title("aria");
    local_window.show().expect("msg");
    // local_window.hide();

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
