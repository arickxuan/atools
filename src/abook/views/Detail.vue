<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import jp from 'jsonpath';

import vista from "../assets/vista.json";
import {getIdVals, render, renderContent} from '../core/openRead.js';
import axios from "axios";

const props = defineProps(['id'])

const route = useRoute()

let chapterNames = ref([])
let chapterList = ref([])
let CurrentChapter = ref(0)
let content = ref('')

const drawer = ref(false)

async function getData() {
  let id = route.params.id
  //获取目录
  let url = render(vista.ruleSearch.bookUrl, {'$.id':id})
  console.log(url)
  let res = await axios.get(url);
  console.log(res.data)
  chapterList.value = jp.query(res.data, vista.ruleToc.chapterList)
  console.log(chapterList.value)

  for (let item of chapterList.value) {
    let dicName = jp.query(item, vista.ruleToc.chapterName)
    let idVals = getIdVals(vista.ruleToc.chapterUrl)
    let idstrs = []
    for (let idVal of idVals){
      let idStr = jp.query(item,idVal)
      idstrs.push(idStr)
    }
    const obj = {};
    if (idVals.length === idstrs.length){
      idVals.forEach((item,index) => {
        obj[item] = idstrs[index]  //TODO  保证顺序相同
      })
    }

    let contentUrl = render(vista.ruleToc.chapterUrl, obj)
    chapterNames.value.push({title:dicName[0],url:contentUrl})
  }
  console.log(chapterNames.value)
}

async function getContent(){
  //获取详情
  let url = chapterNames.value[CurrentChapter.value].url
  let res = await axios.get(url);
  console.log(res.data)
  content.value = renderContent(vista.ruleContent.content,res.data)
}

function changeChapter(item){
  CurrentChapter.value = Number(item)
  drawer.value = false
  getContent()
}

function next(){
  if(CurrentChapter.value +1 < chapterNames.value.length ){
    CurrentChapter.value +=1
    getContent()
  }
}

function nextTitle(){
  if(CurrentChapter.value +1 < chapterNames.value.length ){
    return chapterNames.value[CurrentChapter.value+1].title
  }
  return "无"
}

onMounted ( async () => {
  console.log(route.params.id );
  console.log("detail");
  await getData();
  await getContent();
});

</script>

<template>

  <el-button type="primary" @click="drawer = true">
    目录
  </el-button>

  <el-drawer class="menu" size="50%" v-model="drawer" direction="ltr" title="I am the title" :with-header="false">
    <ul>
      <li class="menuli" v-for="(item,index) in chapterNames" :key="item.title" @click="changeChapter(index)">{{ item.title }}</li>
    </ul>
  </el-drawer>

  <h2 v-if="chapterNames.length > 0"> {{ chapterNames[CurrentChapter].title }}</h2>

  <div class="content" v-html="content">

  </div>
  <div class="footer">
  <el-row>
    <el-col :span="4" :offset="20"><el-button type="primary" @click="next">下一篇</el-button></el-col>
  </el-row>
  <h4 v-if="chapterNames.length > 0"> {{ nextTitle() }}</h4>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped>
 .content {
   margin: 20px auto;
   padding: 20px;
 }
 .footer {
   margin: 40px auto;
   padding-bottom: 80px;
 }
 ul, ol {
   list-style-type: none;
 }

</style>