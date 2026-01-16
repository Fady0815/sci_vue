<template>
  <div class="user-section" v-outside-click="() => mostrar = false">
    <button @click="mostrar = !mostrar" class="user-btn">
      👤 {{ nombreUsuario }} <span class="arrow">▾</span>
    </button>

    <transition name="fade">
      <div v-if="mostrar" :class="['dropdown', `dropdown-${posicion}`]">
        <div class="dropdown-header">Configuración</div>
        
        <button @click="togglePosicion" class="dropdown-item">
          {{ posicion === 'top' ? '🔳 Cambiar a Vista Lateral' : '📑 Cambiar a Vista Superior' }}
        </button>

        <button @click="toggleTheme" class="dropdown-item">
          {{ isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
        </button>

        <hr class="divider" />
        <div class="dropdown-header">Mi Cuenta</div>
        <button class="dropdown-item">👤 Perfil</button>
        
        <hr class="divider" />
        <button @click="cerrarSesion" class="dropdown-item logout">🚪 Cerrar Sesión</button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  posicion: { type: String, default: 'top' }
})

const emit = defineEmits(['cambiar-posicion'])

const router = useRouter()
const mostrar = ref(false)
const isDark = ref(localStorage.getItem('theme') === 'dark')
const nombreUsuario = ref(localStorage.getItem('user_name') || 'Usuario')

// Función para emitir el cambio al Navbar y luego al App.vue
const togglePosicion = () => {
  const nuevaPos = props.posicion === 'top' ? 'left' : 'top'
  emit('cambiar-posicion', nuevaPos)
  mostrar.value = false // Opcional: cierra el menú al cambiar
}

const aplicarTema = (oscuro: boolean) => {
  if (oscuro) document.documentElement.classList.add('dark-mode')
  else document.documentElement.classList.remove('dark-mode')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  aplicarTema(isDark.value)
}

const cerrarSesion = () => {
  localStorage.removeItem('user_token'); localStorage.removeItem('user_name');
  router.push('/')
}

const vOutsideClick = {
  mounted: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) binding.value()
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el: any) => document.removeEventListener('click', el.clickOutsideEvent)
}
aplicarTema(isDark.value)
</script>

<style scoped>
/* Los estilos se mantienen iguales al paso anterior para asegurar que 
   el posicionamiento .dropdown-top y .dropdown-left funcione bien */

.user-section { position: relative; display: inline-block; }

.user-btn {
  background: transparent;
  border: 1px solid var(--btn-border);
  padding: 8px 15px;
  border-radius: 8px;
  color: var(--font-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown {
  position: absolute;
  z-index: 1100;
  min-width: 240px; /* Un poco más ancho para que quepa el texto largo */
  background-color: var(--background-color);
  border: 1px solid var(--btn-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  overflow: hidden;
}

.dropdown-top { top: calc(100% + 10px); right: 0; }
.dropdown-left { top: 0; left: calc(100% + 15px); right: auto; }

.dropdown-header { font-size: 0.7rem; padding: 12px 15px; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.5px; }
.dropdown-item { width: 100%; border: none; background: transparent; padding: 12px 15px; color: var(--font-color); cursor: pointer; text-align: left; font-size: 0.9rem; }
.dropdown-item:hover { background: rgba(100,108,255,0.1); }
.divider { border: none; border-top: 1px solid var(--btn-border); margin: 4px 0; }
.logout { color: #ff4d4d; }

.fade-enter-active, .fade-leave-active { transition: all 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }
</style>