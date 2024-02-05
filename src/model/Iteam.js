class Iteam {
    constructor(content, contentType, lastTime,timeType,timeLength,templateName,order) {
        this.content = content
        this.contentType = contentType  // 0 固定值 1 代码 
        
        this.lastTime = lastTime // 上次执行时间 timeType=1 有效
        this.timeType = timeType // 0 固定值   1 超时时间 2定时执行
        this.timeLength = timeLength // 时间长度 单位s  与timeType组合使用
        this.templateName = templateName // ${username}
        this.order = order // 顺序
        this.result = "" // 结果 contentType=1 有效 0时 result=content dd
        
    }
    
}
export default Iteam