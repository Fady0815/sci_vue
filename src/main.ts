import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa tu configuración
import './styles/theme.css'

const app = createApp(App)

app.use(router) // <--- ¡Esto es vital!
app.mount('#app')