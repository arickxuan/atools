<template>
  <div>
    <h2>h2</h2>
  </div>
</template>
<script setup>
import axios from "axios";
import {onMounted} from "vue";
import Iteam from "@/model/Iteam.js";
import {apply, getVariableGroup} from "@/utils/plugin.js";
// import { test } from "plugins/test.js";

onMounted(async () => {
  // test();
  // let ip = await getIp();
  // getIpInfo(ip);
  // let re = getPluginDir();
  console.log(re);
  console.log("120.244.3.181");
  // template();
});

async function getIpInfo2(ip) {
  let url = "https://tools.mgtv100.com/external/v1/amap/ip?ip=" + ip;
  let res = await axios.get(url);
  console.log(res.data);
}

async function getIp() {
  let url = "https://api.myip.la/cn?json";
  let res = await axios.get(url);
  console.log(res.data);
  return res.data.ip;
}

async function template(arrIteams) {
  let content = `
  async function getIpInfo(ip) {
  let url = "https://tools.mgtv100.com/external/v1/amap/ip?ip=" + ip;
  let res = await axios.get(url);
  return res.data;
}
getIpInfo(ip);
  `;
  let i1 = new Iteam(content, 1, null, 1, 60 * 60 * 24 * 2, "", 4);
  let i2 = new Iteam("120.244.158.181", 0, null, 0, 0, "${ip}", 1);

  let defval = getVariableGroup(arrIteams, 0);
  let scripts = getVariableGroup(arrIteams, 1);

  for (let item of scripts) {
    defval = await apply(defval, item);
  }
  console.log(defval);
  return defval;
}
</script>
<script>
export default {
  name: "Temp",
};
</script>
<style scoped></style>
