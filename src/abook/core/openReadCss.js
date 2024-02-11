import {load} from 'cheerio';

export function getBooksList(html,rules){
    const $ = load(html);

    let bookList = $(rules.bookList)
    console.log(bookList)

    let list = []

    bookList.each(function(index, element) {
        let obj = {}
        Object.keys(rules).forEach((rule) => {
            let tag = splitRule(rules[rule])
            if (rule === "author" || rule === "intro" || rule === "name") {

                // console.log(re)
                obj[rule] = $(element).find(tag).text()
            }
            if (rule === "bookUrl"){
                obj[rule] = $(element).find(tag).attr("href")
            }
            if (rule ==="coverUrl"){
                obj[rule] = $(element).find(tag).attr("src")
            }

        })
        list.push(obj)
    })

    return list
}

function  splitRule(rule){
    return rule.split("@")[0]
}

export function isHttp(url){
    const regex = /^(https?|http):\/\//;
// 使用 test 方法进行匹配
    return regex.test(url);
}