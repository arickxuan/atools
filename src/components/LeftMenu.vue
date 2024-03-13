<script lang="ts">
export default {
    name: 'LeftMenu',
}
</script>
<template>
    <v-navigation-drawer align-tabs="start"  v-model="drawer" > 
     <!-- expand-on-hover rail -->
        <v-list>
            <v-list-item link title="List Item 1"></v-list-item>
            <v-list-item link title="List Item 2"></v-list-item>
            <v-list-item link title="List Item 3"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts" >

import { ref } from 'vue'

const drawer = ref(true)
</script>

