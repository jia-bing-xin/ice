import '@/styles/reset'
import { createApp } from 'vue'
import { router } from '@/router'
//引入国际化组件
import i18n from '@/plugins/vueI18n';

import App from '@/App.vue'

const app = createApp(App)

app.use(i18n).use(router)
app.mount('#app')