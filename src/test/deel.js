import axios from 'axios';
// import { fetch, Body } from '@tauri-apps/api/http';
const date = Date.now();;
function getRandomNumber() {
  const rand = Math.floor(Math.random() * 99999) + 100000;
  return rand * 1000;
}

function getICount(translate_text) {
  return translate_text.split('i').length - 1;
}

function getTimeStamp(iCount) {
  const ts = Date.now();
  if (iCount !== 0) {
      iCount = iCount + 1;
      return ts - (ts % iCount) + iCount;
  } else {
      return ts;
  }
}

let tran = "how are you today?";

// let texts =  

let data2 = {
  "jsonrpc": "2.0",
  "method": "LMT_handle_texts",
  "params": {
    "splitting": "newlines",
    "lang": {
      "source_lang_user_selected": "auto",
      "target_lang": "ZH"
    },
    "texts": [{ "text": tran, requestAlternatives: 3 }],
    "timestamp": getTimeStamp(getICount(tran)),
  },
  "id": getRandomNumber()
};

const url = 'https://www2.deepl.com/jsonrpc';
    const rand = getRandomNumber();
    const body = {
        jsonrpc: '2.0',
        method: 'LMT_handle_texts',
        params: {
            splitting: 'newlines',
            lang: {
                source_lang_user_selected:  'auto',
                target_lang: "ZH",
            },
            texts: [{ tran, requestAlternatives: 3 }],
            timestamp: getTimeStamp(getICount(tran)),
        },
        id: rand,
    };

    let body_str = JSON.stringify(body);

    if ((rand + 5) % 29 === 0 || (rand + 3) % 13 === 0) {
        body_str = body_str.replace('"method":"', '"method" : "');
    } else {
        body_str = body_str.replace('"method":"', '"method": "');
    }


// console.log(date);

const config = {
  method: 'post',
  url: 'https://www2.deepl.com/jsonrpc',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  },
  data: body_str
};

console.log(body_str);

// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//     console.log("error");
//   });

