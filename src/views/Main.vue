<script lang="ts">
export default {
    name: "Main",
};
</script>
<template>
    <!-- <v-layout class="rounded rounded-md">
        <LeftMenu /> -->
        <!-- <v-app-bar :elevation="2" rounded>
            <template v-slot:prepend class="width:256px;">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer>music </v-spacer>
            </template>

            <v-app-bar-title>
                <v-col cols="4">
                    <v-text-field v-model="search" hide-details="auto" label="Main input"></v-text-field>
                </v-col>
            </v-app-bar-title>

            <template v-slot:append>
                <v-btn icon="mdi-heart"></v-btn>

                <v-btn icon="mdi-magnify"></v-btn>

                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar> -->

        <!-- <v-main style="min-height: 300px;">
            <Home />
        </v-main>

        <v-bottom-navigation grow>
            <v-btn value="recent">
                <v-icon>mdi-history</v-icon>

                <span>Recent</span>
            </v-btn>

            <v-btn value="favorites">
                <v-icon>mdi-heart</v-icon>

                <span>Favorites</span>
            </v-btn>

            <v-btn value="nearby">
                <v-icon>mdi-map-marker</v-icon>

                <span>Nearby</span>
            </v-btn>
        </v-bottom-navigation>

        
    </v-layout> --> 
    <Home />
    <!-- <Layout></Layout> -->
</template>

<script setup lang="ts">
// import LeftMenu from "../components/LeftMenu.vue";
import Home from "../components/Home.vue";
// import Layout from "../components/Layout.vue";
// import { ref } from "vue";

// const drawer = ref(true);
// const search = ref("");

</script>