import {JSONStore} from '@picgo/store'

class DB {
    // private readonly ctx: IPicGo
    // private readonly db: JSONStore
    constructor (ctx) {
      this.ctx = ctx
      this.db = new JSONStore(this.ctx.configPath)
  
      if (!this.db.has('atools')) {
        try {
          this.db.set('atools', {
            uploader: 'smms',
            current: 'smms'
          })
        } catch (e) {
          this.ctx.log.error(e)
          throw e
        }
      }
      if (!this.db.has('picgoPlugins')) {
        try {
          this.db.set('picgoPlugins', {})
        } catch (e) {
          this.ctx.log.error(e)
          throw e
        }
      }
    }
  
    read (flush) {
      return this.db.read(flush)
    }
  
    get (key = '') {
      this.read(true)
      return this.db.get(key)
    }
  
    set (key, value) {
      this.read(true)
      return this.db.set(key, value)
    }
  
    has (key) {
      this.read(true)
      return this.db.has(key)
    }
  
    unset (key, value) {
      this.read(true)
      return this.db.unset(key, value)
    }
  
    saveConfig (config) {
      Object.keys(config).forEach((name) => {
        this.set(name, config[name])
      })
    }
  
    removeConfig (config) {
      Object.keys(config).forEach((name) => {
        this.unset(name, config[name])
      })
    }
  }
  
  export default DB