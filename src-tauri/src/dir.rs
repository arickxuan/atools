use std::path::PathBuf;
use std::process::{Command, Stdio};

use anyhow::Result;
use tauri::{
    api::path::{home_dir, resource_dir},
    Env, PackageInfo,
};

/// get the resources dir
pub fn app_resources_dir(package_info: &PackageInfo) -> Result<PathBuf> {
    let res_dir = resource_dir(package_info, &Env::default())
        .ok_or(anyhow::anyhow!("failed to get the resource dir"))?
        .join("resources");

    unsafe {
        let RESOURCE_DIR = Some(res_dir.clone());

        let ver = package_info.version.to_string();
        let ver_str = format!("v{ver}");
        let APP_VERSION = Box::leak(Box::new(ver_str));
    }

    Ok(res_dir)
}

pub fn path_to_str(path: &PathBuf) -> Result<&str> {
    let path_str = path
        .as_os_str()
        .to_str()
        .ok_or(anyhow::anyhow!("failed to get path from {:?}", path))?;
    Ok(path_str)
}

pub fn run_shell(program: &str, args: &str, path: &str) {
    let cmd = format!("{}/{}", path, program);
    if let Some(h) = home_dir() {
        let home = path_to_str(&h).unwrap();
        let arg2 = format!("--log={}/.atoolsplugin/aria.log", home);
        let args = format!("--conf-path={}/aria2.conf", path);
        let arg3 = "--rpc-listen-port=16800";
        let output = Command::new(&cmd)
            .args([&args, &arg2, arg3])
            .stdout(Stdio::inherit())
            .stderr(Stdio::inherit())
            .output()
            .expect("failed to execute process");
        log::info!("stdout: {}", String::from_utf8_lossy(&output.stdout));
        log::info!("stderr: {}", String::from_utf8_lossy(&output.stderr));
    }
}
