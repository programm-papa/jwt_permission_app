import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import permissionDirective from '@/directive/permissionDirective' // Путь к вашему файлу с директивой

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('permission', permissionDirective)

app.mount('#app')
