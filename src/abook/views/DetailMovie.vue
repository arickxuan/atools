<script setup>
import VideoPlayer from '../components/VideoPlayer.vue'
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import DPlayer from 'dplayer';
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
let currentIndex = 0
const url = ref('')
const changeVideoRef = ref('')

const videoOptions = ref()

// const index = ref(0)

var playerId = ref('my-video')
var player = ref({})


async function getData() {
  urls.value = getUrls(props.url)
  activeIndex.value = urls.value[0].name
}

const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  console.log(key, keyPath)
}

function choiceVideo(newIndex) {
  url.value = urls.value[newIndex].url
  changeVideoRef.value.changeSource(urls.value[newIndex].url)
  currentIndex = newIndex

}

// 定义父组件的方法
function nextVideo() {
  console.log('父组件的方法被调用:');
  if (currentIndex < urls.value.length) {
    changeVideoRef.value.changeSource(urls.value[currentIndex + 1].url)
    activeIndex.value = urls.value[currentIndex + 1].name
    currentIndex = currentIndex + 1
  } else {
    //
  }

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
    playbackSpeed: [1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0],
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
        text: 'm3u8: ' + urls.value[index].url,
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
  // getPlayer();
  currentIndex = 0
  if (props.chapter == undefined) {
    currentIndex = 0
  } else {
    currentIndex = Number(props.chapter)
  }
  let options = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.5, 1.75, 2, 2.5, 3],
    muted: false,
    language: 'zh-CN',
    volume: 1,
    playbackRate: 1,
    "preload": "auto",
    controls: true,
    loop: false,
    sources: [
      {
        type: 'application/x-mpegURL',
        src: urls.value[currentIndex].url,
      }

    ]
  }
  videoOptions.value = options


  //   url.value = urls.value[index].url



});

onUnmounted(() => {
  // player.value.dispose()
})

let getUrls = (nurl) => {
  console.log(nurl)
  let urls = []
  nurl.split("$$$").forEach((items, index) => {
    items.split("#").forEach((item, index) => {
      let arr = item.split("$")
      if (arr[1].includes(".m3u8")) {
        urls.push({ "name": arr[0], "url": arr[1] })
      }

    })
  })
  return urls
}


</script>

<template>
  <div class="player">
    <!--  <div id="dplayer"></div> -->
    <VideoPlayer :options="videoOptions" ref="changeVideoRef" @child-event="nextVideo" v-if="videoOptions"></VideoPlayer>
  </div>

  <div v-html="content"></div>

  <el-button-group class="ml-4" >
    <el-button  @click="choiceVideo(index)" v-for="(item, index) in urls" :key="item.name">{{ item.name }}</el-button>
  </el-button-group>

  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :ellipsis="true" >
    <el-menu-item type="primary" @click="choiceVideo(index)" :index="item.name" v-for="(item, index) in urls">
      {{ item.name }}
    </el-menu-item>

  </el-menu>

  <h2>333</h2>
  
</template>

<style scoped>
.video-js {
  min-width: 400px;
}

.video-js .vjs-tech {
  object-fit: fill;
}
</style>