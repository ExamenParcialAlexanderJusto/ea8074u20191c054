<script setup>
import {onMounted, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import useInventoryStore from "../../application/inventory.store.js";
import TechShelfSectionSummary from "./tech-shelf-section-summary.vue";

const {t} = useI18n();
const store = useInventoryStore();
const {techShelfSections, errors} = toRefs(store);
const {fetchTechShelfSections, fetchLaptopInventoryItems, getLaptopInventoryItemsBySectionId} = store;

onMounted(() => {
  if (!store.techShelfSectionsLoaded) fetchTechShelfSections();
  if (!store.laptopInventoryItemsLoaded) fetchLaptopInventoryItems();
});
</script>

<template>
  <section class="mt-3">
    <h2 class="text-2xl font-bold text-color">{{ t('tech-collections.title') }}</h2>
    <div class="grid">
      <div v-for="section in techShelfSections" :key="section.id" class="col-12 md:col-6">
        <tech-shelf-section-summary
            :tech-shelf-section="section"
            :laptop-inventory-items="getLaptopInventoryItemsBySectionId(section.id)"/>
      </div>
    </div>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </section>
</template>
