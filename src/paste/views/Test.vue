<template>
    <div class="message-list">
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <div class="message-header">
          <span class="message-type">{{ message.type }}</span>
          <span class="message-time">{{ message.time }}</span>
          <span v-if="message.icon" class="message-icon">{{ message.icon }}</span>
        </div>
        <div class="message-content" v-html="message.content"></div>
        <div v-if="message.footer" class="message-footer">{{ message.footer }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [
          { type: '文本', time: '现在', content: '所有', footer: '2个字符' },
          { type: '文本', time: '2分钟前', icon: 'GO', content: 'server:<br>http:<br>addr: 0.0.0.0:8000<br>timeout<br>grpc:<br>addr: 0.0.0.0:9000<br>timeout: 5s<br><br>kafka_customer_ebook_gold:', footer: '6,587个字符' },
          { type: '文本', time: '2分钟前', content: '万册图书免费看，抢先领取VIP，尽享阅读尝鲜福利！', footer: '25个字符' },
          { type: '1个文件', time: '4分钟前', icon: 'GO', content: '...ixrs/conf/ebook/configs/online.yaml' },
          { type: '链接', time: '6分钟前', icon: '↻', content: 'online2<br>readbook-static-test.oss-cn-beijing.a...' },
          { type: '文本', time: '7分钟前', content: 'TalowMniCMV4I<br>76DE0823B1' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .message-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .message-item {
    background-color: #3498db;
    color: white;
    padding: 10px;
    border-radius: 5px;
    width: calc(33.33% - 10px);
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .message-icon {
    background-color: black;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .message-content {
    margin-bottom: 5px;
  }
  
  .message-footer {
    font-size: 0.8em;
    text-align: right;
  }
  </style>