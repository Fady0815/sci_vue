<template>
  <div :class="['app-wrapper', `layout-${diseno}`]">
    
    <Navbar 
      v-if="mostrarNav" 
      :posicion="diseno" 
      @cambiar-posicion="(p) => diseno = p" 
    />
    
    <main :class="{ 'content': mostrarNav }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
// DISEÑO POR DEFECTO: 'top'
const diseno = ref('top'); 

const mostrarNav = computed(() => route.name !== 'NotFound' && route.path !== '/');
</script>

<style>
/* App.vue - Estilos Corregidos */

.app-wrapper {
  display: flex;
  height: 100vh; /* Obliga a la app a medir exactamente lo que mide la pantalla */
  width: 100vw;
  overflow: hidden; /* Prohibido el scroll en toda la pantalla */
}

/* MODO SUPERIOR */
.layout-top { 
  flex-direction: column; 
}
.layout-top .content {
  width: 100%;
  padding-top: calc(64px + 2rem); /* Altura del nav + espacio */
  padding-left: 2rem;
  padding-right: 2rem;
}

/* MODO LATERAL */
.layout-left { 
  flex-direction: row; 
}
.layout-left .content {
  flex: 1; /* Esto hace que el contenido tome TODO el ancho restante automáticamente */
  margin-left: 260px; /* Espacio exacto para el Navbar fijo */
  padding: 2rem;
  min-width: 0; /* MUY IMPORTANTE: evita que los hijos (tablas) rompan el flexbox */
}

.content {
  box-sizing: border-box;
  transition: padding 0.3s ease, margin 0.3s ease;
}

/* Responsive: Cuando el menú lateral se oculta o se pone arriba */
@media (max-width: 768px) {
  .layout-left .content { 
    margin-left: 0; 
    padding-top: 80px; 
  }
}
</style>