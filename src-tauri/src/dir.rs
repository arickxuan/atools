use anyhow::Result;
use std::path::PathBuf;
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
