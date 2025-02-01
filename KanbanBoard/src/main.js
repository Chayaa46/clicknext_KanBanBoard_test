import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)  // เพิ่ม router เข้าไปในแอพพลิเคชัน
app.mount('#app')