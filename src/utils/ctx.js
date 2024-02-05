import axios from "axios";

let ctx = {
  output: {},
  log: {
    info: (data) => {
      console.log(data);
    },
  },
  name: "alist up",
  config: [configIteam],
  request: axios,
  getConfig: getConfig,
  saveConfig: saveConfig,
  emit: (event, body) => {},
  helper: {
    uploader: {
      register: register,
      handle: (ctx) => {},
    },
    beforeUploadPlugins: {
      register: register,
      handle: (ctx) => {},
    },
  },
};

register = (event, registerInfo) => {};

registerInfo = {
  handle: (ctx) => {},
  name: "alist up",
  config: [configIteam],
};

getConfig = (key) => {};
saveConfig = (key, value) => {};
configIteam = {
  name: "url",
  type: "input",
  default: "userConfig.url",
  required: true,
  message: "API地址",
  alias: "API地址",
};
