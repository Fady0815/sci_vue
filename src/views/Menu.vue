<template>
  <div class="app-wrapper">
    
    <main class="content">
      <div class="welcome-container">
        <h1>Panel de Control</h1>
        <p>Selecciona una opción en el menú superior para comenzar.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: var(--background-color); /* Asegura que el fondo cubra todo */
}

.content {
  /* 64px es la altura del Navbar + 20px de espacio extra para que respire */
  padding-top: calc(64px + 2rem); 
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: 1200px;
  margin: 0 auto; /* Centra el contenido en pantallas muy grandes */
}

.welcome-container { 
  background-color: var(--card-bg); 
  color: var(--font-color); 
  border: 1px solid var(--btn-border); 
  padding: 2rem;
  border-radius: 12px;
}

/* Ajuste para móviles */
@media (max-width: 768px) {
  .content {
    /* En móvil la navbar puede ser más alta si el contenido se ajusta */
    padding-top: 100px; 
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>