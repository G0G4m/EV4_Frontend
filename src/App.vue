<template>
  <div id="app" style="max-width: 800px; margin: auto; padding: 1rem;">
    <h1>Portafolio de Inversiones</h1>
    <MarketPrices />
    <InvestmentForm @inversion-agregada="recargarLista" />
    <InvestmentList :key="listaKey" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import InvestmentForm from "./components/InvestmentForm.vue";
import InvestmentList from "./components/InvestmentList.vue";
import MarketPrices from "./components/MarketPrices.vue";

const listaKey = ref(0);

function recargarLista() {
  listaKey.value++;
}
</script>

