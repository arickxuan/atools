<template>
    <v-app>
        <v-navigation-drawer app>
            <!-- 侧边栏内容 -->
            <v-list>
                <v-list-item-group>
                    <v-list-item title="自製清單">
                        <!-- 自製清單内容 -->
                    </v-list-item>
                    <v-list-item title="熱烈關注">
                        <!-- 熱烈關注内容 -->
                    </v-list-item>
                    <v-list-item title="下載管理">
                        <!-- 下載管理内容 -->
                    </v-list-item>
                    <!-- 其他列表项 -->
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <!-- 主要内容区 -->
            <v-container>
                <v-data-table :headers="headers" :items="songs" class="elevation-1">
                    <!-- 数据表格内容 -->
                </v-data-table>
            </v-container>
        </v-main>

        <v-footer fixed padless>
            <!-- 播放器控件 -->
            <v-card flat tile class="fixed-footer">
                <v-card-text>
                    <!-- 当前播放歌曲信息 -->
                </v-card-text>
                <v-card-actions>
                    <!-- 播放控制按钮 -->
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>
  
<script setup>
import { ref } from 'vue';
// import { VApp, VNavigationDrawer, VList, VListItem, VListItemGroup, VMain, VContainer, VDataTable, VFooter, VCard, VCardText, VCardActions } from 'vuetify/lib';

// 示例数据
const headers = ref([
    { text: '编号', value: 'number' },
    { text: '标题', value: 'title' },
    { text: '作者', value: 'artist' },
    { text: '专辑', value: 'album' },
    { text: '时长', value: 'duration' },
    // 其他表头
]);

const songs = ref([
    // 歌曲数据
]);
</script>
  
<style>
/* 在这里添加 CSS 样式 */
/* 应用整体的样式 */
.v-application {
    font-family: 'Roboto', sans-serif;
}

/* 侧边栏样式 */
.v-navigation-drawer {
    background-color: #FFFFFF;
}

/* 侧边栏列表项样式 */
.v-list-item {
    color: #333333;
}

/* 侧边栏列表项选中样式 */
.v-list-item--active {
    background-color: #EEEEEE;
}

/* 主要内容区样式 */
.v-main {
    background-color: #FAFAFA;
}

/* 数据表格样式 */
.v-data-table {
    background-color: #FFFFFF;
}

/* 数据表格表头样式 */
.v-data-table-header {
    color: #333333;
}

/* 播放器控件样式 */
.fixed-footer {
    background-color: #333333;
    color: #FFFFFF;
}

/* 播放器按钮样式 */
.v-btn {
    color: #FFFFFF;
}

/* 播放器当前歌曲信息样式 */
.v-card-text {
    font-size: 14px;
}

/* 播放器控制按钮区样式 */
.v-card-actions {
    justify-content: space-between;
}
</style>