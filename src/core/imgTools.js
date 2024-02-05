import fs from 'fs-extra'
import path from 'path'
import {imageSize} from 'image-size'

import {URL} from 'url'

export const isUrl = (url) => (url.startsWith('http://') || url.startsWith('https://'))
export const isUrlEncode = (url) => {
    url = url || ''
    try {
        // the whole url encode or decode shold not use encodeURIComponent or decodeURIComponent
        return url !== decodeURI(url)
    } catch (e) {
        // if some error caught, try to let it go
        return false
    }
}
export const handleUrlEncode = (url) => {
    if (!isUrlEncode(url)) {
        url = encodeURI(url)
    }
    return url
}

export const getImageSize = (file) => {
    try {
        const { width = 0, height = 0, type } = imageSize(file)
        const extname = type ? `.${type}` : '.png'
        return {
            real: true,
            width,
            height,
            extname
        }
    } catch (e) {
        // fallback to 200 * 200
        return {
            real: false,
            width: 200,
            height: 200,
            extname: '.png'
        }
    }
}

export const getFSFile = async (filePath) => {
    try {
        return {
            extname: path.extname(filePath),
            fileName: path.basename(filePath),
            buffer: await fs.readFile(filePath),
            success: true
        }
    } catch {
        return {
            reason: `read file ${filePath} error`,
            success: false
        }
    }
}

export const getURLFile = async (url, ctx) => {
    url = handleUrlEncode(url)
    let isImage = false
    let extname = ''
    //   let timeoutId: NodeJS.Timeout
    const requestFn = new Promise < IPathTransformedImgInfo > ((resolve, reject) => {
        (async () => {
            try {
                const res = await ctx.request({
                    method: 'get',
                    url,
                    resolveWithFullResponse: true,
                    responseType: 'arraybuffer'
                })
                    .then((resp) => {
                        const contentType = resp.headers['content-type']
                        if (contentType?.includes('image')) {
                            isImage = true
                            extname = `.${contentType.split('image/')[1]}`
                        }
                        return resp.data
                    })
                clearTimeout(timeoutId)
                if (isImage) {
                    const urlPath = new URL(url).pathname
                    resolve({
                        buffer: res,
                        fileName: path.basename(urlPath),
                        extname,
                        success: true
                    })
                } else {
                    resolve({
                        success: false,
                        reason: `${url} is not image`
                    })
                }
            } catch (error) {
                clearTimeout(timeoutId)
                resolve({
                    success: false,
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    reason: `request ${url} error, ${error?.message ?? ''}`
                })
            }
        })().catch(reject)
    })
    const timeoutPromise = new Promise < IPathTransformedImgInfo > ((resolve) => {
        timeoutId = setTimeout(() => {
            resolve({
                success: false,
                reason: `request ${url} timeout`
            })
        }, 10000)
    })
    return Promise.race([requestFn, timeoutPromise])
}


export const getClipboardImage = async (ctx) => {
    createImageFolder(ctx)
    // add an clipboard image folder to control the image cache file
    const imagePath = path.join(ctx.baseDir, CLIPBOARD_IMAGE_FOLDER, `${dayjs().format('YYYYMMDDHHmmss')}.png`)
    return await new Promise < IClipboardImage > ((resolve, reject) => {
        const platform = getCurrentPlatform()
        const scriptPath = path.join(ctx.baseDir, platform2ScriptFilename[platform])
        // If the script does not exist yet, we need to write the content to the script file
        if (!fs.existsSync(scriptPath)) {
            fs.writeFileSync(
                scriptPath,
                platform2ScriptContent[platform],
                'utf8'
            )
        }
        let execution
        if (platform === 'darwin') {
            execution = spawn('osascript', [scriptPath, imagePath])
        } else if (platform === 'win32' || platform === 'win10') {
            execution = spawn('powershell', [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                // fix windows 10 native cmd crash bug when \"picgo upload\"
                // https://github.com/PicGo/PicGo-Core/issues/32
                // '-windowstyle','hidden',
                // '-noexit',
                '-file', scriptPath,
                imagePath
            ])
        } else {
            execution = spawn('sh', [scriptPath, imagePath])
        }

        execution.stdout.on('data', (data) => {
            if (platform === 'linux') {
                if (data.toString().trim() === 'no xclip or wl-clipboard') {
                    ctx.emit(IBuildInEvent.NOTIFICATION, {
                        title: 'xclip or wl-clipboard not found',
                        body: 'Please install xclip(for x11) or wl-clipboard(for wayland) before run picgo'
                    })
                    return reject(new Error('Please install xclip(for x11) or wl-clipboard(for wayland) before run picgo'))
                }
            }
            const imgPath = data.toString().trim()

            // if the filePath is the real file in system
            // we should keep it instead of removing
            let shouldKeepAfterUploading = false

            // in macOS if your copy the file in system, it's basename will not equal to our default basename
            if (path.basename(imgPath) !== path.basename(imagePath)) {
                // if the path is not generate by picgo
                // but the path exists, we should keep it
                if (fs.existsSync(imgPath)) {
                    shouldKeepAfterUploading = true
                }
            }
            // if the imgPath is invalid
            if (imgPath !== 'no image' && !fs.existsSync(imgPath)) {
                return reject(new Error(`Can't find ${imgPath}`))
            }

            resolve({
                imgPath,
                shouldKeepAfterUploading
            })
        })
    })
}