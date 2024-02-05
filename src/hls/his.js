ipcMain.on('task-add', async function (event, object) {
    logger.info(object);
    let hlsSrc = object.url;
    let _headers = {};
    if (object.headers) {
        let __ = object.headers.match(/(.*?): ?(.*?)(\n|\r|$)/g);
        __ && __.forEach((_) => {
            let ___ = _.match(/(.*?): ?(.*?)(\n|\r|$)/i);
            ___ && (_headers[___[1]] = ___[2]);
        });
    }

    let mes = hlsSrc.match(/^https?:\/\/[^/]*/);
    let _hosts = '';
    if (mes && mes.length >= 1) {
        _hosts = mes[0];

        if (_headers['Origin'] == null && _headers['origin'] == null) {
            _headers['Origin'] = _hosts;
        }
        if (_headers['Referer'] == null && _headers['referer'] == null) {
            _headers['Referer'] = _hosts;
        }
    }

    object.headers = _headers;

    let info = '解析资源失败！';
    let code = -1;

    let parser = new Parser();
    if (/^file:\/\/\//g.test(hlsSrc)) {
        parser.push(fs.readFileSync(hlsSrc.replace(/^file:\/\/\//g, '')));
        parser.end();
    } else {
        for (let index = 0; index < 3; index++) {
            let response = await got(hlsSrc, {
                headers: _headers,
                timeout: httpTimeout,
                agent: proxy_agent
            }).catch(logger.error); {
                if (response && response.body != null &&
                    response.body != '') {
                    parser.push(response.body);
                    parser.end();

                    if (parser.manifest.segments.length == 0 && parser.manifest.playlists && parser.manifest.playlists.length && parser.manifest.playlists.length == 1) {
                        let uri = parser.manifest.playlists[0].uri;
                        if (!uri.startsWith('http')) {
                            hlsSrc = uri[0] == '/' ? (hlsSrc.substr(0, hlsSrc.indexOf('/', 10)) + uri) :
                                (hlsSrc.replace(/\/[^\/]*((\?.*)|$)/, '/') + uri);
                        }
                        else {
                            hlsSrc = uri;
                        }
                        object.url = hlsSrc;
                        parser = new Parser();
                        continue;
                    }
                    break;
                }
            }
        }
    }

    let count_seg = parser.manifest.segments.length;
    if (count_seg > 0) {
        code = 0;
        if (parser.manifest.endList) {
            let duration = 0;
            parser.manifest.segments.forEach(segment => {
                duration += segment.duration;
            });
            info = `点播资源解析成功，有 ${count_seg} 个片段，时长：${formatTime(duration)}，即将开始缓存...`;
            startDownload(object);
        } else {
            info = `直播资源解析成功，即将开始缓存...`;
            startDownloadLive(object);
        }
    } else if (parser.manifest.playlists && parser.manifest.playlists.length && parser.manifest.playlists.length >= 1) {
        code = 1;
        event.sender.send('task-add-reply', {
            code: code,
            message: '',
            playlists: parser.manifest.playlists
        });
        return;
    }
    event.sender.send('task-add-reply', {
        code: code,
        message: info
    });
});

ipcMain.on('task-add-muti', async function (event, object) {
    logger.info(object);
    let m3u8_urls = object.m3u8_urls;
    let _headers = {};
    if (object.headers) {
        let __ = object.headers.match(/(.*?): ?(.*?)(\n|\r|$)/g);
        __ && __.forEach((_) => {
            let ___ = _.match(/(.*?): ?(.*?)(\n|\r|$)/i);
            ___ && (_headers[___[1]] = ___[2]);
        });
    }

    let info = '解析资源失败！';
    let code = -1;
    let iidx = 0;
    m3u8_urls.split(/\r|\n/g).forEach(urls => {
        if (urls != '') {
            let _obj = {
                url: '',
                headers: object.headers,
                myKeyIV: '',
                taskName: '',
                taskIsDelTs: object.taskIsDelTs,
                url_prefix: ''
            };
            if (/-{4}/.test(urls)) {
                let __ = urls.split('----');
                if (__ && __.length >= 2) {
                    if (__[0]) {
                        _obj.url = __[0];
                        if (__[1]) {
                            _obj.taskName = __[1];
                        }
                    }
                }
            } else {
                _obj.url = urls;
            }

            if (_obj.url) {

                let mes = _obj.url.match(/^https?:\/\/[^/]*/);
                let _hosts = '';
                if (mes && mes.length >= 1) {
                    _hosts = mes[0];

                    if (_headers['Origin'] == null && _headers['origin'] == null) {
                        _headers['Origin'] = _hosts;
                    }
                    if (_headers['Referer'] == null && _headers['referer'] == null) {
                        _headers['Referer'] = _hosts;
                    }
                }

                _obj.headers = _headers;

                startDownload(_obj, iidx);
                iidx = iidx + 1;
            }
        }
    })
    info = `批量添加成功，正在下载...`;
    event.sender.send('task-add-reply', {
        code: 0,
        message: info
    });
});