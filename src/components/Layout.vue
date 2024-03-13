<template>
    <div class="common-layout">
        <el-container>

            <el-aside width="200px">
                <!-- 导航栏 -->
                <div class="sidebar">
                    <div class="nav-item">排行榜</div>
                    <div class="nav-item">我的歌单</div>
                    <div class="nav-item">插件管理</div>
                    <div class="nav-item">下载管理</div>
                </div>
            </el-aside>
            
            <el-header>
                <div class="top-section">
                    <h1>音乐平台</h1>
                    <input type="text" v-model="searchQuery" placeholder="搜索音乐">
                </div>
            </el-header>
            
            <el-main>
                <!-- 右侧搜索结果列表 -->
                <div class="search-results">
                    <div class="result-item" v-for="(result, index) in searchResults" :key="index">
                        <div>{{ result.songName }}</div>
                        <div>{{ result.artist }}</div>
                        <div>{{ result.album }}</div>
                        <button @click="downloadSong(result)">下载</button>
                        <button @click="toggleFavorite(result)">收藏</button>
                        <div>{{ result.source }}</div>
                    </div>
                </div>
            </el-main>
            <el-footer>
                <!-- 底部音乐播放器 -->
                <div class="music-player">
                    <div>{{ currentSong.artist }} - {{ currentSong.songName }}</div>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="controls">
                        <button @click="playPause">播放/暂停</button>
                        <button @click="nextSong">下一首</button>
                        <button @click="prevSong">上一首</button>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>



<script lang="ts" setup >
import { ref } from 'vue';

const searchQuery = ref('');
// const navItems = ['排行榜', '我的歌单', '插件管理', '下载管理'];
const searchResults = ref([
    { songName: '歌曲1', artist: '歌手1', album: '专辑1', source: '来源1' },
    { songName: '歌曲2', artist: '歌手2', album: '专辑2', source: '来源2' },
    // 其他搜索结果
]);
const currentSong = ref({ songName: '当前歌曲', artist: '当前歌手' });

function downloadSong(song: any) {
    // 下载歌曲逻辑
    console.log('下载歌曲', song);
};

function toggleFavorite(song: any) {
    // 收藏歌曲逻辑
    console.log('下载歌曲', song);
};

function playPause() {
    // 播放/暂停逻辑
};

function nextSong() {
    // 切换到下一首歌曲逻辑
};

function prevSong() {
    // 切换到上一首歌曲逻辑
};
</script>



<script lang="ts">
export default {
    name: 'Layout',
};
</script>
  
<style scoped>
/* 在这里添加样式 */

</style>
