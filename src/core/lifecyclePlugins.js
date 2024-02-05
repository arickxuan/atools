export class LifecyclePlugins {
    // static currentPlugin: string | null
    // private readonly list: Map<string, IPlugin>
    // private readonly pluginIdMap: Map<string, string[]>
    // private readonly name: string

    constructor(name) {
        this.name = name
        this.list = new Map()
        this.pluginIdMap = new Map()
    }

    register(id, plugin) {
        if (!id) throw new TypeError('id is required!')
        if (typeof plugin.handle !== 'function') throw new TypeError('plugin.handle must be a function!')
        if (this.list.has(id)) throw new TypeError(`${this.name} duplicate id: ${id}!`)
        this.list.set(id, plugin)
        if (LifecyclePlugins.currentPlugin) {
            if (this.pluginIdMap.has(LifecyclePlugins.currentPlugin)) {
                this.pluginIdMap.get(LifecyclePlugins.currentPlugin)?.push(id)
            } else {
                this.pluginIdMap.set(LifecyclePlugins.currentPlugin, [id])
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

    getName() {
        return this.name
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