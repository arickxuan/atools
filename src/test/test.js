import defaultConfig from "../assets/config.json" assert {type: "json"};

import jp from 'jsonpath';

let path = "$.pic"
var re = jp.query(defaultConfig, path);


// let re =query(defaultConfig,path)

console.log(re)