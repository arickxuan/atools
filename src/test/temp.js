const token_url = 'https://edge.microsoft.com/translate/auth';
let text = 'Hello, world!';
let requestPath= 'https://wxapp.translator.qq.com'
let url = `${requestPath}/api/translate?source=auto&target=auto&sourceText=${text}&platform=WeChat_APP&guid=oqdgX0SIwhvM0TmqzTHghWBvfk22&candidateLangs=en|zh`
url = encodeURIComponent(url);    
console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
let token = await fetch(token_url, {
    method: 'GET',
    headers: {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
    },
    responseType: 2,
});

// console.log(token.ok);
// console.log(await token.text());