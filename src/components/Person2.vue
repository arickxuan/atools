<template>
    <div>
        <div>
            <input type="text" v-model="firstName">
            <input type="text" v-model="lastName">
            <p>{{ fullName }}</p>
            <p>{{ fullName2 }}</p>
            <button @click="changeFullName2">chang fullName2</button>
        </div>
    </div>
</template>
<script setup>
import {computed, ref} from 'vue'

let firstName = ref(zhang)
let lastName = ref(san)
let fullName = computed(() => firstName.value + '-' + lastName.value)

function changeFullName2() {
    fullName2.value = '李-四'
}

</script>

<script>
export default {
    name: 'Person2',
}
</script>
<style lang="">
    
</style>