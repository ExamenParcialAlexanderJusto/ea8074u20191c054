<script setup>
import {useI18n} from "vue-i18n";
import BrandLogo from "./brand-logo.vue";
import SidebarNavigation from "./sidebar-navigation.vue";

const { t } = useI18n();
</script>

<template>
  <pv-toast/>
  <header class="app-header">
    <pv-toolbar class="bg-primary border-none border-noround shadow-1">
      <template #start>
        <brand-logo/>
        <h3 class="m-0 ml-3 text-white">{{ t('app.title') }}</h3>
      </template>
    </pv-toolbar>
  </header>
  <sidebar-navigation/>
  <main class="app-content">
    <router-view/>
  </main>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.app-content {
  padding-top: 4.5rem;
  margin-left: 16rem;
}
</style>
