export function detectQueryType(query) {

    if (typeof query !== 'string') {
        return 'Unknown';
    }
    // 检查是否以 / 或 // 开头，如果是，则是 XPath
    if (query.startsWith('/') || query.startsWith('//')) {
        return 'XPath';
    }

    // 检查是否以 $ 开头，如果是，则是 JSONPath
    if (query.startsWith('$')) {
        return 'JSONPath';
    }

    // 检查是否包含 HTML 元素名称、类名、ID 或属性选择器，如果是，则是 CSS 选择器
    if (/^[a-zA-Z#.[\]]/.test(query)) {
        return 'CSS';
    }

    // 默认返回未知类型
    return 'Unknown';
}

export function doSearchUrl(url){
    var arr = url.split(",")
    let obj = {}
    if (arr.length < 2){
        return {url:url}
    }
    try{
        obj = JSON.parse(url.slice(url.indexOf(",") + 1));
    }catch (e) {
        console.log(e)
        obj = {}
    }
    obj["url"] = arr[0]
    return obj
}

export function  makeFormBody(str){
    let arr = str.split('&')
    let obj = {}
    for (const item of arr) {
        let arr2 = item.split('=')
        obj[arr2[0]] = arr2[1]

    }
    return obj
}

function myJsonParse(text, reviver) {
    // 通过eval函数可以把字符串转成对象
    text = eval("(" + text + ")")

    // 内部函数
    function objParse(holder, key) {
        let k;
        let v;
        let value = holder[key];
        // 判断值是不是对象
        if (value && typeof value === "object") {
            // 对象遍历
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    // 递归调用，接受执行reviver函数后的值
                    v = objParse(value, k);
                    // 如果不是undefined，则把最新的值赋值给k
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        // 如果是undefined，则删除该属性，这也就为什么可能过滤属性的根本原因了
                        delete value[k];
                    }
                }
            }
        }
        // 返回执行reviver函数后的值
        return reviver.call(holder, key, value);
    }


    // 验证是否有传reviver且reviver是否是函数
    return (reviver && typeof reviver === "function")
        ? objParse({"": text}, "")
        : text;
}