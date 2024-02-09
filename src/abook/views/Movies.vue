<script setup>
import {onMounted, ref} from "vue";
import {fetch} from '@tauri-apps/api/http';
import jp from 'jsonpath';
import {useRoute, useRouter} from 'vue-router'
// import  { useCurrentMoviesStore} from "../store/movies.js";

const router = useRouter()
const route = useRoute()

// const store = useCurrentMoviesStore()
const {query} = route

let category = ref([])
let subCategory = ref(0)
let movieInfos = ref([])
let page = ref(1)

let dialogSourceVisible = ref(false)

let baseUrl = 'http://cj.ffzyapi.com/api.php/provide/vod/?'
// let baseUrl = 'https://api.1080zyku.com/inc/api_mac10.php?ac=list&'

let sources = ref([
  {name:"非非",url:'http://cj.ffzyapi.com/api.php/provide/vod/?'},
  {name: "1080zyku", url: 'https://api.1080zyku.com/inc/api_mac10.php?'},
])

let currentSource = ref(sources.value[0])

let search = defineModel({default: ''})

function toDetail(item) {
  // store.iteam = item
  console.log(item)
  router.push({
    // path: '/movies/detail/' + item.vod_id,
    name: 'detailMovie',
    params: {id: item.vod_id},
    query: {
      url: item.vod_play_url,
      img: item.vod_pic,
      content: item.vod_content
    }
  })
}

async function getData() {

  const response = await fetch(currentSource.value.url + 'ac=list', {
    method: 'GET',
    timeout: 30,
  });
  console.log(response)
  // const response2 = await fetch('https://api.1080zyku.com/inc/api_mac10.php?ac=list', {
  //   method: 'GET',
  //   timeout: 30,
  // });
  // console.log(response2)

  let ids = jp.query(response.data, '$.list[*].vod_id')
  let arrCategory = jp.query(response.data, '$.class[?(@.type_pid==0)]')
  if (arrCategory.length >0){
    category.value = arrCategory
  }else{
    category.value = jp.query(response.data, '$.class[:6]')
  }
  console.log(category.value)

  const result = ids.join(','); // 使用逗号和空格连接数组元素

  const response3 = await fetch(currentSource.value.url + 'ac=detail&ids=' + result, {
    method: 'GET',
    timeout: 30,
  });
  // console.log(response3)

  movieInfos.value = response3.data.list


}

function changeSource(item){
  currentSource.value = item
  dialogSourceVisible.value = false
  getData()
}

async function doSearch() {
  console.log(search.value)
  const response = await fetch(currentSource.value.url + 'ac=list&wd=' + search.value, {
    method: 'GET',
    timeout: 30,
  });
  let ids = jp.query(response.data, '$.list[*].vod_id')
  // console.log(ids)

  const result = ids.join(','); // 使用逗号和空格连接数组元素

  const response3 = await fetch(currentSource.value.url + 'ac=detail&ids=' + result, {
    method: 'GET',
    timeout: 30,
  });
  movieInfos.value = response3.data.list
}

async function changeCategory(tid) {
  console.log(tid)
  const response = await fetch(currentSource.value.url + 'ac=list&t=' + tid + '&pg=' + page.value, {
    method: 'GET',
    timeout: 30,
  });
  console.log(response.data)
  let ids = jp.query(response.data, '$.list[*].vod_id')
  console.log(ids)

  const result = ids.join(','); // 使用逗号和空格连接数组元素

  const response3 = await fetch(currentSource.value.url + 'ac=detail&ids=' + result, {
    method: 'GET',
    timeout: 30,
  });
  movieInfos.value = response3.data.list
}


onMounted(() => {
  console.log("mounted movies")
  getData();
})
</script>

<template>
  <div class="search">
    <el-row>
      <el-col :span="3">
        <a @click="dialogSourceVisible = true"> {{ currentSource.name }} </a>
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
  <div class="catgory">
    <el-button type="primary" v-for="item in category"
               @click="changeCategory(item.type_id)" v-if="category.length > 0" :key="item.type_id">
      {{ item.type_name }}
    </el-button>


  </div>

  <div class="book-container">

    <div v-for="item in movieInfos" v-if="movieInfos.length > 0">  <!--  //@click="toDetail(item)"-->
      <div class="book" @click="toDetail(item)" :key="item.vod_id">

        <img :src="item.vod_pic" alt="Book 1">
        <div class="book-title">{{ item.vod_name }}</div>
        <div class="book-author">{{ item.vod_remarks }}</div>
        <!--        <div class="book-description">{{ item.vod_content }}</div>-->
      </div>
    </div>

    <!-- 添加更多书籍 -->
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped>
.catgory {
  margin: 20px auto;
}
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