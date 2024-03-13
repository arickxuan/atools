"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
import  axios_1   from "axios";
import cheerio_1 from "cheerio";
const pageSize = 10;
function formatMusicItem(_) {
    return {
        id: _.songId,
        title: (0, cheerio_1.load)(_.songName).text(),
        artist: _.singer,
        singerId: _.singerId,
        album: _.typeName,
        type: _.type,
        typeName: _.typeName,
        typeEname: _.typeEname,
    };
}
function formatAlbumItem(_) {
    return {
        id: _.songListId,
        artist: _.userName,
        title: (0, cheerio_1.load)(_.title).text(),
        artwork: _.pictureUrl,
        description: _.content,
        date: _.createTime,
    };
}
function formatArtistItem(_) {
    return {
        id: _.id,
        name: (0, cheerio_1.load)(_.nickName).text(),
        fans: _.fans,
        avatar: _.pictureUrl,
        description: _.description,
        worksNum: _.totalSong,
    };
}
const searchHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    Host: "search.5sing.kugou.com",
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Referer: "http://search.5sing.kugou.com/home/index",
};
async function searchMusic(query, page) {
    const res = (await axios_1.default.get("http://search.5sing.kugou.com/home/json", {
        headers: searchHeaders,
        params: {
            keyword: query,
            sort: 1,
            page,
            filter: 0,
            type: 0,
        },
    })).data;
    const songs = res.list.map(formatMusicItem);
    return {
        isEnd: res.pageInfo.cur >= res.pageInfo.totalPages,
        data: songs,
    };
}
async function searchAlbum(query, page) {
    const res = (await axios_1.default.get("http://search.5sing.kugou.com/home/json", {
        headers: searchHeaders,
        params: {
            keyword: query,
            sort: 1,
            page,
            filter: 0,
            type: 1,
        },
    })).data;
    const songs = res.list.map(formatAlbumItem);
    return {
        isEnd: res.pageInfo.cur >= res.pageInfo.totalPages,
        data: songs,
    };
}
async function searchArtist(query, page) {
    const res = (await axios_1.default.get("http://search.5sing.kugou.com/home/json", {
        headers: searchHeaders,
        params: {
            keyword: query,
            sort: 1,
            page,
            filter: 1,
            type: 2,
        },
    })).data;
    const songs = res.list.map(formatArtistItem);
    return {
        isEnd: res.pageInfo.cur >= res.pageInfo.totalPages,
        data: songs,
    };
}
let fcEnd = false;
let ycEnd = false;
let bzEnd = false;
async function getArtistMusicWorks(artistItem, page) {
    if (page === 1) {
        fcEnd = false;
        ycEnd = false;
        bzEnd = false;
    }
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Host: "service.5sing.kugou.com",
        Origin: "http://5sing.kugou.com",
        Pragma: "no-cache",
        Referer: "http://5sing.kugou.com/",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    };
    let data = [];
    if (!fcEnd) {
        const res = (await axios_1.default.get("http://service.5sing.kugou.com/user/songlist", {
            headers,
            params: {
                userId: artistItem.id,
                type: "fc",
                pageSize,
                page,
            },
        })).data;
        if (res.count <= page * pageSize) {
            fcEnd = true;
        }
        data = data.concat(res.data.map((_) => ({
            id: _.songId,
            artist: artistItem.name,
            title: _.songName,
            typeEname: "fc",
            typeName: "缂傚牐顕ч弫锟�",
            type: _.songType,
            album: "缂傚牐顕ч弫锟�",
        })));
    }
    if (!ycEnd) {
        const res = (await axios_1.default.get("http://service.5sing.kugou.com/user/songlist", {
            headers,
            params: {
                userId: artistItem.id,
                type: "yc",
                pageSize,
                page,
            },
        })).data;
        if (res.count <= page * pageSize) {
            ycEnd = true;
        }
        data = data.concat(res.data.map((_) => ({
            id: _.songId,
            artist: artistItem.name,
            title: _.songName,
            typeEname: "yc",
            typeName: "闁告鍠庨弫锟�",
            type: _.songType,
            album: "闁告鍠庨弫锟�",
        })));
    }
    if (!bzEnd) {
        const res = (await axios_1.default.get("http://service.5sing.kugou.com/user/songlist", {
            headers,
            params: {
                userId: artistItem.id,
                type: "bz",
                pageSize,
                page,
            },
        })).data;
        if (res.count <= page * pageSize) {
            bzEnd = true;
        }
        data = data.concat(res.data.map((_) => ({
            id: _.songId,
            artist: artistItem.name,
            title: _.songName,
            typeEname: "bz",
            typeName: "濞村吋娼欓〃锟�",
            type: _.songType,
            album: "濞村吋娼欓〃锟�",
        })));
    }
    return {
        isEnd: fcEnd && ycEnd && bzEnd,
        data,
    };
}
async function getArtistWorks(artistItem, page, type) {
    if (type === "music") {
        return getArtistMusicWorks(artistItem, page);
    }
}
const headers = {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Host: "service.5sing.kugou.com",
    Referer: "http://5sing.kugou.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
};
async function getLyric(musicItem) {
    const res = (await axios_1.default.get("http://5sing.kugou.com/fm/m/json/lrc", {
        headers,
        params: {
            songId: musicItem.id,
            songType: musicItem.typeEname,
        },
    })).data;
    return {
        rawLrc: res.txt,
    };
}
async function getAlbumInfo(albumItem) {
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        Host: "service.5sing.kugou.com",
        Origin: "http://5sing.kugou.com",
        Referer: "http://5sing.kugou.com/",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    };
    const res = (await axios_1.default.get("http://service.5sing.kugou.com/song/getPlayListSong", {
        headers: headers,
        params: {
            id: albumItem.id,
        },
    })).data;
    return {
        musicList: res.data.map((_) => ({
            id: _.ID,
            typeEname: _.SK,
            title: _.SN,
            artist: _.user.NN,
            singerId: _.user.ID,
            album: albumItem.title,
            artwork: albumItem.artwork,
        })),
    };
}
async function getTopLists() {
    return [
        {
            title: "闁圭儤甯熼、鎴濐潡閿燂拷",
            data: [
                {
                    id: "/",
                    title: "闁告鍠庨崹閬嶆閸忓懐顔囨慨鎺炴嫹",
                    description: "闁哄牃鍋撻柣鎴弮濡剟鎯冮崟顐㈡枾闁告帗鐩悡鑸电▕閹邦厾鎽冮柡鍥у级椤拷",
                    typeEname: 'yc',
                    typeName: '闁告鍠庨弫锟�'
                },
                {
                    id: "/fc",
                    title: "缂傚牐顕ч弫閬嶆閸忓懐顔囨慨鎺炴嫹",
                    description: "闁哄牃鍋撻柣鎴弮濡剟鎯冮崟顒傘偊閻炴稑鏈悺鏇㈠即閼碱剛鍊抽柛鐐堕哺鐢挾鎮伴敓锟�",
                    typeEname: 'fc',
                    typeName: '缂傚牐顕ч弫锟�'
                },
                {
                    id: "/bz",
                    title: "濞村吋娼欓〃鏃堟閸忓懐顔囨慨鎺炴嫹",
                    description: "闁瑰吋绮庨崒銊╁嫉閳ь剚寰勫杈ㄧ暠濞村吋娼欓〃鏃堝箳閹烘洦鏀�",
                    typeEname: 'bz',
                    typeName: '濞村吋娼欓〃锟�'
                },
            ],
        },
    ];
}
async function getTopListDetail(topListItem) {
    const rawHtml = (await axios_1.default.get(`http://5sing.kugou.com/top${topListItem.id}`)).data;
    const $ = (0, cheerio_1.load)(rawHtml);
    const tableRows = $('div.rank_view tbody').children('tr');
    const result = tableRows.slice(1).map((index, element) => {
        const el = $(element);
        const title = el.find('td.r_td_3').text().trim();
        const artistItem = el.find('td.r_td_4');
        const artist = artistItem.text();
        const singerId = $(artistItem).find('a').attr('href').match(/http:\/\/5sing\.kugou\.com\/(\d+)/)[1];
        const id = el.find('td.r_td_6').children().first().attr('href').match(/http:\/\/5sing\.kugou\.com\/.+?(\d+)\.html/)[1];
        return {
            title,
            artist,
            singerId,
            id,
            typeEname: topListItem.typeEname,
            typeName: topListItem.typeName,
            type: topListItem.typeEname,
            album: topListItem.typeName
        };
    }).toArray();
    return {
        ...topListItem,
        musicList: result.filter(_ => _.id),
    };
}
export {
    platform: "5sing",
    version: "0.1.0",
    order: 11,
    srcUrl: "http://adad23u.appinstall.life/dist/5sing/index.js",
    cacheControl: "no-cache",
    async search(query, page, type) {
        if (type === "music") {
            return await searchMusic(query, page);
        }
        if (type === "album") {
            return await searchAlbum(query, page);
        }
        if (type === "artist") {
            return await searchArtist(query, page);
        }
    },
    async getMediaSource(musicItem, quality) {
        if (quality === "super") {
            return;
        }
        const headers = {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Host: "service.5sing.kugou.com",
            Referer: "http://5sing.kugou.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
        };
        const res = (await axios_1.default.get("http://service.5sing.kugou.com/song/getsongurl", {
            headers,
            params: {
                songid: musicItem.id,
                songtype: musicItem.typeEname,
                from: "web",
                version: "6.6.72",
                _: Date.now(),
            },
        })).data;
        const data = JSON.parse(res.substring(1, res.length - 1)).data;
        if (quality === "standard") {
            return {
                url: data.squrl ?? data.squrl_backup,
            };
        }
        else if (quality === "high") {
            return {
                url: data.hqurl ?? data.hqurl_backup,
            };
        }
        else {
            return {
                url: data.lqurl ?? data.lqurl_backup,
            };
        }
    },
    getAlbumInfo,
    getLyric,
    getArtistWorks,
    getTopLists,
    getTopListDetail
};
