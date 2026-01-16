<template>
  <nav :class="['navbar', `is-${posicion}`]">
    <div class="navbar-content">
      <div class="brand" @click="router.push('/menu')">⚡ ERP</div>
      
      <div class="links">
        <button @click="router.push('/ventas')" :class="['nav-link', { active: route.path === '/ventas' }]">
          💰 Ventas
        </button>
        <button @click="router.push('/materiales')" :class="['nav-link', { active: route.path === '/materiales' }]">
          📦 Materiales
        </button>
      </div>

      <div class="user-container">
        <UserDropdown 
            :posicion="posicion" 
            @cambiar-posicion="(p) => $emit('cambiar-posicion', p)" 
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import UserDropdown from './UserDropdown.vue'

const props = defineProps(['posicion'])
const emit = defineEmits(['cambiar-posicion'])

const router = useRouter()
const route = useRoute()

const togglePosicion = () => {
  const nuevaPos = props.posicion === 'top' ? 'left' : 'top'
  emit('cambiar-posicion', nuevaPos)
}
</script>

<style scoped>
.navbar {
  position: fixed;
  background-color: var(--background-color);
  border: 1px solid var(--btn-border);
  z-index: 1000;
  display: flex;
  transition: all 0.3s ease;
}

/* --- ESTILO CUANDO ESTÁ ARRIBA --- */
.is-top {
  top: 0; left: 0; width: 100%; height: 64px;
  align-items: center;
}
.is-top .navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
}
.is-top .links { display: flex; gap: 0.5rem; margin-left: 2rem; margin-right: auto; }

/* --- ESTILO CUANDO ESTÁ AL LADO --- */
.is-left {
  top: 0; left: 0; width: 260px; height: 100vh;
  flex-direction: column;
}
.is-left .navbar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 1rem;
  gap: 2rem;
}
.is-left .links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.is-left 

.user-container {
  display: flex;
  align-items: center;
  gap: 15px; /* Esto evita que se amontonen los botones */
  position: relative;
}

/* Comunes */
.brand { font-weight: bold; font-size: 1.2rem; cursor: pointer; }
.nav-link {
  background: transparent; border: none; color: var(--font-color);
  padding: 10px 15px; border-radius: 6px; cursor: pointer; text-align: left;
}
.nav-link.active { background-color: rgba(100,108,255,0.15); color: #646cff; font-weight: 600; }

.toggle-layout {
  background: var(--btn-border);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  margin-right: 10px;
}
</style>