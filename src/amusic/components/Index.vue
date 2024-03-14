<template>
    <v-app>
        <v-app-bar app color="orange" dark>
            <v-toolbar-title>MusicFree</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer">
            <v-list dense>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>My Playlists</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-chart-line</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Top Charts</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Downloads</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-music-box</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Local Music</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Playlists</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-chip-group active-class="orange--text" column>
                            <v-chip>网易云</v-chip>
                            <v-chip>QQ音乐</v-chip>
                            <v-chip>云音乐</v-chip>
                            <v-chip>5sing</v-chip>
                            <v-chip>千千音乐</v-chip>
                            <v-chip>蛋马拉雅</v-chip>
                            <v-chip>酷狗</v-chip>
                            <v-chip>bilibili</v-chip>
                            <v-chip>Hi-Res音乐</v-chip>
                        </v-chip-group>
                    </v-col>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>热门榜</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="4" v-for="item in hotLists" :key="item.id">
                                        <v-card outlined>
                                            <v-img :src="item.image" height="150"></v-img>
                                            <v-card-title>{{ item.title }}</v-card-title>
                                            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>其他榜</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="4" v-for="item in otherLists" :key="item.id">
                                        <v-card outlined>
                                            <v-img :src="item.image" height="150"></v-img>
                                            <v-card-title>{{ item.title }}</v-card-title>
                                            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <v-bottom-navigation app color="orange">
            <v-btn value="recent">
                <span>QQ音乐</span>
                <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn value="favorites">
                <v-icon>mdi-pause</v-icon>
            </v-btn>

            <v-btn value="nearby">
                <v-icon>mdi-play</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>
  
<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const hotLists = ref([
    {
        id: 1,
        image: 'https://via.placeholder.com/150',
        title: '飙升榜',
        description: 'QQ音乐站...'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/150',
        title: '热歌榜',
        description: 'QQ音乐站...'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/150',
        title: '新歌榜',
        description: 'QQ音乐站...'
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/150',
        title: '流行指数榜',
        description: 'QQ音乐站...'
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/150',
        title: '腾讯音乐人原创榜',
        description: 'QQ音乐最新最热的腾讯...'
    }
])

const otherLists = ref([
    {
        id: 6,
        image: 'https://via.placeholder.com/150',
        title: '听歌识曲榜',
        description: 'QQ音乐用户使用"听歌...'
    },
    {
        id: 7,
        image: 'https://via.placeholder.com/150',
        title: 'MV榜',
        description: 'QQ音乐播放传分最高的...'
    }
])
</script>