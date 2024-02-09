import jp from "jsonpath";


function  getIteams(urls){
    let page = 1
    let res = []
    urls = urls.split("\n")

    for (let url of urls){
        page += 1
        let temp = url.split("::")
        let iteam = {name:temp[0],url:temp[1]}
        res.push(iteam)
    }
    return res
}

function getIdVals(str) {
    const regex = /{{\s*([^}\s]+)\s*}}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
        matches.push(match[1].trim());
    }
    return matches;
}

function renderContent(data,souerce){
    let idVals = getIdVals(data)
    let idstrs = []
    for (let idVal of idVals){
        let idStr = jp.query(souerce,idVal)
        idstrs.push(idStr)
    }
    // console.log(idstrs)
    const obj = {};
    if (idVals.length === idstrs.length){
        idVals.forEach((item,index) => {
            obj[item] = idstrs[index]  //TODO  保证顺序相同
        })
    }


    let re = render(data, obj)
    return re
}

function render(template, data) {
    let  tc = ""
    let len = Object.keys(data).length-1
    let isEavl = true
    Object.keys(data).forEach(function(value, index) {
        // console.log(`Index: ${index}, Value: ${value}`);
        if (index === len) {
            tc += value.trim()
        }else{
            tc += value.trim() + "|"
        }
        if (value.includes("$")) {
            isEavl = false
        }
    });
    tc = tc + ""
    if (isEavl) {
        return renderTemplate1(template,data, tc)
    }else{
        return renderTemplate2(template, data)
    }

}

function  renderTemplate1(template,data, re) {
    let regex = new RegExp(re, 'g');
    // 匹配模板中的变量和表达式
    return template.replace(/{{\s*([^}\s]+)\s*}}/g, function(match, expression) {
        // 去除首尾空格
        expression = expression.trim();

        // 将表达式中的变量替换为对应的值
        let value = eval(expression.replace(regex, function(match) {
            console.log(match)
            return `data['${match.trim()}']`;
        }));

        // 返回替换后的值
        return value;
    });

}

function renderTemplate2(template, data) {
    // 匹配模板中的变量，例如 {{ varName }}
    const regex = /{{\s*([^}\s]+)\s*}}/g;

    // 使用 replace 方法替换模板中的变量
    return template.replace(regex, (match, key) => {
            return data[key.trim()] || "";
    });
}

let getJsonPath = (json,listInfo)=>{
    let re = {}
    let keys = Object.keys(listInfo)
    for (let key of keys){
        try {
            re[key] = jp.query(json,listInfo[key])
        }catch (e) {
            re[key] = listInfo[key]
        }
    }
    return re

}

let gatJsonPathList = (json,listInfo)=>{
    let re = [];
    if (json.length < 1){
        return re
    }
    json.forEach((item)=>{
        re.push(getJsonPath(item,listInfo))
    })
    return re;
}

export {
    getIteams,
    render,
    renderContent,
    getIdVals,
    gatJsonPathList
}