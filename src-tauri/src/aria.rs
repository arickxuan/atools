use tauri::api::process::{Command, CommandEvent};

pub async fn run_aria(dir: &str) {
    // let mut cmd = format!("{}", dir) + "/aria2c";
    let cmd = "aria2c";
    let args = format!("--conf-path={}/aria2.conf", dir); // --log=~/.atoolsplugin/aria.log
    let (mut rx, _child) = Command::new(cmd)
        //.args(&[args])
        .spawn()
        .expect("Failed to spawn node");
    #[allow(clippy::collapsible_match)]
    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            log::info!("aria:{}", line);
        }
    }
}

/// 给clash内核的tun模式授权
#[cfg(any(target_os = "macos", target_os = "linux"))]
pub fn grant_permission(core: String) -> anyhow::Result<()> {
    use std::process::Command;
    use tauri::utils::platform::current_exe;

    let path = current_exe()?.with_file_name(core).canonicalize()?;
    let path = path.display().to_string();

    log::debug!("grant_permission path: {path}");

    #[cfg(target_os = "macos")]
    let output = {
        // the path of clash /Applications/Clash Verge.app/Contents/MacOS/clash
        // https://apple.stackexchange.com/questions/82967/problem-with-empty-spaces-when-executing-shell-commands-in-applescript
        // let path = escape(&path);
        let path = path.replace(' ', "\\\\ ");
        let shell = format!("chown root:admin {path}\nchmod +sx {path}");
        let command = format!(r#"do shell script "{shell}" with administrator privileges"#);
        Command::new("osascript")
            .args(vec!["-e", &command])
            .output()?
    };

    #[cfg(target_os = "linux")]
    let output = {
        let path = path.replace(' ', "\\ "); // 避免路径中有空格
        let shell = format!("setcap cap_net_bind_service,cap_net_admin=+ep {path}");

        let sudo = match Command::new("which").arg("pkexec").output() {
            Ok(output) => {
                if output.stdout.is_empty() {
                    "sudo"
                } else {
                    "pkexec"
                }
            }
            Err(_) => "sudo",
        };

        Command::new(sudo).arg("sh").arg("-c").arg(shell).output()?
    };

    if output.status.success() {
        Ok(())
    } else {
        let stderr = std::str::from_utf8(&output.stderr).unwrap_or("");
        anyhow::bail!("{stderr}");
    }
}
