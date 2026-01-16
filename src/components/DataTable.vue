<template>
  <div class="datatable-wrapper">
    <div class="table-header">
      <div class="search-container">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="`Buscar en ${title}...`" 
          class="search-input"
          @input="currentPage = 1"
        />
      </div>
      
      <div class="actions-container">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :value="item[col.key]" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length" class="empty-state">
              No se encontraron resultados para "{{ searchQuery }}"
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="info">
        Mostrando {{ paginatedData.length }} de {{ filteredData.length }} registros 
        <span v-if="searchQuery">(filtrado de {{ data.length }})</span>
      </div>
      
      <div class="pagination-controls">
        <button @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
        <span class="page-number">Página {{ currentPage }} de {{ totalPages || 1 }}</span>
        <button @click="currentPage++" :disabled="currentPage >= totalPages">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Registros' },
  data: { type: Array as () => any[], required: true },
  columns: { type: Array as () => { key: string, label: string }[], required: true },
  pageSize: { type: Number, default: 10 }
})

const searchQuery = ref('')
const currentPage = ref(1)

// Filtrado masivo eficiente
const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  const query = searchQuery.value.toLowerCase()
  return props.data.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(query))
  )
})

const totalPages = computed(() => Math.ceil(filteredData.length / props.pageSize))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})
</script>

<style scoped>
.datatable-wrapper {
  width: 100%;
  height: 100%; /* Usa todo el alto disponible del main */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Evita que el wrapper se salga */
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap; /* PERMITE QUE EL BOTON BAJE SI NO HAY ESPACIO (Móvil) */
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px; /* Evita que el buscador desaparezca */
  max-width: 450px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border-radius: 8px;
  border: 1px solid var(--btn-border);
  background: var(--card-bg);
  color: var(--font-color);
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.table-container {
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--btn-border);
  border-radius: 12px;
  /* El scroll lateral ocurre AQUÍ dentro, no en la página entera */
  overflow-x: auto; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

table {
  width: 100%;
  border-collapse: collapse;
  /* Esto asegura que las columnas tengan un ancho mínimo y no se aplasten */
  table-layout: auto; 
}

th, td {
  padding: 14px 18px;
  /* Evita que el texto de las celdas se rompa en mil líneas */
  white-space: nowrap; 
}

th {
  background: rgba(100, 108, 255, 0.05);
  padding: 14px 18px;
  text-align: left;
  font-size: 0.85rem;
  color: #646cff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 14px 18px;
  border-top: 1px solid var(--btn-border);
  color: var(--font-color);
  font-size: 0.9rem;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  font-size: 0.85rem;
  color: var(--font-color);
  opacity: 0.8;
}

.pagination-controls { display: flex; align-items: center; gap: 15px; }

.pagination-controls button {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--btn-border);
  background: var(--card-bg);
  color: var(--font-color);
  cursor: pointer;
}

.pagination-controls button:disabled { opacity: 0.3; cursor: not-allowed; }

.empty-state { text-align: center; padding: 3rem; opacity: 0.5; }
</style>