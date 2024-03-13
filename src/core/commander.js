import {Command} from '@tauri-apps/api/shell'

export class Commander {
    // private readonly name = 'commander'
    // static currentPlugin: string | null
    // private readonly list: Map<string, IPlugin> = new Map()
    // private readonly pluginIdMap: Map<string, string[]> = new Map()
    // private readonly ctx: IPicGo

    // program: Command
    // inquirer: Inquirer

    constructor(ctx) {
        this.program = new Command()
        //new Command('run-git-commit', ['commit', '-m', 'the commit message'])
        //this.inquirer = inquirer
        this.ctx = ctx
    }

    getName() {
        return this.name
    }

    init() {
        this.program
            .version(process.env.PICGO_VERSION, '-v, --version')
            .option('-d, --debug', 'debug mode', () => {
                this.ctx.setConfig({
                    debug: true
                })
            })
            .option('-s, --silent', 'silent mode', () => {
                this.ctx.setConfig({
                    silent: true
                })
            })
            .on('command:*', () => {
                this.ctx.log.error(`Invalid command: ${this.program.args.join(' ')}\
  See --help for a list of available commands.`)
                process.exit(1)
            })

        // built-in commands
        commanders(this.ctx)
    }

    register(id, plugin) {
        if (!id) throw new TypeError('name is required!')
        if (typeof plugin.handle !== 'function') throw new TypeError('plugin.handle must be a function!')
        if (this.list.has(id)) throw new TypeError(`${this.name} plugin duplicate id: ${id}!`)
        this.list.set(id, plugin)
        const currentPluginName = getCurrentPluginName()
        if (currentPluginName !== null) {
            if (this.pluginIdMap.has(currentPluginName)) {
                this.pluginIdMap.get(currentPluginName)?.push(id)
            } else {
                this.pluginIdMap.set(currentPluginName, [id])
            }
        }
    }

    unregister(pluginName) {
        if (this.pluginIdMap.has(pluginName)) {
            const pluginList = this.pluginIdMap.get(pluginName)
            pluginList?.forEach((plugin) => {
                this.list.delete(plugin)
            })
        }
    }

    loadCommands() {
        this.getList().forEach((item) => {
            try {
                item.handle(this.ctx)
            } catch (e) {
                this.ctx.log.error(e)
            }
        })
    }

    get(id) {
        return this.list.get(id)
    }

    getList() {
        return [...this.list.values()]
    }

    getIdList() {
        return [...this.list.keys()]
    }
}

export default Commander