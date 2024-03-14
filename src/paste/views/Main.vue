<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Search, More, } from '@element-plus/icons-vue'

const showInput = ref(false);
const searchInput = ref('');

const toggleInput = () => {
  console.log('toggleInput');
  showInput.value = !showInput.value;
  if (showInput.value) {
    nextTick(() => {
      searchInput.value.focus();
    });
  }
};
</script>
<script>
export default {
  name: 'Main',
}
</script>

<template>
  <div class="container">
    <div class="topTools">
      <div class="search-container">
        <input v-show="showInput" ref="searchInput" class="search-input" placeholder="search">

        </input>
        <el-button @click="toggleInput" :icon="Search">
        </el-button>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button :icon="More" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="mainContent">
      <div class="paste-item" v-for="n in 10" :key="n">
        <div class="paste-item-header">
          <h2>{{ n }}</h2>
        </div>
        <div class="paste-item-body"></div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.container .topTools {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

}

.mainContent {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  /* 防止item换行 */
}

.mainContent .paste-item {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
  height: 250px;
  margin: 20px;
  background-color: aquamarine;
}

.search-container {}

.search-input {
  width: 0;
  opacity: 0;
  transition: width 0.5s, opacity 0.5s;
}

.search-container input {
  width: 200px;
  opacity: 1;
}
</style>