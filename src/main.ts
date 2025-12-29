import { createApp } from 'vue'
import App from './App.vue'
import pinia from './app/providers/app-pinia'
import router from './app/providers/app-router'

import './shared/assets/styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
