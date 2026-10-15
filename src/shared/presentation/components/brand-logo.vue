<script setup>
import {LogoApi} from "../../infrastructure/logo-api.js";

const brandDomain = import.meta.env.VITE_BRAND_DOMAIN;
const logoApi = new LogoApi();
const logoUrl = logoApi.getUrlToLogo(brandDomain);
</script>

<template>
  <img :src="logoUrl" alt="Saga Falabella Peru" class="brand-logo border-round"/>
</template>

<style scoped>
.brand-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  background-color: #ffffff;
}
</style>
