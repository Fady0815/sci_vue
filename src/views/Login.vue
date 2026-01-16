<template>
  <div class="login-wrapper">
    <div class="login-card">
      <img src="/user-icon.png" alt="Usuario" class="login-icon" />
      <h2 class="login-title">Bienvenido al ERP</h2>
      
      <form @submit.prevent="login" class="login-form">
        <input v-model="user" placeholder="Usuario" class="login-input" />
        <input v-model="pass" type="password" placeholder="Contraseña" class="login-input" />
        <button type="submit" class="login-btn">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref('')
const pass = ref('')

const login = () => {
  if (user.value && pass.value) {
    // 1. Guardamos una señal de que el usuario inició sesión
    // Debe coincidir con el nombre que pusimos en router/index.ts (user_token)
    localStorage.setItem('user_token', 'token-de-sesion-valido');
    localStorage.setItem('user_name', user.value); // Guardamos el nombre

    // 2. Ahora sí, navegamos
    router.push('/menu')
  } else {
    alert("Por favor, llena todos los campos");
  }
}
</script>

<style scoped>
/* Contenedor centrado */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* ocupa toda la pantalla */
  background: var(--background-color); /* usa tu tema */
}

/* Tarjeta */
.login-card {
  background-color: var(--card-bg);
  color: var(--font-color);
  border: 1px solid var(--btn-border);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  text-align: center;
  max-width: 350px;
  width: 100%;
}

/* Imagen */
.login-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: 50%;
}

/* Título */
.login-title {
  margin-bottom: 1.5rem;
  color: var(--font-color);
}

/* Formulario */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-input {
  padding: 10px;
  border: 1px solid var(--btn-border);
  border-radius: 6px;
  font-size: 1rem;
}

.login-btn {
  background: #646cff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #4a50d1;
}

/* Ajustes para modo oscuro */
.dark-mode .login-card {
  background: rgba(30, 30, 30, 0.95);
}

.dark-mode .login-input {
  background: #222;
  color: #eee;
  border: 1px solid #555;
}
</style>
