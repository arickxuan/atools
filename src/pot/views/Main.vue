<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CloseBold, Printer, DocumentCopy, ScaleToOriginal, Microphone, Switch, FullScreen,Place } from '@element-plus/icons-vue'
//import { fr } from 'element-plus/es/locale';
import { translateDeepl, tts, translateGoogleProxy, baidu_detect,translateTencentProxy,translateBing } from '../tools/translate'
// import { useI18n } from 'vue-i18n'
import zh from '../i18n/locales/zh_CN.json'
import { languageList, ttsLanguage } from '../tools/language.js'
// import { invoke } from '@tauri-apps/api/core';
import { getCurrent } from '@tauri-apps/api/window';
// import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
import { readText,writeText } from '@tauri-apps/api/clipboard';
import { debounce, vueDebounce } from 'vue-debounce'

const vDebounce = vueDebounce({ lock: true })
// const { t } = useI18n()

const displayDirection = ref('column')
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

function changeLang() {
    const temp = fromlan.value
    fromlan.value = tolan.value
    tolan.value = temp
}

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

const result = ref({ deepl: '', google: '', tencent: '', bing: '' })

const activeTranItem = ref([''])
const handleChange = (val: string[]) => {
    console.log(val)
}

let isTop = ref(false)

function setTop() {
    console.log('setTop')
    let re = isTop.value = !isTop.value
    getCurrent().setAlwaysOnTop(re)
}

async function doTranslate() {
    console.log('doTranslate')
    console.log(textarea.value)
    console.log(fromlan.value)
    console.log(tolan.value)
    translateDeepl(textarea.value, fromlan.value, tolan.value).then(function (res) {
        result.value.deepl = res
        activeTranItem.value.push('deepl')
    })
    

    // re = await translateYandex(textarea.value, fromlan.value, tolan.value)
    // result.value.yandex = re
    let newToLan = ttsLanguage[tolan.value.replace(/-/g, "_").toLowerCase()];
    let newFromlan = ttsLanguage[fromlan.value.replace(/-/g, "_").toLowerCase()];
    translateGoogleProxy(textarea.value, newFromlan, newToLan).then(function (res) {
        result.value.google = res
        activeTranItem.value.push('google')
    })
    translateBing(textarea.value, fromlan.value, tolan.value).then(function (res) {
        result.value.bing = res
        activeTranItem.value.push('bing')
    })
    translateTencentProxy(textarea.value, newFromlan, newToLan).then(function (res) {
        result.value.tencent = res
        activeTranItem.value.push('tencent')
    })
    
}

function changeText() {
    console.log('changeText')
    debounce(function () {
        console.log('debounce 1s')

    }, 1000)()

    doTranslate()
}

const audioPlayer = ref<HTMLAudioElement>()

async function playVoice(type: string) {
    let arr: any[] = []


    if (type === 'source') {
        let lan = ""
        if (fromlan.value === 'auto') {
            lan = await baidu_detect(textarea.value)
            lan = ttsLanguage[lan.toLowerCase()]
        } else {
            let newStr = tolan.value.replace(/-/g, "_").toLowerCase();
            lan = ttsLanguage[newStr]
        }

        console.log(lan)
        let re = await tts(textarea.value, lan)
        console.log(re)
        arr = re
    } else {
        
        let newStr = tolan.value.replace(/-/g, "_").toLowerCase();
        let lan = ttsLanguage[newStr]
        let text = result.value[type]
        arr = await tts(text, lan)
    }
    
    // console.log(arr)
    // 将二进制数据转换为Blob对象
    // 将数字数组转换为Uint8Array
    const uint8Array = new Uint8Array(arr);
    const blob = new Blob([uint8Array], { type: 'audio/mp3' });
    // 创建一个指向该Blob的URL
    const url = URL.createObjectURL(blob);
    // 设置audio元素的src为这个URL

    audioPlayer.value = new Audio();
    audioPlayer.value.src = url;
    // 播放音频
    audioPlayer.value.play();
    console.log(url)
}


function adjustHeight($event: any) {
    const textarea = $event.target;
    textarea.style.height = 'auto'; // 先重置高度，允许它减小
    textarea.style.height = textarea.scrollHeight + 'px'; // 然后设置高度为内容的实际高度
    textAreaHeight.value = textarea.style.height; // 更新绑定的高
    console.log('begin 1s')

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

async function copyText(type: string) {
    if (type === 'source') {
        await writeText(textarea.value);

    }else{
        await writeText(result.value[type]);
    }
    ElMessage({
        message: '复制成功',
        type: 'success',
    })
}

onMounted(() => {
    makeLangs()
    // invoke("testhttp")

})

</script>
<script lang="ts">
export default {
    name: 'Main',
}
</script>

<template >
    <!-- //@ts-ignore -->
    <div class="container" :style="styleObject">
        <div class="top-tools">
            <div style="display: none;">
                <audio ref="audioPlayer"></audio>
            </div>
        </div>
        <div class="main-content">
            <div class="input-view">
                <!-- <el-input v-model="textarea" maxlength="80" placeholder="Please input" show-word-limit type="textarea" /> -->
                <textarea class="textarea__inner" v-model="textarea" maxlength="80" placeholder="Please input"
                    show-word-limit :style="{ height: textAreaHeight }" @input="adjustHeight"
                    v-debounce:1000ms="changeText" />
                <div class="toolbar">
                    <el-button :icon="Microphone" @click="playVoice('source')" />
                    <el-button :icon="DocumentCopy" @click="copyText('source')" />
                    <el-button :icon="ScaleToOriginal" />
                    <el-button :icon="CloseBold" />
                    <div class="spacer"></div> <!-- 添加一个空的占位符 -->
                    <el-button class="right-most-button" :icon="Place" @click="setTop" />
                    <el-button class="right-most-button" :icon="Printer" @click="doTranslate" />
                    <el-button class="right-most-button" :icon="FullScreen" @click="changeDisplayDirection" />
                </div>
            </div>

        </div>
        <div class="translateContent">
            <div class="change-language">
                <el-select filterable v-model="fromlan" placeholder="Select" suffix-icon="none" popper-append-to-body>
                    <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button :icon="Switch" color="#1F1F1F" @click="changeLang" />
                <el-select filterable v-model="tolan" label="" suffix-icon="none">
                    <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />

                </el-select>

            </div>
            <div class="demo-collapse">
                <el-collapse v-model="activeTranItem" @change="handleChange">
                    <el-collapse-item :title="key" :name="key" v-for="(value, key) in result">
                        <div>
                            {{ value }}
                        </div>
                        <div class="toolbar">
                            <el-button :icon="Microphone" @click="playVoice(key)" />
                            <el-button :icon="DocumentCopy" @click="copyText(key)" />
                            <el-button :icon="ScaleToOriginal" />

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

.container .main-content {
    flex: 1;
}

.container .translateContent {
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

.change-language .el-select__wrapper.is-hovering {
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
    border: 2px solid #373737;
}

.el-popper.is-light .el-popper__arrow::before {
    background-color: #1F1F1F;
}

.translateContent {
    margin: 10px;
    overflow-y: auto;
    /*  margin-top: 20px;
    border-radius: 10px; */
}

.translateContent .el-collapse-item__header {
    color: #fff;
    padding-left: 10px;
    background-color: #1F1F1F;
    border-radius: 10px;
}


.translateContent .el-collapse {
    border: none;
    --el-collapse-border-color: #1F1F1F;
}

.translateContent .el-collapse-item__content {
    color: #fff;
    background-color: #1F1F1F;
    padding: 10px;
}

.translateContent .toolbar button {
    margin-bottom: 10px;
    margin-left: 5px;
    background-color: #1F1F1F;
    border: 0px;
    color: #fff;
}
</style>