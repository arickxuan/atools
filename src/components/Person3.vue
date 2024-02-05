<template>
    <div>
        xing:<input type="text" v-model="firstName">
        ming:<input type="text" v-model="lastName">
        <p>{{ fullName }}</p>
        <p>{{ fullName2 }}</p>
        <button @click="changeFullName2">chang fullName2</button>
    </div>
</template>

<script setup>
import {computed, defineModel} from 'vue'

let firstName = defineModel("zhang")
let lastName = defineModel("san")
let fullName = computed(() => firstName.value + '-' + lastName.value)
let fullName2 = computed({
    get() {
        return firstName.value + '-' + lastName.value
    },
    set(val) {
        const [fName, lName] = val.split('-')
        firstName.value = fName
        lastName.value = lName
    }
})
function changeFullName2(){
    fullName2.value = '李-四3'
}

</script>
<script>
export default {
    name: 'Person3',
}
</script>
<style lang="">
    
</style>