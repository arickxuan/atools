<template >
    <div>
        <h4>{{ searchKey }} 的搜索结果</h4>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="音乐" name="first">音乐</el-tab-pane>
            <el-tab-pane label="作者" name="second">作者</el-tab-pane>
            <el-tab-pane label="专辑" name="third">专辑</el-tab-pane>
            <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
        </el-tabs>
        <div>
            <el-button round>qq音乐</el-button>
            <el-button round>网易云音乐</el-button>
            <el-button round>喜马拉雅</el-button>
            <el-button round>bilibili</el-button>
            <el-button round>Hi~res</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from 'element-plus'
defineProps({
    searchKey: {
        type: String,
        required: true,
    },
});
const activeName = ref("first");

function handleClick(tab: TabsPaneContext, event: Event) {
    console.log(tab, event);

}
</script>
<script lang="ts">
export default {
    name: "Search",
}
</script>
<style scoped></style>