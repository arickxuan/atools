// import { initReactI18next } from 'react-i18next';
import VueI18n from 'Vue-I18n';
import zh_CN from './locales/zh_CN.json';
import en_US from './locales/en_US.json';

const messages = {
    zh: {
        zh_CN
    },
    en: {
        en_US
    }
}



const i18n = VueI18n.createI18n({
    locale: 'zh', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

export default i18n;