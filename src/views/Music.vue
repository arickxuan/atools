<template >
    <div class="mainContainer">
        <div class="header">
            <div class="logo">
                <h1>Amusic</h1>
            </div>
            <div class="search">
                <div class="left-control">

                    <el-input v-model="input" class="rounded-input" style="width: 200px" placeholder="search">

                        <template #append>
                            <el-button color="#EB6728"
                                style="--el-button-text-color: #ffffff;--el-button-hover-text-color: #ffffff;"
                                :icon="Search"></el-button>
                        </template>
                    </el-input>

                </div>
                <div class="right-control"><el-button color="#EB6728"
                        style="--el-button-text-color: #ffffff;--el-button-hover-text-color: #ffffff;" :icon="Setting"
                        to="/settings"></el-button>
                    <!--  -->
                </div>
            </div>
        </div>

        <div class="content">
            <div class="leftMenu">
                <div class="slider">
                    <div>
                        <router-link to="/plugins"> 排行榜</router-link>
                    </div>
                    <div>
                        <router-link to="/plugins"> 热门歌单</router-link>
                    </div>
                    <div>
                        <router-link to="/plugins"> 下载管理</router-link>
                    </div>
                    <div>
                        <router-link to="/plugins"> 本地音乐</router-link>
                    </div>
                    <div>
                        <router-link to="/plugins"> 插件管理</router-link>
                    </div>
                </div>
                <div class="songList">
                    <div> <span>我的歌单 </span> <span> +</span> </div>
                    <div>
                        我的收藏
                    </div>
                </div>
            </div>

            <div class="mainContent">
                <router-view></router-view>
                <div class="musicBody">
                </div>

            </div>
        </div>
        <div class="musicControls">
            <div class="slider-demo-block">
                <span class="demonstration">Format Tooltip</span>
                <el-slider v-model="progress" :show-tooltip="false" />
            </div>
            <audio 
      ref="audioPlayer" 
      :src="currentTrack.url" 
      @timeupdate="updateProgress" 
      @loadedmetadata="initProgress" 
      
      controls
    ></audio>  
    <!-- @ended="nextTrack" -->
            <div class="songInfo">
                <div><img src="/public/song.png" width="50px" height="50px" alt="song"></div>

                <div class="songName">
                    <span>歌名</span>
                    <span>歌手</span>
                </div>
                <div class="songTime">
                    <span>qq音乐</span>
                    <span>{{ currentTimeFormatted }}/ {{ durationFormatted }}</span>
                </div>
            </div>

            <div class="musicControl">
                <div> pre </div>
                <div>play/pause</div>
                <div>next</div>

            </div>

            <div class="toolsControl">
                <div>HD音质</div>
                <div>速度</div>
                <div>音量</div>
                <div>歌词</div>
                <div>循环</div>
                <div>列表</div>
            </div>

        </div>


    </div>
</template>
<script lang="ts" setup>
import { ref,computed } from "vue";
import { Search, Setting } from '@element-plus/icons-vue'
const input = ref("");
const progress = ref(0);

const audioPlayer = ref(null);
const currentTime = ref(0);
const duration = ref(0);

const playlist = ref([
  // 你的播放列表数据
  {
    name: "歌曲1",
    url: "https://www.qq.com/music/1.mp3",
    cover: "https://www.qq.com/music/1.jpg"
  }
]);
const currentTrackIndex = ref(0);

const currentTrack = computed(() => playlist.value[currentTrackIndex.value]);

const initProgress = () => {
  if (audioPlayer.value) {
    // duration.value = audioPlayer.value.duration;
    console.log(audioPlayer.value);
  }
};

const updateProgress = () => {
  if (audioPlayer.value) {
    //currentTime.value = audioPlayer.value.currentTime;
    console.log(audioPlayer.value);
  }
};



const currentTimeFormatted = computed(() => {
  return formatTime(currentTime.value);
});

const durationFormatted = computed(() => {
  return formatTime(duration.value);
});

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
</script>
<script lang="ts">
export default {
    name: "Music",
}
</script>
<style >
.mainContainer {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: aqua;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* 垂直居中 */
    height: 50px;
    background-color: #EB6728;
    color: white;
}

.header .logo {
    width: 200px;
    line-height: 50px;
}

.header .logo h1 {
    margin: 0px;
    padding-left: 20px;
}

.header .search {
    flex: 1;
    display: flex;
    /* 启用 flex 布局 */
    justify-content: space-between;
    /* 子控件分散对齐 */
    align-items: center;
}

.rounded-input .el-input__wrapper {
    border-top-left-radius: 20px;
    /* 设置圆角大小 */
    border-bottom-left-radius: 20px;
    background-color: #C25722;
    --el-input-border-color: #C25722;
    --el-input-focus-border-color: #C25722;
    --el-input-hover-border-color: #C25722;
    --el-input-text-color: #ffffff;

}


.rounded-input .el-input-group__append {
    color: #ffffff;
    background-color: #C25722;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    --el-input-border-color: #C25722;
}

.search .left-control {
    padding-left: 5px;
}

.search button {
    --el-button-text-color: #ffffff;
}


.content {
    flex: 1;
    /* //填充剩余空间 */
    display: flex;
    flex-direction: row;
    /* height: 100%; */
}

.content .leftMenu {

    width: 200px;
    background-color: #FCFCFC;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}

.content .leftMenu div {
    padding-top: 10px;
    padding-left: 20px;

}

.content .mainContent {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.content .mainContent .musicBody {
    width: 100%;
    background-color: #f2f2f2;
}

.musicControls {
    height: 80px;
    background-color: #FCFCFC;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.musicControls .songInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.musicControls .songInfo div {
    margin-left: 20px;

}

.musicControls .songInfo .songName {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-left: 5px;
}

.musicControls .songInfo .songTime {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-left: 20px;
}

.musicControls .musicControl {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.musicControls .musicControl div {
    margin-left: 20px;
}

.musicControls .toolsControl {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.musicControls .toolsControl div {
    margin-right: 20px;

}
</style>