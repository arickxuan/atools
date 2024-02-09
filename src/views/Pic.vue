<template>
    <div class="container" :style="{ height: screenHeight + 'px' }">
        <div class="left-column">
            <!--  -->
            <el-col :span="12">
                <!-- <h5 class="mb-2">Default</h5> -->
                <div>
                    <RouterLink to="/">index</RouterLink>
                </div>
                <div>
                    <RouterLink to="/settings">settings</RouterLink>
                </div>
                <div>
                    <RouterLink to="/tools">tools</RouterLink>
                </div>
                <div>
                    <RouterLink to="/plugin">plugin</RouterLink>
                </div>
                <div>
                    <RouterLink to="/temp">temp</RouterLink>
                </div>
                <div>
                    <RouterLink to="/upload">upload</RouterLink>
                </div>
              <div>
                <RouterLink to="/book">book</RouterLink>
              </div>
            </el-col>
        </div>
        <div class="right-column">
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import {onMounted, onUpdated, ref} from "vue";

// import { Document, Menu as IconMenu, Location } from "@element-plus/icons-vue";
// const handleOpen = (key, keyPath) => {
//   console.log_init(key, keyPath);
// };
// const handleClose = (keyPath, keyPath) => {
//   console.log_init(key, keyPath);
// };

const screenHeight = ref(500);

window.addEventListener("resize", function (event) {
    // 窗口大小改变时触发的代码
    // console.log_init("窗口大小已改变！", event);
    screenHeight.value = window.innerHeight -30;
});

onMounted(() => {
    screenHeight.value = window.innerHeight;
});

onUpdated(() => {
    // 文本内容应该与当前的 `count.value` 一致
});
</script>
<script>
export default {
    name: "Pic",
};
</script>
<style scoped>
.container {
    display: flex;
    display: -webkit-flex;

    flex-direction: row;
    /* row 横向  column 纵向  */
    flex-wrap: nowrap;
    /*   不换行 */

    /* flex-flow属性是flex-direction属性和flex-wrap */
    flex-flow: row wrap;

    /* justify-content属性定义了项目在主轴上的对齐方式。 */
    justify-content: flex-start;
    /* flex-start | flex-end | center |
    space-between 两端顶头，子box之间的间隔都相等 |
    space-around 项目之间的间隔比项目与边框的间隔大一倍*/

    align-items: stretch;
    /* flex-start | flex-end | center |
    baseline 项目的第一行文字的基线对齐。|
    stretch; （默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度*/

    height: 100%;
    background-color: aqua;
}

.left-column {
    /* flex属性是flex-grow, flex-shrink 和 flex-basis的简写，
    默认值为0 1 auto。后两个属性可选 */
    /* flex: 0 1 50px; */

    /* flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 */
    flex-grow: 0;
    /* 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）
    。如果一个项目的flex-grow属性为2，其他项目都为1，
    则前者占据的剩余空间将比其他项多一倍。 */

    /* flex-shrink 属性定义了项目的缩小比例，默认为1，
    即如果空间不足，该项目将缩小 */
    flex-shrink: 1;
    /* 如果所有项目的flex-shrink属性都为1，则它们将等比例缩小。
    如果一个项目的flex-shrink属性为0，其他项目都为1，则前者都将缩小。  */

    /* flex-basis属性定义了在分配多余空间之前，
    项目占据的主轴空间（main size）。浏览器根据这个属性，
    计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 */
    flex-basis: 250px;
    /* 它可以设为跟width或height属性一样的值（比如350px），
    则项目将占据固定空间。 */

    /* align-self属性允许单个项目有与其他项目不一样的对齐方式，
    可覆盖父级align-items属性。默认值为auto，
    表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 */
    align-self: auto;

    /* order属性定义了项目在flex布局中的排列顺序。
    默认值为0，即按照它们在flex布局中的顺序排列。 */
    order: 0;

    background-color: #353536;
}

.right-column {
    flex: 1;
    background-color: #1a2224;
}
</style>
