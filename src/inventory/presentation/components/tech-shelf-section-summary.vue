<script setup>
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {TechShelfSection} from "../../domain/model/tech-shelf-section.entity.js";
import {useCurrencyFormatter} from "../../../shared/presentation/composables/use-currency-formatter.js";

const props = defineProps({
  techShelfSection: {type: TechShelfSection, required: true},
  laptopInventoryItems: {type: Array, default: () => []}
});

const {t} = useI18n();
const {formatCurrency} = useCurrencyFormatter();

const totalLaptops = computed(() => props.techShelfSection.calculateTotalLaptops(props.laptopInventoryItems));
const availableCapacity = computed(() => props.techShelfSection.calculateAvailableCapacity(props.laptopInventoryItems));
</script>

<template>
  <pv-card class="h-full shadow-2">
    <template #header>
      <div class="px-4 pt-4 pb-2 border-bottom-1 surface-border">
        <h3 class="m-0 text-xl font-semibold text-color">{{ techShelfSection.name }}</h3>
      </div>
    </template>
    <template #content>
      <p v-if="!laptopInventoryItems.length" class="m-0 text-color-secondary font-medium">
        {{ t('tech-shelf-section-summary.no-laptops') }}
      </p>
      <ul v-else class="list-none m-0 p-0 flex flex-column gap-3">
        <li v-for="item in laptopInventoryItems" :key="item.id" class="flex align-items-center gap-3">
          <img :src="item.imageUrl" :alt="item.laptopName" class="laptop-thumbnail border-round surface-100"/>
          <div class="flex flex-column flex-1">
            <span class="font-semibold text-color">{{ item.laptopName }}</span>
            <span class="text-primary font-bold">{{ formatCurrency(item.price) }}</span>
          </div>
          <span class="text-color-secondary">{{ t('tech-shelf-section-summary.quantity') }}: <b>{{ item.quantity }}</b></span>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex justify-content-between pt-2 border-top-1 surface-border">
        <span>{{ t('tech-shelf-section-summary.total-laptops') }}: <b>{{ totalLaptops }}</b></span>
        <span>{{ t('tech-shelf-section-summary.available-capacity') }}: <b>{{ availableCapacity }}</b></span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.laptop-thumbnail {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
}
</style>
