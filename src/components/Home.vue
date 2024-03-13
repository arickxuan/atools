<template>
    <v-app>
        <v-app-bar app color="orange" dark>
            <v-toolbar-title>MusicFree</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app>
            <v-list dense>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>My Playlists</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-chart-line</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Top Charts</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Downloads</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-music-box</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Local Music</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Playlists</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-card>
                            <v-card-title>
                                <v-icon large color="yellow">mdi-vinyl</v-icon>
                                <span class="ml-3">My Playlists</span>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn  color="orange">Manage Playlists</v-btn>
                                <v-btn color="orange">Add to Queue</v-btn>
                            </v-card-actions>
                            <v-data-table hide-default-footer :headers="headers" :items="items"></v-data-table>
                            <v-card-text class="text-center">No tracks added yet...</v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card>
                            <v-card-title>
                                <v-avatar color="green" size="36">
                                    <v-icon dark>mdi-account-circle</v-icon>
                                </v-avatar>
                                <span class="ml-3">Username</span>
                            </v-card-title>
                            <v-card-text>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon>mdi-heart</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>My Likes</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon>mdi-music-note</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>qq</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon>mdi-playlist-music</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>My Playlists</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import plugins from "../utils/music.json"
// const tab = ref('one')
const search = ref('')
const items = [
    {
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
    // ... more items
]

onMounted(async () => {
    console.log('mounted')
    console.log(plugins)
    // let p1 = await import(plugins.plugins[0].url)
    let platformConfig: any = await import("../utils/qq.js")
    let res = await platformConfig.default.search("周杰伦",1,"artist")
    console.log(res)
    
})

function doSearch() {
    console.log(search.value)

}

const headers = ref([
    { text: '#', value: 'index' },
    { text: 'Title', value: 'title' },
    { text: 'Artist', value: 'artist' },
    { text: 'Album', value: 'album' },
    { text: 'Duration', value: 'duration' },
])

</script>

<script lang="ts" type="module">
export default {
    name: 'Home',
}

</script>