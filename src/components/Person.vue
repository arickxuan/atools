<script setup>
import {reactive, toRefs} from 'vue'

let username = refchangeFullName2("张三");

let age2 = 32
let address = '北京'

async function updateName() {
  console.log(username.value)
  username.value = '李四'
}

function updateAge2() {
  age = age +1
}

function showCity() {
  address = '上海'
  alert(address)
}

let citys = reactive([{ 'name': '北京', 'id': '1' }, { 'name': '上海', 'id': '2' }, { 'name': '深圳', 'id': '3' }])

function addCity() {
  citys.push({ 'name': '杭州', 'id': '4'})
}

function resetCity() {
  Object.assign(citys, [{ 'name': '北京2', 'id': '1' }, { 'name': '上海3', 'id': '2' }, { 'name': '深圳', 'id': '3' }])
}

let personA = reactive({
  name: '张三',
  age: 18,
  address: '北京2'
})

let { name, age } = toRefs(personA)
function resetPersonA() {
  name.value += '~'
  age.value++
}



</script>

<script>
export default {
  name: 'Person',
  props: {
    name: String,
    age: Number,
    address: String,
  },
  data() {
    return {
      name3: '张三',
      age3: 18,
      address3: '北京2'
    }
  },
  methods: {
    updateName() {
      this.name3 = '李四'
    },
    updateAge() {
      this.age3++
    },
    showCity() {
      this.address3 = '上海'
      alert(this.address)
    }
  }
}
</script>

<template>
  <div class="person">
    <ul>
      <li>名字 : {{ username }}</li>
      <li>年龄 : {{ age3 }}</li>
      <li>籍贯 : {{ address3 }}</li>
    </ul>
    <div class="tools">
      <button @click="updateName">修改名字</button>
      <button @click="updateAge">修改年龄</button>
      <button @click="showCity">显示</button>
      <button @click="addCity">添加城市</button>
      <button @click="resetCity">重置城市</button>
      <button @click="resetPersonA">重置personA</button>
    </div>

    <ul>
      <li v-for="c in citys" :key="c.id">城市 : {{ c.name }}</li>
    </ul>

    <ul>
      <li>名字 : {{ name }}</li> 
      <li>年龄 : {{ age }}</li> 
    </ul>

    

  </div>
</template>

<style scoped></style>