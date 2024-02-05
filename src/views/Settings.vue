<template>
  <div>
    <div class="title"><h1>Settings 4</h1></div>
  </div>
</template>
<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {appConfigDir} from "@tauri-apps/api/path";
import {createConfigDirRust, isExists, readFile, writeFile} from "../utils/fs.js";
import defaultConfig from "@/assets/config.json";

var configJson = ref({});
async function initConfig() {
  configJson.value = defaultConfig;
  const appConfigDirPath = await appConfigDir();
  await createConfigDirRust(appConfigDirPath);
  let config = appConfigDirPath + "/config.json";
  let re = await isExists("config.json");
  if (re) {
    let re = await readFile(config);
    configJson.value = JSON.parse(re);
    console.log("exist", configJson);
  } else {
    let configStr = JSON.stringify(defaultConfig, null, "\t");
    await writeFile("config.json", configStr);
  }
}
//read_dir, createConfigDirRust
onMounted(async () => {
  initConfig();
});

onUpdated(() => {});
</script>
<script>
export default {
  name: "Settings",
};
</script>
<style scoped></style>
