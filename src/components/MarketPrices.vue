<template>
  <div>
    <h2>Precios de Criptomonedas</h2>
    <ul v-if="monedas.length > 0">
      <li v-for="coin in monedas" :key="coin.id">
        {{ coin.name }} ({{ coin.symbol }}) — ${{ parseFloat(coin.priceUsd).toFixed(2) }}
      </li>
    </ul>
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const monedas = ref([]);
const API_KEY = '30634caf98daa3e3c99e19b6f77dd24042a88cf381dd957562de642996412dda';

function getRandomSubarray(arr, size) {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - size;
  while (i-- > min) {
    const index = Math.floor(Math.random() * (i + 1));
    [shuffled[index], shuffled[i]] = [shuffled[i], shuffled[index]];
  }
  return shuffled.slice(min);
}

async function cargarMonedas() {
  try {
    const res = await fetch(`https://rest.coincap.io/v3/assets?apiKey=${API_KEY}&limit=5`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const data = await res.json();
    monedas.value = getRandomSubarray(data.data, 5);
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

let intervalId = null;

onMounted(() => {
  cargarMonedas();
  intervalId = setInterval(cargarMonedas, 10000); // cada 10 segundos
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
h2 {
  color: #3c556e;
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 4px 0;
}
div {
  background-color: rgb(40, 40, 40);
  border-radius: 1em;
  padding: 1em;
}
</style>
