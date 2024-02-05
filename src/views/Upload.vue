<template>
  <div>
    <h2>upload</h2>
    <button @click="doSomething">vclick</button>
  </div>
</template>
<script setup>
import {appConfigDir, homeDir} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api/tauri";
import {onMounted} from "vue";

onMounted(async () => {
  await invoke("log_info", { str: "Hello!" });

  let home = await homeDir();
  let pa = home + ".atoolsplugin/atools/index.js";
  let p = (await appConfigDir()) + "plugins/test3.js";
  //   loadJs(pa);
  requirePlugin("atools");

  setTimeout(ctx.pluginConfig(), 2000);
  // pluginConfig();
  // test();
  console.log("140.4.34.ee");
  // template();
});
</script>
<script>
export default {
  name: "Upload",
};
</script>
<style scoped></style>
