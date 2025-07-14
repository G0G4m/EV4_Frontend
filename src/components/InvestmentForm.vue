<template>
  <div>
    <h2>Agregar Inversión</h2>
    <form @submit.prevent="guardarInversion">
      <input
        v-model="nombre"
        placeholder="Nombre o símbolo (ej: bitcoin o BTC)"
        required
      />
      <input
        v-model="cantidad"
        type="number"
        min="0.0001"
        step="0.0001"
        placeholder="Cantidad de acciones (hasta 4 decimales)"
        required
      />

      <div v-if="precio !== null">
        Precio actual: ${{ precio.toFixed(2) }}
      </div>
      <div v-else-if="cargando">
        Consultando precio...
      </div>
      <div v-else-if="error">
        {{ error }}
      </div>

      <button type="submit" :disabled="precio === null || cargando || !cantidadValida">
        Guardar inversión
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const emit = defineEmits(["inversion-agregada"]);

const API_KEY = "30634caf98daa3e3c99e19b6f77dd24042a88cf381dd957562de642996412dda";

const nombre = ref("");
const cantidad = ref(null);
const precio = ref(null);
const cargando = ref(false);
const error = ref("");

let timeoutId = null;

const cantidadValida = computed(() => {
  if (cantidad.value === null || cantidad.value === "") return false;
  const num = Number(cantidad.value);
  if (isNaN(num)) return false;
  if (num < 0.0001) return false;
  // Limitar a 4 decimales
  const decimalPart = cantidad.value.toString().split(".")[1];
  if (decimalPart && decimalPart.length > 4) return false;
  return true;
});

async function buscarPrecio(nombreActivo) {
  cargando.value = true;
  error.value = "";
  precio.value = null;

  try {
    const buscado = nombreActivo.trim().toLowerCase();

    const res = await fetch(
      `https://rest.coincap.io/v3/assets?apiKey=${API_KEY}&limit=50`,
      {
        headers: { Accept: "application/json" },
      }
    );
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

    const data = await res.json();

    const activo = data.data.find(
      (item) =>
        item.id.toLowerCase() === buscado ||
        item.symbol.toLowerCase() === buscado
    );

    if (activo) {
      precio.value = parseFloat(activo.priceUsd);
    } else {
      error.value = "Activo no encontrado en la API";
    }
  } catch (e) {
    error.value = "Error consultando la API";
    console.error(e);
  } finally {
    cargando.value = false;
  }
}

watch(
  nombre,
  (val) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!val.trim()) {
      precio.value = null;
      error.value = "";
      return;
    }
    timeoutId = setTimeout(() => buscarPrecio(val), 700);
  }
);

function guardarInversion() {
  if (precio.value === null || !cantidadValida.value) return;

  const nueva = {
    id: Date.now(),
    nombre: nombre.value.trim(),
    cantidad: Number(cantidad.value),
    precioCompra: precio.value,
  };

  const data = JSON.parse(localStorage.getItem("inversiones") || "[]");
  data.push(nueva);
  localStorage.setItem("inversiones", JSON.stringify(data));

  // Limpiar formulario
  nombre.value = "";
  cantidad.value = null;
  precio.value = null;

  emit("inversion-agregada");
}
</script>
<style>
input {
  margin: 1em;
  width: auto;
}
</style>