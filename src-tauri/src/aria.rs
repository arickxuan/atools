// use std::process::Command;
pub fn run_aria(dir: &str) {
    // 执行一个简单的命令，比如打印当前目录
    let args = "--conf-path=aria2.conf --log=~/.atoolsplugin/aria.log";
    let str = format!("{}", dir) + "/aria2c";
    let cpath = format!(
        "--conf-path={}/{} --log=~/.atoolsplugin/aria.log",
        dir, "aria2.conf"
    );

    match std::process::Command::new("aria2c").output() {
        Ok(_) => {}
        Err(e) => log::error!("aria2c error: {}", e),
    }
    // let output = Command::new().output().expect("Failed to execute command");
    // println!("Output: {}", String::from_utf8_lossy(&output.stdout));
}
