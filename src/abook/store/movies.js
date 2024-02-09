import {defineStore} from 'pinia'


export const useCurrentMoviesStore = defineStore('currentMovies', () => {
    let name = ref('')
    let url = ref('')
    let content = ref('')
    let iteam = ref({})

    const doubleCount = computed(() => name.value +="~")
    function increment() {
        name += "~"
    }

    return { iteam, content,url }
})