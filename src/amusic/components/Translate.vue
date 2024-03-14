<template>
    <v-app>
        <v-main>
            <v-container>
                <!-- 翻译界面 -->
                <v-card class="pa-5" color="black">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="textToTranslate" label="请输入要翻译的文本" outlined color="red"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn @click="translateText" color="red">翻译</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-divider></v-divider>
                            <v-card-title class="pt-5" color="red">
                                翻译结果: {{ translatedText }}
                            </v-card-title>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { translateDeepl } from '../tools/translate.ts';

translateDeepl("hello", "auto", "ZH");

// 这里是数据绑定
const textToTranslate = ref('');
const translatedText = ref('');

// 这里应该是调用翻译服务的函数，现在只是一个示例
const translateText = () => {
    translatedText.value = '你好'; // 假设翻译结果总是 "你好"
};
</script>
  
<style>
/* 在这里添加 CSS 样式 */
.v-card {
    background-color: #000000;
    color: #FFFFFF;
}

.v-btn {
    color: #FFFFFF;
}

.v-text-field .v-label {
    color: #FFFFFF;
}

.v-text-field .v-input__control {
    color: #FFFFFF;
}

.v-text-field .v-input__slot {
    border-color: red;
}

.v-card-title {
    background-color: red;
    color: #FFFFFF;
}
</style>