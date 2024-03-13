<template>
    <el-container>
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>翻译服务</span>
                </div>
                <div>
                    <el-input v-model="textToTranslate" placeholder="请输入要翻译的文本" clearable></el-input>
                </div>
                <div style="margin-top: 20px;">
                    <el-button type="primary" @click="translateText">翻译</el-button>
                </div>
                <el-divider></el-divider>
                <div style="margin-top: 20px;">
                    <el-alert :title="translatedText" type="success" show-icon></el-alert>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>
  
<script setup>
import { ref ,onMounted} from 'vue';
import { translateDeepl,translateGoogle,translateBing} from '../utils/translate.js';

const textToTranslate = ref('');
const translatedText = ref('');

onMounted(async () => {
    console.log('Home mounted');
    let re = await translateDeepl('how are you arick', 'auto', 'ZH'); // 调用翻译服务
    console.log("re",re);
    let re2 = await translateGoogle('how are you arick', 'auto', 'ZH')

    console.log("re2",re2);

    let re3 = await translateBing('how are you arick', '', 'zh-Hans')


    console.log("re3",re3);
});

// 这里应该是调用翻译服务的函数，现在只是一个示例
const translateText = () => {
    translatedText.value = '你好'; // 假设翻译结果总是 "你好"
};
</script>
  
<style scoped>
.box-card {
    width: 50%;
    margin: 0 auto;
}
</style>