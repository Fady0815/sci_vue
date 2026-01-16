import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Menu from '@/views/Menu.vue'
import Ventas from '@/views/Ventas.vue'
import Materiales from '@/views/Materiales.vue'
import NotFound from '@/views/NotFound.vue' // Asegúrate de que el nombre coincida

const routes = [
  { 
    path: '/', 
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/menu', 
    name: 'Menu',
    component: Menu,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/ventas', 
    name: 'Ventas',
    component: Ventas,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/materiales', 
    name: 'Materiales',
    component: Materiales,
    meta: { requiresAuth: true } 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- EL GUARD DE NAVEGACIÓN VA AQUÍ, ANTES DEL EXPORT ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si intenta entrar a una ruta privada sin token, al login
    next('/'); 
  } 
  else if (to.path === '/' && isAuthenticated) {
    // Si ya está logueado e intenta ir al login, al menu
    next('/menu'); 
  }
  else {
    // En cualquier otro caso (como ir a una ruta pública o si tiene token), adelante
    next();
  }
});

export default router;