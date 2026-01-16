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
.app-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* --- LOGICA DE DISEÑO --- */

/* Si el menú es SUPERIOR (Top) */
.layout-top { flex-direction: column; }
.layout-top .content {
  padding-top: calc(64px + 2rem);
  width: 100%;
}

/* Si el menú es LATERAL (Left) */
.layout-left { flex-direction: row; }
.layout-left .content {
  margin-left: 260px; /* Ancho de la barra lateral */
  padding-top: 2rem;
  width: calc(100% - 260px);
}

.content {
  flex: 1;
  width: 100%; /* Asegura que ocupe el ancho disponible */
  max-width: 100%; /* Cambia el 1200px por 100% para que sea fluido */
  margin: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .layout-left .content { margin-left: 0; width: 100%; padding-top: 80px; }
}

/* Si quieres un límite de ancho, aplícalo solo en pantallas muy grandes */
@media (min-width: 1600px) {
  .content {
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>