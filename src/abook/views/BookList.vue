<script setup>
import {Body, getClient, ResponseType} from '@tauri-apps/api/http';
import {onMounted, ref} from "vue";
import selectAll from "css-select"
import {getIteams, render} from '../core/openRead.js'
import {getBooksList,isHttp} from '../core/openReadCss.js'
import {doSearchUrl, makeFormBody} from "../core/common.js";


import yueyou from "../assets/69.json";

let bookList  = ref([])
let categorys = ref([])
let dialogSourceVisible = ref(false)
let currentSource = ref(yueyou.bookSourceUrl)
let sources = ref([])

let search = ref('')


async function getData() {
  let header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36'
  }
  categorys.value = getIteams(yueyou.exploreUrl)
  console.log(categorys.value)
  // let urlcate = render(categorys.value[0].url, {page:1})
  // console.log(urlcate)
  let url = yueyou.bookSourceUrl
  // if(isHttp(urlcate)){
  //   url = urlcate
  // }



  // let res = await axios.get(url);
  // let res2 = await fetch(url,{
  //   method: 'GET',
  // responseType: ResponseType.Text,
  //   timeout: 10,
  //   header : header,
  // });
  // console.log(res2)
  const client = await getClient();
  const response = await client.get(url,{
    timeout: 30,
    headers: header,
    responseType: ResponseType.Text
  });
  console.log(response)
  bookList.value = getBooksList(response.data,yueyou.ruleExplore)

}

async function doSearch(){
  let header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36'
  }
  let option = {
    timeout: 5,
    headers: header,
    responseType: ResponseType.Text,
    method: 'GET',
  }
  console.log(search.value)
  let url = yueyou.searchUrl
  url = url.replace('{{key}}', search.value);
  url = url.replace('{{page}}', 1);
  let urlObj = doSearchUrl(url)

  // url = render(urlObj.url, {key:search.value})
  // console.log(url)

  Object.keys(urlObj).forEach((key) => {
    if(key === 'url'){
      option[key] = urlObj[key]
    }else if(key === 'body') {
      let bodyDtr = render(urlObj[key], {key:search.value})
      let form = makeFormBody(bodyDtr)
      option[key] = Body.form(form)
    }else if (key === 'method'){
      option[key] = urlObj[key]
    }else if (key === 'charset'){

    }
    else{
      header[key] = urlObj[key]
    }

  } )

  console.log(option)


  const client = await getClient();
  const response = await client.request(option);
  console.log(response.data)
  //
  bookList.value = getBooksList(response.data,yueyou.ruleExplore)


}

function getCategory(cate){

  let url = yueyou.bookSourceUrl


}


onMounted(async () => {
  getData()
});

</script>

<template>
  <div class="search">
    <el-row>
      <el-col :span="3">
        <a @click="dialogSourceVisible = true"> ff </a>
      </el-col>

      <el-col :span="6" :offset="11">
        <el-input placeholder="请输入影片内容" v-model="search"/>
      </el-col>
      <el-col :span="1">
        <el-button @click="doSearch" type="primary" round>搜索</el-button>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogSourceVisible" title="选择源" width="800">

    <el-radio-group>
      <div @click="changeSource(item)" v-for="(item,index) in sources">
        <el-radio :label="String(index)"  size="large" border>{{ item.name }}</el-radio>
      </div>

    </el-radio-group>
  </el-dialog>
  <div class="category">
<!--    <Button severity="info" :label="item.name" v-for="item in categorys" @click="getCategory(item)" v-if="categorys.length > 0" />-->
  </div>
  <div class="book-container">
    <RouterLink v-for="item in bookList" :to="'/detail/' + item.id" v-if="bookList.length > 0">
      <div class="book"  :key="item.id">

        <img :src="item.coverUrl" alt="Book 1">
        <div class="book-title">{{ item.name}}</div>
        <div class="book-author">{{ item.author}}</div>
        <div class="book-description">{{ item.intro}}</div>
      </div>
    </RouterLink>

    <!-- 添加更多书籍 -->
  </div>
</template>

<style scoped>
/* 样式可以根据需求自行修改 */
.book-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.book {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
}
.book img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.book-title {
  font-weight: bold;
  margin: 5px 0;
}
.book-author {
  color: #666;
  margin-bottom: 5px;
}
.book-description {
  font-size: 0.9em;
  line-height: 1.4;
}
</style>