import {LifecyclePlugins} from './lifecyclePlugins.js'
import {Lifecycle} from './lifecycle.js'
import {PluginLoader} from './pluginLoader.js'
import {pluginHandler} from './pluginHandler.js'
import {getConfigDir,configDirName} from '@/utils/dir.js'
import {Request} from './request.js'
// import {Commander} from './commander.js'
// import DB from './db.js'

// import path from 'path'

class Atools {
    // config,
    // lifecycle,
    // db
    // _pluginLoader
    // configPath: string
    // baseDir!: string
    // helper!: IHelper
    // log_init: Logger
    // cmd: Commander
    // output: IImgInfo[]
    // input: any[]
    // pluginHandler: PluginHandler
    /**
     * @deprecated will be removed in v1.5.0+
     *
     * use request instead
     */
    // Request!: Request
    // i18n!: II18nManager
    // VERSION: string = process.env.PICGO_VERSION
    // GUI_VERSION?: string

    get pluginLoader() {
        return this._pluginLoader
    }

    constructor(configPath = '') {
        // super()
        this.configPath = configPath
        this.output = []
        this.input = []
        
        this.initConfigPath()
        this.init()
    }

    async initConfigPath() {
        if (this.configPath === '') {
            let home = await getConfigDir()
            // console.log('home', home)
            this.configPath = home + '/config.json'
        }
        console.log('home', this.configPath)
        // if (path.extname(this.configPath).toUpperCase() !== '.JSON') {
        //     this.configPath = ''
        //     throw Error('The configuration file only supports JSON format.')
        // }
        this.baseDir =  configDirName
        const exist = fs.pathExistsSync(this.configPath)
        if (!exist) {
            fs.ensureFileSync(`${this.configPath}`)
        }
    }

    init() {
        // this.db = new DB(this)
        this._config = {} //this.db.read(true)
        try {
            this.helper = {
                transformer: new LifecyclePlugins('transformer'),
                uploader: new LifecyclePlugins('uploader'),
                beforeTransformPlugins: new LifecyclePlugins('beforeTransformPlugins'),
                beforeUploadPlugins: new LifecyclePlugins('beforeUploadPlugins'),
                afterUploadPlugins: new LifecyclePlugins('afterUploadPlugins')
            }

            // init 18n at first
            this.Request = new Request(this)
            // this.cmd = new Commander(this)
            this._pluginLoader = new PluginLoader(this)
            // this.pluginHandler = new pluginHandler(this)
            this.lifecycle = new Lifecycle(this)
            
            // load self plugins
            // setCurrentPluginName('picgo')
            // uploaders(this).register(this)
            // transformers(this).register(this)
            // setCurrentPluginName('')
            // load third-party plugins
            // this._pluginLoader.load() ???
            
            // this.log_init = new Logger(this)
            
        
        } catch (e) {
            // this.emit(IBuildInEvent.UPLOAD_PROGRESS, -1)
            // this.log.error(e)
            throw e
        }
    }

    /**
     * easily mannually load a plugin
     * if provide plugin name, will register plugin by name
     * or just instantiate a plugin
     */
    use(plugin, name) {  //IPicGoPluginInterface
        if (name) {
            this._pluginLoader.registerPlugin(name, plugin)
            return this._pluginLoader.getPlugin(name)
        } else {
            const pluginInstance = plugin(this)
            return pluginInstance
        }
    }

    registerCommands() {
        if (this.configPath !== '') {
            this.cmd.init()
            this.cmd.loadCommands()
        }
    }

    getConfig(name) {
        if (!name) {
            return this._config
        } else {
            return get(this._config, name)
        }
    }

    saveConfig(config) {
        if (!isInputConfigValid(config)) {
            this.log.warn('the format of config is invalid, please provide object')
            return
        }
        this.setConfig(config)
        //this.db.saveConfig(config)
    }

    removeConfig(key, propName) {
        if (!key || !propName) return
        if (isConfigKeyInBlackList(key)) {
            this.log.warn(`the config.${key} can't be removed`)
            return
        }
        this.unsetConfig(key, propName)
        //this.db.unset(key, propName)
    }

    setConfig(config) {
        if (!isInputConfigValid(config)) {
            this.log.warn('the format of config is invalid, please provide object')
            return
        }
        Object.keys(config).forEach((name) => {
            if (isConfigKeyInBlackList(name)) {
                this.log.warn(`the config.${name} can't be modified`)
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete config[name]
            }
            set(this._config, name, config[name])
            eventBus.emit(IBusEvent.CONFIG_CHANGE, {
                configName: name,
                value: config[name]
            })
        })
    }

    unsetConfig(key, propName) {
        if (!key || !propName) return
        if (isConfigKeyInBlackList(key)) {
            this.log.warn(`the config.${key} can't be unset`)
            return
        }
        unset(this.getConfig(key), propName)
    }

    get request() {
        return this.Request.request.bind(this.Request)
    }

    async upload(input) {
        if (this.configPath === '') {
            this.log.error('The configuration file only supports JSON format.')
            return []
        }
        // upload from clipboard
        if (input === undefined || input.length === 0) {
            try {
                const { imgPath, shouldKeepAfterUploading } = await getClipboardImage(this)
                if (imgPath === 'no image') {
                    throw new Error('image not found in clipboard')
                } else {
                    this.once(IBuildInEvent.FAILED, () => {
                        if (!shouldKeepAfterUploading) {
                            // 删除 picgo 生成的图片文件，例如 `~/.picgo/20200621205720.png`
                            fs.remove(imgPath).catch((e) => { this.log.error(e) })
                        }
                    })
                    this.once('finished', () => {
                        if (!shouldKeepAfterUploading) {
                            fs.remove(imgPath).catch((e) => { this.log.error(e) })
                        }
                    })
                    const { output } = await this.lifecycle.start([imgPath])
                    return output
                }
            } catch (e) {
                this.emit(IBuildInEvent.FAILED, e)
                throw e
            }
        } else {
            // upload from path
            const { output } = await this.lifecycle.start(input)
            return output
        }
    }
}

const atools  = new Atools()

export default atools ;