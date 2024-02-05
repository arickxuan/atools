<template>
  <div class="home">
    <nav class="nav">
      <div class="temp">
        图片上传 -
        <span
          ><el-dropdown
            ref="dropdown1"
            trigger="contextmenu"
            style="vertical-align: baseline"
          >
            <span class="el-dropdown-link" @click="showClick"> alist </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown></span
        >
      </div>
    </nav>
    <div class="imgBox" @click="uploadFile">
      <div class="img"><img src="../assets/vue.svg" alt="" /></div>
      <div class="title"><p>图片上传2</p></div>
      <input
        type="file"
        style="display: none"
        name="file"
        ref="fileInput"
        @input="handleInputChange"
      />
    </div>
    <div class="tools">
      <el-button-group>
        <el-button>markdown</el-button>
        <el-button> html </el-button>
        <el-button> url </el-button>
      </el-button-group>

      <el-button-group class="ml-4">
        <el-button>剪切板</el-button>
        <el-button>url</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
// import { DropdownInstance } from "element-plus";
// import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

const fileInput = ref();
function uploadFile() {
  console.log("uploadFile8");
  fileInput.value.click();
  //   document.getElementById("fileInput").click(); // 触发文件选择对话框
}
const handleInputChange = (e) => {
  console.log("fileInput");
  let file = e.target.files[0]; // 获取选中的文件
  const formData = new FormData();
  formData.append("file", file);
  //   let res = await fetch("/upload", {
  //       method: "POST",
  //       headers: {},
  //       body: formData,
  //     });
  //   try{
  //     let res = await axios.post("/upload", {formData})
  //   } catch (err) {
  //     console.log_init(err);
  //   }
};

const dropdown1 = ref();
function handleVisible2(visible) {
  if (!dropdown1.value) return;
  if (visible) {
    dropdown1.value.handleClose();
  } else {
    dropdown1.value.handleOpen();
  }
}
function showClick() {
  console.log("showClick");
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
}
</script>
<script>
export default {
  name: "Home",
};
</script>
<style>
.home {
  display: flex;
  flex-flow: column wrap;
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
}
.nav {
  margin-top: 20px;
  padding-top: 20px;
}
.nav > div {
  /* margin-top: 20px;
  padding-top: 20px; */
}
.imgBox {
  width: 450px;
  height: 220px;
  border: 2px dashed white; /* 虚线宽度、颜色 */
  border-radius: 10px; /* 圆角大小 */

  display: flex;
  flex-flow: column wrap;

  /* background-color: #384e5a; */

  margin-top: 20px;
}

.imgBox:hover {
  background-color: #384e5a;
  cursor: pointer;
}

.imgBox > .img {
  margin-top: 50px;
}
.imgBox > .title {
  margin-top: 20px;
}

.tools {
  margin-top: 20px;
}
</style>
