<script setup>
import { useI18n } from "vue-i18n";
import TechShelfSectionSummaryList from "../../../inventory/presentation/components/tech-shelf-section-summary-list.vue";

const { t } = useI18n();
</script>

<template>
  <section class="p-4 md:p-5">
    <div class="flex flex-column gap-3">
      <h1 class="m-0 text-4xl font-bold text-color">{{ t('home.title') }}</h1>
      <p class="m-0 text-xl line-height-3 text-color-secondary">{{ t('home.content') }}</p>
      <tech-shelf-section-summary-list/>
    </div>
  </section>
</template>
