import defaultConfig from "../abook/assets/shareBookSource.json" assert {type: "json"};
import {detectQueryType} from "../abook/core/common.js";
import jp from 'jsonpath';
import fs from 'fs'

let arrjson = []
let arrxpath = []
let arrother = []

function write(data,path){
    let re = JSON.stringify(data)
    fs.writeFileSync(path,re)
}

for (let item of defaultConfig){
    console.log(item)
    if(!Object.hasOwn(item,'ruleSearch')){
        arrother.push(item)
        continue
    }
    if(!Object.hasOwn(item.ruleSearch,'bookList')){
        arrother.push(item)
        continue
    }
    let re = detectQueryType(item.ruleSearch.bookList)
    if (re === 'JSONPath')   {
        arrjson.push(item)
    }else if (re === 'XPath'){
        arrxpath.push(item)
    }else if (re === 'Unknown'){
        if(!Object.hasOwn(item,'ruleExplore')){
            arrother.push(item)
            continue
        }
        if(!Object.hasOwn(item.ruleExplore,'bookList')){
            arrother.push(item)
            continue
        }
        let re2 = detectQueryType(item.ruleExplore.bookList)
        if (re2 === 'JSONPath')   {
            arrjson.push(item)
        }else if (re2 === 'XPath'){
            arrxpath.push(item)
        }else if (re === 'Unknown'){
            arrother.push(item)
        }
    }
}

// console.log(re)
write(arrjson,'./arrjson.json')
write(arrxpath,'./arrxpath.json')
write(arrother,'./arrother.json')