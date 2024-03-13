<template>
    <div id="video-container" >
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import "video.js/dist/video-js.css";
import videojs from "video.js";
import "@videojs/http-streaming";

// 使用defineProps定义组件的props
const props = defineProps({
    options: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['child-event']);

let player = {};

function changeSource(src) {
    if (videoPlayer.value) {
        player.src(src);
    }
}

// 使用ref创建响应式引用
const videoPlayer = ref(null);


let originalWidth = 0;
let originalHeight = 0;
let isFullsize = false; // 标记是否已经全屏

// 使用onMounted生命周期钩子
onMounted(() => {
    if (videoPlayer.value) {
        player = videojs(videoPlayer.value, props.options, function onPlayerReady() {
            this.log('onPlayerReady', this);
        });
        // player.removeChild('BigPlayButton');
        player.controlBar.fullscreenToggle.hide();
        console.log(player.controlBar);
        // player.controlBar.audiotrack.hide();

        // player.controlBar.chaptersButton.show();
        player.controlBar.children().forEach(function (child) {
            console.log(child.name());
            if (child.name() === 'playToggle') {
            }
        });
        

        // player.getChild('ControlBar').removeChild('Fullscreen');
        const myButton = player.getChild('ControlBar').addChild('button', {
            className: 'vjs-visible-text',
            clickHandler: function (event) {
                videojs.log('Clicked');
                emit('child-event');
            }
        }, getIndex(player) + 1);
        myButton.setIcon('next')
        myButton.controlText('下一集')

        const myButton2 = player.getChild('ControlBar').addChild('button', {
            className: 'vjs-visible-text',
            clickHandler: function (event) {
                videojs.log('Clicked ');
                toggleWebFullscreen();
            }
        });
        myButton2.setIcon('next')
        myButton2.controlText('网页全屏')

        player.on("play", () => {

            console.log('开始播放');
        });

        // 使用onBeforeUnmount生命周期钩子来清理
        onBeforeUnmount(() => {
            if (player) {
                player.dispose();
            }
        });
    }
});

// 获取播放按钮的索引位置的函数
function getIndex(player) {
    let index = 0;
    const controlBar = player.getChild('controlBar');
    const controlBarChildren = controlBar.children();

    for (let i = 0; i < controlBarChildren.length; i++) {
        if (controlBarChildren[i].name() === 'playToggle') {
            index = i;
            break;
        }
    }

    return index;
}

// 网页全屏的逻辑
function toggleWebFullscreen() {
    const videoContainer = document.getElementById('video-container'); // 你的视频容器的ID

    

    if (!isFullsize) {
        // 设置为当前窗口大小
        // 定义变量来存储原始大小
        originalWidth = videoContainer.style.width;
        originalHeight = videoContainer.style.height;
        videoContainer.style.width = window.innerWidth + 'px';
        videoContainer.style.height = window.innerHeight + 'px';
        videoContainer.style.position= "fixed";
        videoContainer.style.zIndex = 1000;
        videoContainer.style.margin = "0";
        videoContainer.style.padding = "0";
        videoContainer.style.backgroundColor = "black";
        isFullsize = true;
    } else {
        // 恢复原始大小
        videoContainer.style.width = originalWidth;
        videoContainer.style.height = originalHeight;
        videoContainer.style.position= "static";
        isFullsize = false;
    }
}

// 使用expose来暴露方法给父组件
defineExpose({
    changeSource,
});
</script>
  
<script>
export default {
    name: 'VideoPlayer',
    // props: {
    //     options: {
    //         type: Object,
    //         default() {
    //             return {};
    //         }
    //     }
    // },
    // data() {
    //     return {
    //         player: null
    //     }
    // },
    // mounted() {
    //     this.player = videojs(this.$refs.videoPlayer, this.options, () => {
    //         this.player.log('onPlayerReady', this);
    //     });
    // },

}
</script>

<style scoped>
.video-js {
    min-width: 700px;
    min-height: 500px;
    width: 100%;

}
</style>