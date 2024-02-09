<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import DPlayer from 'dplayer';
// import { storeToRefs } from 'pinia'
// import { useCurrentMoviesStore } from '../store/movies.js'
// const store = useCurrentMoviesStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
// const { name, doubleCount } = storeToRefs(store)

const props = defineProps(['url', 'img', 'content', 'chapter'])
let dp = ref({})

const route = useRoute();

const router = useRouter()

let urls = ref([])

const activeIndex = ref('1')



async function getData() {
  urls.value = getUrls(props.url)
  activeIndex.value = urls.value[0].name
}

const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  console.log(key, keyPath)
}

function choiceVideo(index) {
  // router.replace({
  //   // path: '/movies/detail/' + item.vod_id,
  //   name: 'detailMovie',
  //   params: { id: route.params.id +1},
  //   query: {
  //     url: props.url,
  //     img: props.img,
  //     content: props.content,
  //     chapter: index
  //   }
  // })
  dp.value.switchVideo(
      {
        url: urls.value[index].url,
        // pic: props.img,
        // thumbnails: 'second.jpg',
      },
  );
}

function getPlayer() {
  let index = 0
  if (props.chapter == undefined) {
    index = 0
  } else {
    index = Number(props.chapter)
  }
  dp.value = new DPlayer({
    container: document.getElementById('dplayer'),
    playbackSpeed: [1.0, 1.25, 1.5, 1.75,2.0, 2.5, 3.0],
    video: {
      // pic: props.img,
      url: urls.value[index].url, //'https://leshiyuncdn.ahjunqin.top/20240129/r4fKkMtr/2000kb/hls/index.m3u8',
      type: 'auto',
    },
    pluginOptions: {
      hls: {
        // hls config
      },
    },
    contextmenu: [
      {
        text: 'm3u8: '+urls.value[index].url,
        link: urls.value[index].url,
      },
      {
        text: 'custom2',
        click: (player) => {
          console.log(player);
        },
      },
    ],
    highlight: [
      {
        time: 60,
        text: '第60秒',
      },
      {
        time: 90,
        text: '1.5分钟',
      },
      {
        time: 120,
        text: '2分钟',
      },
    ],
  });
  return dp

}

onMounted(async () => {
  console.log(route.params.id);
  console.log("detail");
  console.log(typeof props.chapter);

  await getData();
  getPlayer();


});

onUnmounted(() => {

})

let getUrls = (url) => {
  console.log(url)
  let urls = []
  url.split("$$$").forEach((items, index) => {
    items.split("#").forEach((item, index) => {
      let arr = item.split("$")
      if (arr[1].includes(".m3u8")) {
        urls.push({"name": arr[0], "url": arr[1]})
      }

    })
  })
  return urls
}


</script>

<template>
  <div class="player">
    <div id="dplayer"></div>
  </div>

  <!--  <div v-for="(item,index) in urls" :key="item.name">-->
  <!--    <button @click="choiceVideo(index)">{{ item.name }}</button>-->
  <!--  </div>-->

  <div class="menu">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item @click="choiceVideo(index)" :index="item.name" v-for="(item,index) in urls">
        {{ item.name }}
      </el-menu-item>

    </el-menu>
  </div>
</template>

<style scoped>
.player {
  min-width: 400px;
}

.vjs_video_1693-dimensions {
  //width: 100%;
  //height: 100%;
}
</style>