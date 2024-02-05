function extractVariable(str) {
    const regex = /\${\s*(\w+)\s*}/g;
    const matches = str.match(regex);
    return matches ? matches.map(match => match.replace(/\${|}/g, '').trim())[0] : [];
}

function getVariableGroup(arr, type) {
    let re = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].contentType == type) {
            re.push(arr[i])
        }
    }
    if (type == 1) {
        re.sort(function (a, b) {
            return a.order - b.order;
        });
    }
    return re;
}

async function apply(vArr, scriptIteam) {
    let str = "";
    for (let i = 0; i < vArr.length; i++) {
        if (vArr[i].templateName && vArr[i].content) {
            if (vArr[i].contentType == 0) {
                str += "let " + extractVariable(vArr[i].templateName) + " = '" + vArr[i].content + "';";
            } else {
                str += "let " + extractVariable(vArr[i].templateName) + " = '" + vArr[i].result + "';";
            }
        }
    }
    let sc = str + scriptIteam.content;
    // console.log_init(sc);
    let result = await eval(sc);

    // console.log_init(result); // 输出 '异步操作的结果'
    scriptIteam.result = result.data;
    // if (scriptIteam.timeType == 1) {
    scriptIteam.lastTime = Math.floor(Date.now() / 1000);
    // }
    vArr.push(scriptIteam);

    return vArr;

}

export {
    extractVariable,
    getVariableGroup,
    apply
}