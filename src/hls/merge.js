ipcMain.on('open-select-ts-dir', function (event, arg) {
    if (arg) {
        let files = [];
        try {
            files = fs.readdirSync(result.filePaths[0])
        } catch (error) {

        }
        if (files && files.length > 0) {
            let _files = files.filter((f) => {
                return f.endsWith('.ts') || f.endsWith('.TS')
            });
            if (_files.length) {
                event.sender.send("open-select-ts-select-reply", _files);
                return;
            }
        }
        return;
    }
    dialog.showOpenDialog(mainWindow, {
        title: "请选择欲合并的TS文件",
        properties: ['openFile', 'multiSelections'],
        filters: [{
            name: '视频片段',
            extensions: ['ts']
        }, {
            name: '所有文件',
            extensions: ['*']
        }]
    }).then(result => {
        if (!result.canceled && result.filePaths.length >= 1) {
            if (result.filePaths.length == 1) {
                event.sender.send("open-select-ts-dir-reply", result.filePaths[0]);

                let files = [];
                try {
                    files = fs.readdirSync(result.filePaths[0])
                } catch (error) {

                }
                if (files && files.length > 0) {
                    let _files = files.filter((f) => {
                        return f.endsWith('.ts') || f.endsWith('.TS')
                    });
                    if (_files && _files.length) {
                        event.sender.send("open-select-ts-select-reply", _files);
                        return;
                    } else {
                        event.sender.send("open-select-ts-select-reply", files);
                        return;
                    }
                }
            }
            let _files = result.filePaths.filter((f) => {
                return f.endsWith('.ts') || f.endsWith('.TS')
            });
            if (_files && _files.length) {
                event.sender.send("open-select-ts-select-reply", _files);
            } else {
                event.sender.send("open-select-ts-select-reply", result.filePaths);
            }
        }
    }).catch(err => {
        logger.error(`showOpenDialog ${err}`)
    });
});

ipcMain.on('start-merge-ts', async function (event, task) {
    if (!task) return
    let name = task.name ? task.name : (new Date().getTime() + '');

    let dir = path.join(pathDownloadDir, name);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    let outPathMP4 = path.join(dir, `${new Date().getTime()}.mp4`);

    if (fs.existsSync(ffmpegPath)) {
        mainWindow.webContents.send('start-merge-ts-status', {
            code: 0,
            progress: 1,
            status: '开始合并...'
        });
        ffmpegInputStream = new FFmpegStreamReadable(null);

        let ffmpegObj = new ffmpeg(ffmpegInputStream)
            .setFfmpegPath(ffmpegPath)
            .videoCodec(task.mergeType == 'speed' ? 'copy' : 'libx264')
            .audioCodec(task.mergeType == 'speed' ? 'copy' : 'aac')
            .format('mp4')
            .save(outPathMP4)
            .on('error', (error) => {
                logger.error(error)
                mainWindow.webContents.send('start-merge-ts-status', {
                    code: -2,
                    progress: 100,
                    status: '合并出错|' + error
                });
            })
            .on('end', function () {
                logger.info(`${outPathMP4} merge finished.`)
                mainWindow.webContents.send('start-merge-ts-status', {
                    code: 1,
                    progress: 100,
                    status: 'success',
                    dir: dir,
                    path: outPathMP4
                });
            })
            .on('progress', (info) => {
                logger.info(JSON.stringify(info));
                mainWindow.webContents.send('start-merge-ts-status', {
                    code: 0,
                    progress: -1,
                    status: JSON.stringify(info)
                });
            });
        let count = task.ts_files.length
        let _last = '';
        for (let index = 0; index < count; index++) {
            const file = task.ts_files[index];
            ffmpegInputStream.push(fs.readFileSync(file));
            while (ffmpegInputStream._readableState.length > 0) {
                await sleep(200);
            }
            let precent = Number.parseInt((index + 1) * 100 / count);
            mainWindow.webContents.send('start-merge-ts-status', {
                code: 0,
                progress: precent,
                status: `合并中...[${precent}%]`
            });
        }
        ffmpegInputStream.push(null);
    } else {
        mainWindow.webContents.send('start-merge-ts-status', {
            code: -1,
            progress: 100,
            status: '未检测到FFMPEG,不进行合并操作。'
        });
    }
});