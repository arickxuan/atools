<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CloseBold, Printer, DocumentCopy, ScaleToOriginal, Microphone, Switch, FullScreen } from '@element-plus/icons-vue'
//import { fr } from 'element-plus/es/locale';
import { translateDeepl,translateYandex,translateGoogle,translateBing } from '../tools/translate'
// import { useI18n } from 'vue-i18n'
import zh from '../i18n/locales/zh_CN.json'
import {languageList} from '../tools/language.ts'
import { invoke } from '@tauri-apps/api/core';

// const { t } = useI18n()

const displayDirection = ref('row')
const styleObject = ref({
        flexDirection: displayDirection.value
})

const fromlan = ref('auto')
const tolan = ref('zh-cn')
const textarea = ref('')
const textAreaHeight = ref('auto')

const langs: { [key: string]: any } = ref([
    {
        value: 'auto',
        label: '自动检测',
    },
]) as any;

function makeLangs() {
    for (let i = 0; i < languageList.length; i++) {
        const lang = languageList[i]
        langs.value.push({
            value: lang,
            label: zh.translation.languages[lang],
        })
    }
}

// const plugins = ["deepl","google","bing","yandex",]

const result = ref({deepl:'',google:'',bing:'',yandex:''})

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}

async function doTranslate() {
    console.log('doTranslate')
    console.log(textarea.value)
    console.log(fromlan.value)
    console.log(tolan.value)
    let re = await translateDeepl(textarea.value, fromlan.value, tolan.value)
    result.value.deepl = re
    re = await translateGoogle(textarea.value, fromlan.value, tolan.value)
    result.value.google = re
    re = await translateBing(textarea.value, fromlan.value, tolan.value)
    result.value.bing = re
    re = await translateYandex(textarea.value, fromlan.value, tolan.value)
    result.value.yandex = re
    console.log(re)
}

function adjustHeight($event: any) {
    const textarea = $event.target;
    textarea.style.height = 'auto'; // 先重置高度，允许它减小
    textarea.style.height = textarea.scrollHeight + 'px'; // 然后设置高度为内容的实际高度
    textAreaHeight.value = textarea.style.height; // 更新绑定的高
}

const changeDisplayDirection = (() => {
    console.log(displayDirection.value)
    if (displayDirection.value === 'row') {
        displayDirection.value = 'column'
    } else {
        displayDirection.value = 'row'
    }
    styleObject.value.flexDirection = displayDirection.value
});

onMounted(() => {
    makeLangs()
    invoke("testhttp")

})

</script>
<script lang="ts">
export default {
    name: 'Main',
}
</script>

<template >
    <!-- //@ts-ignore -->
    <div class="container"  :style="styleObject">
        <div class="top-tools"></div>
        <div class="main-content">
            <div class="input-view">
                <!-- <el-input v-model="textarea" maxlength="80" placeholder="Please input" show-word-limit type="textarea" /> -->
                <textarea class="textarea__inner" v-model="textarea" maxlength="80" placeholder="Please input" show-word-limit :style="{ height: textAreaHeight }" @input="adjustHeight" />
                <div class="toolbar">
                    <el-button :icon="Microphone" />
                    <el-button :icon="DocumentCopy" />
                    <el-button :icon="ScaleToOriginal" />
                    <el-button :icon="CloseBold" />
                    <div class="spacer"></div> <!-- 添加一个空的占位符 -->
                    <el-button class="right-most-button" :icon="Printer" @click="doTranslate" />
                    <el-button class="right-most-button" :icon="FullScreen" @click="changeDisplayDirection" />
                </div>
            </div>
            
        </div>
        <div class="translateContent">
            <div class="change-language">
                <el-select filterable v-model="fromlan" placeholder="Select" suffix-icon="none" popper-append-to-body >
                    <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button :icon="Switch" color="#1F1F1F"  />
                <el-select filterable v-model="tolan" label=""
                    suffix-icon="none">
                    <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
                
                </el-select>

            </div>
            <div class="demo-collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item :title="key" :name="key" v-for="(value, key) in result" >
                        <div>
                            {{ value }}
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<style >
.container {
    background-color: #191919;
    display: flex;
    flex-direction: row;
}

.container .main-content{
    flex: 1;
}
.container .translateContent{
    flex: 1;
}

.input-view {
    margin: 10px;
    margin-top: 5px;
    border: 1px solid #4a4545;
    background-color: #1F1F1F;
    border-radius: 10px;
}

.input-view .textarea__inner {
    color: #f5ebeb;
    box-sizing: border-box;
    /* 确保内边距和边框包含在宽度内 */
    background-color: #1F1F1F;
    border: 0px;
    /* 如果你还想去掉 textarea 获得焦点时的边框（outline） */
    outline: none;
    box-shadow: none;
    resize: none;
    border-radius: 10px;
    width: 100%;
    /* 宽度与父元素一样宽 */
    min-height: 50px;
    /* 最小高度，可以根据需要调整 */
    height: auto;
    /* 高度根据内容自动调整 */
    overflow-y: hidden;
    /* 隐藏垂直滚动条 */
}

.input-view .textarea__inner:focus {
    border: 0px;
    /* 如果你还想去掉 textarea 获得焦点时的边框（outline） */
    outline: none;
    box-shadow: #4a4545;
    --el-input-border: 0px;
    --el-input-hover-border: #4a4545;
    --el-input-focus-border: #4a4545;
}

.input-view .toolbar {
    display: flex;
    justify-content: flex-start;
}

.input-view .toolbar button {
    margin-bottom: 10px;
    margin-left: 5px;
    background-color: #1F1F1F;
    border: 0px;
    color: #fff;
}

.input-view .toolbar .spacer {
    flex-grow: 1;
    /* 占位符占据所有可用空间 */
}

.change-language {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background-color: #1F1F1F;
}

.change-language .el-select__wrapper { 
    background-color: #1F1F1F;
    box-shadow: none;
    border: 0px solid #4a4545;
}

.change-language .el-select__wrapper.is-hovering{
    box-shadow: none;
    border: 0px solid #4a4545;
}

.el-select__popper.el-popper {
    color: #fff;
    background: #1F1F1F;
    border: 2px solid #1F1F1F;
}

.el-select-dropdown__item.is-hovering {
    background-color: #373737;
}
.el-select__popper.el-popper .el-popper__arrow::before {
    border:2px solid #373737;
}
.el-popper.is-light .el-popper__arrow::before {
    background-color: #1F1F1F;
}

.translateContent {
    /* margin: 10px;
    margin-top: 20px;
    border-radius: 10px; */
}

.translateContent .el-collapse-item__header{
    color: #fff;
    padding-left: 10px;
    background-color: #1F1F1F;
    border-radius: 10px;
}


.translateContent .el-collapse {
    border: none;
    --el-collapse-border-color: #1F1F1F;
}

.translateContent .el-collapse-item__content{
    color: #fff;
    background-color: #1F1F1F;
    padding: 10px;
}

/* .change-language div{
    display: flex;
     align-items: center; 
    flex-direction: column;
    justify-content: space-between;
} */
</style>