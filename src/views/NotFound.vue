<template>
  <div class="not-found-container">
    <div class="error-card">
      <span class="error-code">404</span>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la sección que buscas no existe o ha sido movida.</p>
      
      <button @click="goHome" class="back-button">
        🏠 Volver al Inicio
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
  // Te redirige al menú principal
  router.push('/menu')
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh; /* Centrado vertical relativo al contenido */
  text-align: center;
}

.error-card {
  background-color: var(--card-bg);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid var(--btn-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  display: block;
  color: #646cff; /* El color lila que usas en el active */
  margin-bottom: 0.5rem;
  line-height: 1;
}

h1 {
  color: var(--font-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  color: var(--font-color);
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.back-button {
  background-color: #646cff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.back-button:hover {
  background-color: #535bf2;
  transform: translateY(-2px);
}

.back-button:active {
  transform: translateY(0);
}
</style>