<template>
  <div class="view-container">
    <div class="page-title">
      <h1>📦 Almacén de Materiales</h1>
    </div>

    <DataTable 
      title="Materiales" 
      :data="listaMateriales" 
      :columns="columnas"
      :pageSize="10"
    >
      <template #actions>
        <button class="primary-btn">+ Nuevo Material</button>
      </template>

      <template #cell-estado="{ value }">
        <span :class="['badge', getStatusClass(value)]">
          {{ value }}
        </span>
      </template>

      <template #cell-acciones="{ item }">
        <div class="row-actions">
          <button @click="editar(item)" title="Editar" class="action-icon">✏️</button>
          <button @click="eliminar(item)" title="Eliminar" class="action-icon delete">🗑️</button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from '../components/DataTable.vue'

const columnas = [
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Descripción' },
  { key: 'stock', label: 'Stock Actual' },
  { key: 'estado', label: 'Estado' },
  { key: 'acciones', label: 'Opciones' }
]

const listaMateriales = ref<any[]>([])

onMounted(() => {
  // Generar 10,000 registros para testing de rendimiento
  const temporal = []
  const bases = ['Placa Acero', 'Motor CV', 'Sensor Prox', 'Cable Unif', 'Tuerca Galv']
  
  for (let i = 1; i <= 10000; i++) {
    const stock = Math.floor(Math.random() * 500)
    temporal.push({
      codigo: `MAT-${String(i).padStart(5, '0')}`,
      nombre: `${bases[Math.floor(Math.random() * bases.length)]} - Lote #${i}`,
      stock: stock,
      estado: stock === 0 ? 'Agotado' : (stock < 20 ? 'Bajo Stock' : 'Disponible'),
    })
  }
  listaMateriales.value = temporal
})

const getStatusClass = (status: string) => {
  if (status === 'Disponible') return 'success'
  if (status === 'Bajo Stock') return 'warning'
  return 'danger'
}

const editar = (item: any) => alert(`Editando ${item.codigo}`)
const eliminar = (item: any) => confirm(`¿Eliminar ${item.nombre}?`)
</script>

<style scoped>
.view-container {
  width: 100%;
  max-width: 100%; /* Asegura que no haya límites en monitores anchos */
  display: flex;
  flex-direction: column;
}
.page-title {
  margin-bottom: 1.5rem;
}
.page-title h1 { font-size: 1.8rem; margin: 0; color: var(--font-color); }
.page-title p { margin: 5px 0 0 0; opacity: 0.6; }

.primary-btn {
  background: #646cff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.primary-btn:hover { background: #535bf2; }

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.success { background: rgba(76, 175, 80, 0.15); color: #4caf50; }
.warning { background: rgba(255, 152, 0, 0.15); color: #ff9800; }
.danger { background: rgba(244, 67, 54, 0.15); color: #f44336; }

.row-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-start; /* Alinea los iconos de editar/borrar */
}
.action-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
  border-radius: 4px;
}
.action-icon:hover { background: rgba(100,108,255,0.1); }
.action-icon.delete:hover { background: rgba(244,67,54,0.1); }
</style>