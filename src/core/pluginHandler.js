export class  pluginHandler   {
    constructor(ctx) {
    // handle: (ctx) => {
        // const pluginHandler = new PluginHandler(ctx)
        const cmd = ctx.cmd
        cmd.program
            .command('install <plugins...>')
            .description('install picgo plugin')
            .alias('add')
            .option('-p, --proxy <proxy>', 'Add proxy for installing plugins')
            .option('-r, --registry <registry>', 'Choose a registry for installing plugins')
            .action((plugins, program) => {
                const { proxy, registry } = program
                const options = {
                    npmProxy: proxy,
                    npmRegistry: registry
                }
                ctx.pluginHandler.install(plugins, options).catch((e) => { ctx.log.error(e) })
            })
        cmd.program
            .command('uninstall <plugins...>')
            .alias('rm')
            .description('uninstall picgo plugin')
            .action((plugins) => {
                ctx.pluginHandler.uninstall(plugins).catch((e) => { ctx.log.error(e) })
            })
        cmd.program
            .command('update <plugins...>')
            .description('update picgo plugin')
            .option('-p, --proxy <proxy>', 'Add proxy for installing plugins')
            .option('-r, --registry <registry>', 'Choose a registry for installing plugins')
            .action((plugins, program) => {
                const { proxy, registry } = program
                const options = {
                    npmProxy: proxy,
                    npmRegistry: registry
                }
                ctx.pluginHandler.update(plugins, options).catch((e) => { ctx.log.error(e) })
            })
    }
}