<script setup>
import {onEventShowMenu} from "tauri-plugin-context-menu";
import "video.js/dist/video-js.css";
import videojs from "video.js";
import "@videojs/http-streaming";
import { ref, onMounted, onUnmounted } from "vue";
var  playerId = 'my-video'
var player = ref({})

onMounted(async () => {
  // console.log(route.params.id);
  console.log("detail");
  // console.log(typeof props.chapter);

  // await getData();
  // getPlayer();
  let index = 0
  // if (props.chapter == undefined) {
  //   index = 0
  // } else {
  //   // index = Number(props.chapter)
  // }
  player.value = videojs(playerId, {autoplay: true,playbackRates: [0.5, 1, 1.5, 2],});  //,"techOrder": ["hls", "html5"]
player.value.controlBar.addChild('button', {
  text: '自定义按钮',
  name: 'myCustomButton',
  click: function() {
    console.log('自定义按钮被点击了！');
  }
});
  // player.value.src({
  //   src: "https://hls.vdtuzv.com/videos3/c3848d7d0d765475c58d5c0a92a108ff/c3848d7d0d765475c58d5c0a92a108ff.m3u8?auth_key=1710003160-65ec93d89ff83-0-1258952f64a6da094a670b0487802caa&v=3&time=0",
  //   type: "application/x-mpegURL"
  // });
  // player.value.play();

  player.value.on("ended", () => {
    //播放完成
  })


});

onUnmounted(() => {
  //  player.value.dispose()
})

onEventShowMenu("contextmenu", (e) => ({ /* menuOptions */ }));
</script>

<template>
<h1>右键菜单</h1>
<video class="video-js"  ref="playerId" controls>
  <source
           src="https://vip.ffzyread1.com/20240310/25093_9d35f047/index.m3u8"
           type="application/x-mpegURL">
</video>
</template>
<script>
export default {
  name: "BookList",
}
</script>
<style scoped>

</style>