import {join} from '@tauri-apps/api/path';
import {BaseDirectory, exists} from '@tauri-apps/api/fs';

export class PluginLoader {
    // private readonly ctx: IPicGo
    // private list: string[] = []
    // private readonly fullList: Set<string> = new Set()
    // private readonly pluginMap: Map<string, IPicGoPluginInterface> = new Map()
    constructor(ctx) {
        this.ctx = ctx
        const packagePath = join(this.ctx.baseDir, 'package.json')
        if (!exists(packagePath)) {
            const pkg = {
                name: 'atools-plugins',
                description: 'atools-plugins',
                repository: 'https://github.com/',
                license: 'MIT'
            }
            fs.writeFileSync(packagePath, JSON.stringify(pkg), 'utf8')
        }
    }

    // get plugin entry
    resolvePlugin(ctx, name) {
        try {
            return resolve.sync(name, { basedir: ctx.baseDir })
        } catch (err) {
            return path.join(ctx.baseDir, 'node_modules', name)
        }
    }

    // load all third party plugin
    load() {
        const packagePath = path.join(this.ctx.baseDir, 'package.json')
        const pluginDir = path.join(this.ctx.baseDir, 'node_modules/')
        const json = fs.readJSONSync(packagePath)
        // Thanks to hexo -> https://github.com/hexojs/hexo/blob/master/lib/hexo/load_plugins.js
        if (fs.existsSync(pluginDir)) {
            return checkNpm(json)
        }
        
        return true
    }
    checkNpm(json){
        
        const deps = Object.keys(json.dependencies || {})
        const devDeps = Object.keys(json.devDependencies || {})
        const modules = deps.concat(devDeps).filter((name) => {
            // if (!/^picgo-plugin-|^@[^/]+\\/picgo-plugin-/.test(name)) return false
        const path = this.resolvePlugin(this.ctx, name)
        return fs.existsSync(path)
        })
        for (const module of modules) {
            this.registerPlugin(module)
        }
        return true
    }

    registerPlugin(name, plugin) {
        if (!name || typeof name !== 'string') {
            this.ctx.log.warn('Please provide valid plugin')
            return
        }
        this.fullList.add(name)
        try {
            // register local plugin
            if (!plugin) {
                if (this.ctx.getConfig(`picgoPlugins.${name}`) === true || (this.ctx.getConfig(`picgoPlugins.${name}`) === undefined)) {
                    this.list.push(name)
                    setCurrentPluginName(name)
                    this.getPlugin(name).register(this.ctx)
                    const plugin = `picgoPlugins[${name}]`
                    this.ctx.saveConfig(
                        {
                            [plugin]: true
                        }
                    )
                }
            } else {
                // register provided plugin
                // && won't write config to files
                this.list.push(name)
                setCurrentPluginName(name)
                const pluginInterface = plugin(this.ctx)
                this.pluginMap.set(name, pluginInterface)
                pluginInterface.register(this.ctx)
            }
        } catch (e) {
            this.pluginMap.delete(name)
            this.list = this.list.filter((item) => item !== name)
            this.fullList.delete(name)
            // this.ctx.log_init.error(e)
            // this.ctx.emit(IBuildInEvent.NOTIFICATION, {
            //     title: `Plugin ${name} Load Error`,
            //     body: e
            // })
        }
    }

    unregisterPlugin(name) {
        this.list = this.list.filter((item) => item !== name)
        this.fullList.delete(name)
        this.pluginMap.delete(name)
        setCurrentPluginName(name)
        this.ctx.helper.uploader.unregister(name)
        this.ctx.helper.transformer.unregister(name)
        this.ctx.helper.beforeTransformPlugins.unregister(name)
        this.ctx.helper.beforeUploadPlugins.unregister(name)
        this.ctx.helper.afterUploadPlugins.unregister(name)
        this.ctx.cmd.unregister(name)
        this.ctx.removeConfig('picgoPlugins', name)
    }

    // get plugin by name
    async getPlugin(name) {
        if (this.pluginMap.has(name)) {
            return this.pluginMap.get(name)
        }
        let re= await exists('.atoolsplugin/'+name, { dir: BaseDirectory.Home });
        if (re){
            let path = join(this.ctx.baseDir,'.atoolsplugin/',name,'index.js')
            let { plugin } = await import(path);
            this.pluginMap.set(name, plugin)
            return plugin
        }else{
            const pluginDir = join(this.ctx.baseDir, 'node_modules/')
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const plugin = require(pluginDir + name)(this.ctx)
            this.pluginMap.set(name, plugin)
            return plugin
        }
        
    }

    /**
     * Get the list of enabled plugins
     */
    getList() {
        return this.list
    }

    hasPlugin(name) {
        return this.fullList.has(name)
    }

    /**
     * Get the full list of plugins, whether it is enabled or not
     */
    getFullList() {
        return [...this.fullList]
    }
}