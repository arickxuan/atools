let str = "eeee,{\n  \"charset\": \"gbk\",\n  \"method\": \"POST\",\n  \"body\": \"searchkey={{key}}&searchtype=all\"\n}"
let arr = str.split(",")
let obj = JSON.parse(arr[1])
console.log(obj)


