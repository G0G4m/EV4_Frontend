<template>
  <div>
    <h2>Lista de Inversiones</h2>
    <ul v-if="inversiones.length > 0">
      <li v-for="inv in inversiones" :key="inv.id" class="item">
        <template v-if="editandoId === inv.id">
          <input v-model="editNombre" placeholder="Nombre" />
          <input
            v-model.number="editCantidad"
            type="number"
            min="0.0001"
            step="0.0001"
            placeholder="Cantidad (hasta 4 decimales)"
          />
          <button @click="guardarEdicion">Guardar</button>
          <button @click="cancelarEdicion">Cancelar</button>
        </template>
        <template v-else>
          <strong>{{ inv.nombre }}</strong> — Cantidad: {{ inv.cantidad.toFixed(4) }} — Precio: ${{ inv.precioCompra.toFixed(2) }} — Total: ${{ (inv.cantidad * inv.precioCompra).toFixed(2) }}
          <button @click="empezarEdicion(inv)">Editar</button>
          <button @click="eliminar(inv.id)">Eliminar</button>
        </template>
      </li>
    </ul>
    <p v-else>No hay inversiones registradas.</p>
    <p><strong>Total del portafolio:</strong> ${{ totalPortafolio.toFixed(2) }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const inversiones = ref([]);
const editandoId = ref(null);
const editNombre = ref("");
const editCantidad = ref(null);

function cargarInversiones() {
  const data = JSON.parse(localStorage.getItem("inversiones") || "[]");
  inversiones.value = data;
}

function eliminar(id) {
  inversiones.value = inversiones.value.filter((inv) => inv.id !== id);
  localStorage.setItem("inversiones", JSON.stringify(inversiones.value));
  if (editandoId.value === id) cancelarEdicion();
}

const totalPortafolio = computed(() =>
  inversiones.value.reduce((acc, inv) => acc + inv.cantidad * inv.precioCompra, 0)
);

function empezarEdicion(inversion) {
  editandoId.value = inversion.id;
  editNombre.value = inversion.nombre;
  editCantidad.value = inversion.cantidad;
}

function cancelarEdicion() {
  editandoId.value = null;
  editNombre.value = "";
  editCantidad.value = null;
}

function guardarEdicion() {
  if (!editNombre.value.trim()) {
    alert("El nombre no puede estar vacío");
    return;
  }
  if (
    editCantidad.value === null ||
    isNaN(editCantidad.value) ||
    editCantidad.value < 0.0001
  ) {
    alert("Cantidad inválida");
    return;
  }
  // Limitar decimales a 4
  const decimales = editCantidad.value.toString().split(".")[1];
  if (decimales && decimales.length > 4) {
    alert("La cantidad no puede tener más de 4 decimales");
    return;
  }

  const index = inversiones.value.findIndex((inv) => inv.id === editandoId.value);
  if (index !== -1) {
    inversiones.value[index].nombre = editNombre.value.trim();
    inversiones.value[index].cantidad = parseFloat(editCantidad.value);
    // precioCompra queda igual
    localStorage.setItem("inversiones", JSON.stringify(inversiones.value));
  }
  cancelarEdicion();
}

onMounted(() => {
  cargarInversiones();
});
</script>

<style scoped>
.item {
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
  background-color: #2980b9;
  border: none;
  color: white;
  padding: 4px 8px;
  cursor: pointer;
}
button:hover {
  background-color: #3498db;
}
button:last-child {
  background-color: #e74c3c;
}
button:last-child:hover {
  background-color: #c0392b;
}
input {
  margin-right: 6px;
  padding: 2px 6px;
  width: 150px;
}
</style>
