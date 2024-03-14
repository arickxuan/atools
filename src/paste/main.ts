import { createApp } from "vue";
import router from "./router/router.ts";
// import i18n from "./i18n";
// import "./styles.css";
// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'

// import 'mdui/mdui.css';
// import 'mdui';


// import { createVuetify } from 'vuetify'
// import PrimeVue from "primevue/config";
import App from "./App.vue";

// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//     components,
//     directives
// })

const app = createApp(App);
app.use(router);
// app.use(i18n);
// app.use(PrimeVue);
// app.use(vuetify);
app.mount("#app");
