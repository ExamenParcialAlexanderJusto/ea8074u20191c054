<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const unavailableRoute = route.path;
const { t } = useI18n();

const navigateToHome = () => {
  router.push({name: 'home'});
};
</script>

<template>
  <section class="p-4 md:p-5">
    <div class="flex flex-column align-items-start gap-3">
      <h1 class="m-0 text-4xl font-bold text-color">{{ t('page-not-found.title') }}</h1>
      <p class="m-0 line-height-3 text-color-secondary">
        {{ t('page-not-found.content', { 'unavailable-route': unavailableRoute }) }}
      </p>
      <pv-button :label="t('page-not-found.go-home')" icon="pi pi-home" @click="navigateToHome"/>
    </div>
  </section>
</template>
