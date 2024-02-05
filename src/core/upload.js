export const upload = {
    handle: (ctx) => {
        const cmd = ctx.cmd
        cmd.program
            .command('upload')
            .description('upload, go go go')
            .arguments('[input...]')
            .alias('u')
            .action((input) => {
                (async () => {
                    const inputList = input
                        .map((item) => {
                            return isUrl(item) ? item : path.resolve(item)
                        })
                        .filter((item) => {
                            const exist = fs.existsSync(item) || isUrl(item)
                            if (!exist) {
                                ctx.log.warn(`${item} does not exist.`)
                            }
                            return exist
                        })
                    await ctx.upload(inputList)
                })().catch((e) => { ctx.log.error(e) })
            })
    }
}