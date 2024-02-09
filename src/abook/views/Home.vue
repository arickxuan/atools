<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import jp from 'jsonpath';
import {gatJsonPathList, getIteams, render} from '../core/openRead.js'


import vista from "../assets/vista.json";

let bookInfos  = ref([])


async function getData() {
   let urls = getIteams(vista.exploreUrl)
  console.log(urls)
  let url = render(urls[0].url, {page:1})
   console.log(url)
  let res = await axios.get(url);
   let list = jp.query(res.data,vista.ruleSearch.bookList)
  console.log(res.data)
  // let list2 = JSONPath({path: vista.ruleSearch.bookList,json: res.data})
  // console.log(list2);

  bookInfos.value  =gatJsonPathList(list[0],vista.ruleSearch)
  console.log(bookInfos.value )

}


onMounted(async () => {
  getData()
});

</script>

<template>
  <h2> home</h2>
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