<script setup>
import {getClient, ResponseType} from '@tauri-apps/api/http';
import {onMounted, ref} from "vue";
import selectAll from "css-select"
import {getIteams, render} from '../core/openRead.js'


import yueyou from "../assets/yueyou.json";

let bookInfos  = ref([])
let categorys = ref([])

let bookList = ref([])

async function getData() {
  let header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36'
  }
  let urls = getIteams(yueyou.exploreUrl)
  console.log(urls)
  let urlcate = render(urls[0].url, {page:1})
  console.log(urlcate)

  // console.log(yueyou.bookSourceUrl)
  // categorys.value = JSON.parse( yueyou.exploreUrl)
  let url = yueyou.bookSourceUrl

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
        // the expected response type
        responseType: ResponseType.Text
  });
  // let list = jp.query(res.data,yueyou.ruleSearch.bookList)
  console.log(response.data)
  bookList.value = selectAll('div',response.data)
  console.log(bookList.value)
  // let list2 = JSONPath({path: vista.ruleSearch.bookList,json: res.data})
  // console.log(list2);
  //
  // bookInfos.value  =gatJsonPathList(list[0],vista.ruleSearch)
  // console.log(bookInfos.value )

}

function getCategory(cate){


}


onMounted(async () => {
  getData()
});

</script>

<template>
  <h2> home</h2>
  <div class="category">
    <ul>
      <li v-for="item in categorys" @click="getCategory(item)" v-if="categorys.length > 0">{{ item.title }}  </li>
    </ul>
  </div>
  <div class="book-container">
    <RouterLink v-for="item in bookInfos" :to="'/detail/' + item.id" v-if="bookInfos.length > 0">
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