//@ts-ignore
import { fetch } from '@tauri-apps/plugin-http';
//@ts-ignore
// import { Body } from '@tauri-apps/plugin-http';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';


function getRandomNumber() {
    const rand = Math.floor(Math.random() * 99999) + 100000;
    return rand * 1000;
}

function getICount(translate_text: string) {
    return translate_text.split('i').length - 1;
}

function getTimeStamp(iCount: number) {
    const ts = Date.now();
    if (iCount !== 0) {
        iCount = iCount + 1;
        return ts - (ts % iCount) + iCount;
    } else {
        return ts;
    }
}
export async function translateGoogle(text: string, from: string, to: string, options = {}): Promise<string> {
    const { config } = options;

    let translateConfig =  {};
    if (config !== undefined) {
        translateConfig = config;
    }

    let { custom_url } = translateConfig;

    if (custom_url === undefined || custom_url === '') {
        custom_url = 'https://translate.google.com';
    }
    if (!custom_url.startsWith('http')) {
        custom_url = 'https://' + custom_url;
    }

    let res = await fetch(
        `${custom_url}/translate_a/single?dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t`,
        {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            query: {
                client: 'gtx',
                sl: from,
                tl: to,
                hl: to,
                ie: 'UTF-8',
                oe: 'UTF-8',
                otf: '1',
                ssel: '0',
                tsel: '0',
                kc: '7',
                q: text,
            },
        }
    );
    if (res.ok) {
        let result = res.data;
        // 词典模式
        if (result[1]) {
            let target = { pronunciations: [], explanations: [], associations: [], sentence: [] };
            // 发音
            if (result[0][1][3]) {
                target.pronunciations.push({ symbol: result[0][1][3], voice: '' });
            }
            // 释义
            for (let i of result[1]) {
                target.explanations.push({
                    trait: i[0],
                    explains: i[2].map((x) => {
                        return x[0];
                    }),
                });
            }
            // 例句
            if (result[13]) {
                for (let i of result[13][0]) {
                    target.sentence.push({ source: i[0] });
                }
            }
            return target;
        } else {
            // 翻译模式
            let target = '';
            for (let r of result[0]) {
                if (r[0]) {
                    target = target + r[0];
                }
            }
            return target.trim();
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}

export async function translateDeepl(text: string, from: string, to: string): Promise<string> {
    const url = 'https://www2.deepl.com/jsonrpc';
    const rand = getRandomNumber();
    const body = {
        jsonrpc: '2.0',
        method: 'LMT_handle_texts',
        params: {
            splitting: 'newlines',
            lang: {
                source_lang_user_selected: from !== 'auto' ? from.slice(0, 2) : 'auto',
                target_lang: to.slice(0, 2),
            },
            texts: [{ text, requestAlternatives: 3 }],
            timestamp: getTimeStamp(getICount(text)),
        },
        id: rand,
    };

    console.log(body);

    let body_str = JSON.stringify(body);

    if ((rand + 5) % 29 === 0 || (rand + 3) % 13 === 0) {
        body_str = body_str.replace('"method":"', '"method" : "');
    } else {
        body_str = body_str.replace('"method":"', '"method": "');
    }
    console.log(body_str);
    let res = await fetch(url, {
        method: 'POST',
        body: body_str,
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.ok);
    if (res.ok) {
        let result = await res.json();
        console.log(result);
        if (result && result.result && result.result.texts) {
            console.log(result.result.texts[0].text);
            return result.result.texts[0].text.trim();
        } else {
            throw JSON.stringify(result);
        }
    } else {
        console.log(res.status);
        if (res.ok) {
            throw `Status Code: ${res.status}\n${res.text}`;
        } else {
            throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.text)}`;
        }
    }
}

export async function translateBing(text: string, from: string, to: string) : Promise<string> {
    const token_url = 'https://edge.microsoft.com/translate/auth';

    let token = await fetch(token_url, {
        method: 'GET',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42',
        },
        responseType: 2,
    });

    if (token.ok) {
        const url = 'https://api-edge.cognitive.microsofttranslator.com/translate';

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                accept: '*/*',
                'accept-language': 'zh-TW,zh;q=0.9,ja;q=0.8,zh-CN;q=0.7,en-US;q=0.6,en;q=0.5',
                authorization: 'Bearer ' + token.data,
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                pragma: 'no-cache',
                'sec-ch-ua': '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                Referer: 'https://appsumo.com/',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42',
            },
            query: {
                from: from,
                to: to,
                'api-version': '3.0',
                includeSentenceLength: 'true',
            },
            body: { type: 'Json', payload: [{ Text: text }] },
        });

        if (res.ok) {
            let result = res.data;
            if (result[0].translations) {
                return result[0].translations[0].text.trim();
            } else {
                throw JSON.stringify(result);
            }
        } else {
            throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
        }
    } else {
        throw 'Get Token Failed';
    }
}


export async function translateVoice(text: string, to: string, options = {}) {
    const { config } = options;

    let translateConfig =  {};
    if (config !== undefined) {
        translateConfig = config;
    }

    const { appid, secret } = translateConfig;

    const serviceVersion = '2020-06-01';
    const schema = 'https';
    const host = 'open.volcengineapi.com';
    const path = '/';
    const method = 'POST';

    let credentials = {
        ak: appid,
        sk: secret,
        service: 'translate',
        region: 'cn-north-1',
        session_token: '',
    };
    let body = {
        TargetLanguage: to,
        TextList: [text],
    };
    let bodyStr = JSON.stringify(body); // 传入的body是字符串化的json
    let body_hash = CryptoJS.SHA256(bodyStr).toString(CryptoJS.enc.Hex);

    let today = new Date();
    let format_date = today
        .toISOString()
        .replaceAll('-', '')
        .replaceAll(':', '')
        .replaceAll(/\.[0-9]*/g, '');

    const md = {
        /* meta data */ algorithm: 'HMAC-SHA256',
        credential_scope: '',
        signed_headers: '',
        date: format_date.slice(0, 8),
        region: credentials['region'],
        service: credentials['service'],
    };
    md['credential_scope'] = md['date'] + '/' + md['region'] + '/' + md['service'] + '/request';

    const headers = {
        /* request headers, sorted */ Authorization: '',
        'Content-Type': 'application/json',
        Host: host,
        'X-Content-Sha256': body_hash,
        'X-Date': format_date,
    };

    // 签名
    const signed_headers = {
        // key is lower case and sorted
        'content-type': 'application/json',
        host: host,
        'x-content-sha256': body_hash,
        'x-date': format_date,
    };

    let signed_str = '';
    let md_signed_headers = '';
    const signedHeaderKeys = Object.keys(signed_headers);
    for (let i = 0; i < signedHeaderKeys.length; i += 1) {
        signed_str += signedHeaderKeys[i] + ':' + signed_headers[signedHeaderKeys[i]] + '\n';
        md_signed_headers += signedHeaderKeys[i] + ';';
    }
    md['signed_headers'] = md_signed_headers.slice(0, -1);

    let norm_uri = path;
    let norm_query = 'Action=TranslateText&Version=' + serviceVersion;
    let canoncial_request =
        method +
        '\n' +
        norm_uri +
        '\n' +
        norm_query +
        '\n' +
        signed_str +
        '\n' +
        md['signed_headers'] +
        '\n' +
        body_hash;
    let hashed_canon_req = CryptoJS.SHA256(canoncial_request).toString(CryptoJS.enc.Hex);

    let kdate = CryptoJS.HmacSHA256(md['date'], secret);
    let kregion = CryptoJS.HmacSHA256(md['region'], kdate);
    let kservice = CryptoJS.HmacSHA256(md['service'], kregion);
    let signing_key = CryptoJS.HmacSHA256('request', kservice);

    let signing_str = md['algorithm'] + '\n' + format_date + '\n' + md['credential_scope'] + '\n' + hashed_canon_req;
    let sign = CryptoJS.HmacSHA256(signing_str, signing_key).toString(CryptoJS.enc.Hex);
    headers['Authorization'] =
        md['algorithm'] +
        ' Credential=' +
        appid +
        '/' +
        md['credential_scope'] +
        ', SignedHeaders=' +
        md['signed_headers'] +
        ', Signature=' +
        sign;

    // 发送请求
    let url = schema + '://' + host + path + '?' + 'Action=TranslateText&Version=' + serviceVersion;

    let res = await fetch(url, {
        method: method,
        headers: headers,
        body: { type: 'Text', payload: bodyStr },
    });

    if (res.ok) {
        let result = res.data;
        // 整理翻译结果并返回
        let translations = '';
        let { TranslationList } = result;
        if (TranslationList) {
            let cur = 0,
                last = 0;
            for (cur; cur < TranslationList.length; cur += 1) {
                if (cur > last) {
                    translations += '\n';
                }
                let curTranslation = TranslationList[cur];
                if (curTranslation['Translation']) {
                    translations += curTranslation['Translation'];
                }
                last = cur;
            }
            return translations.trim();
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}


export async function translateYandex(text: string, from: string, to: string) : Promise<string> {
    const url = 'https://translate.yandex.net/api/v1/tr.json/translate';
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        query: {
            id: uuidv4().replaceAll('-', '') + '-0-0',
            srv: 'android',
        },
        body: {
            "source_lang": from,
            "target_lang": to,
            "text": text,
        },
    });
    if (res.ok) {
        const result = await res.json();
        if (result.text) {
            return result.text[0];
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}

export async function tts(text: string, lang: string, options = {}) {
    const { config }  = options;

    let lingvaConfig = { requestPath: 'lingva.pot-app.com' };

    if (config !== undefined) {
        lingvaConfig = config;
    }

    let { requestPath } = lingvaConfig;
    if (!requestPath.startsWith('http')) {
        requestPath = 'https://' + requestPath;
    }
    const res = await fetch(`${requestPath}/api/v1/audio/${lang}/${encodeURIComponent(text)}`);

    if (res.ok) {
        let resault = await res.json();
        return resault['audio'];
    }
}