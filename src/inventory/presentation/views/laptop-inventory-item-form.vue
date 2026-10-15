<script setup>
import {computed, onMounted, ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useToast} from "primevue";
import useInventoryStore from "../../application/inventory.store.js";
import {LaptopInventoryItem} from "../../domain/model/laptop-inventory-item.entity.js";
import {useCurrencyFormatter} from "../../../shared/presentation/composables/use-currency-formatter.js";

const {t} = useI18n();
const router = useRouter();
const toast = useToast();
const {formatCurrency} = useCurrencyFormatter();
const store = useInventoryStore();
const {techShelfSections, laptops, laptopsLoaded, errors} = toRefs(store);
const {fetchTechShelfSections, fetchLaptopInventoryItems, fetchLaptopsByCategory,
  getTechShelfSectionById, getAvailableCapacityBySectionId, addLaptopInventoryItem} = store;

const form = ref({sectionId: null, laptopId: null, quantity: 1});

onMounted(() => {
  if (!store.techShelfSectionsLoaded) fetchTechShelfSections();
  if (!store.laptopInventoryItemsLoaded) fetchLaptopInventoryItems();
});

const selectedSection = computed(() => getTechShelfSectionById(form.value.sectionId));
const selectedLaptop = computed(() => laptops.value.find(laptop => laptop.id === form.value.laptopId));
const availableCapacity = computed(() => selectedSection.value ? getAvailableCapacityBySectionId(selectedSection.value.id) : 0);
const isQuantityValid = computed(() => form.value.quantity > 0 && form.value.quantity <= availableCapacity.value);
const canCreate = computed(() => !!selectedSection.value && !!selectedLaptop.value && isQuantityValid.value);

const onSectionChange = () => {
  form.value.laptopId = null;
  if (selectedSection.value) fetchLaptopsByCategory(selectedSection.value.laptopCategory);
};

const createLaptopInventoryItem = () => {
  if (!canCreate.value) return;
  const laptopInventoryItem = new LaptopInventoryItem({
    sectionId: selectedSection.value.id,
    laptopCategoryId: selectedSection.value.laptopCategory,
    laptopId: selectedLaptop.value.id,
    laptopName: selectedLaptop.value.name,
    price: selectedLaptop.value.price,
    imageUrl: selectedLaptop.value.thumbnail,
    quantity: form.value.quantity,
    registeredAt: new Date()
  });
  addLaptopInventoryItem(laptopInventoryItem).then(() => {
    toast.add({severity: 'success', summary: t('laptop-inventory-item.new-title'), detail: t('laptop-inventory-item.created'), life: 3000});
    navigateToHome();
  }).catch(error => console.error(error));
};

const navigateToHome = () => {
  router.push({name: 'home'});
};
</script>

<template>
  <section class="p-4 md:p-5">
    <h1 class="m-0 text-4xl font-bold text-color">{{ t('laptop-inventory-item.new-title') }}</h1>
    <p class="mt-2 mb-4 text-xl text-color-secondary">{{ t('laptop-inventory-item.subtitle') }}</p>
    <div class="grid">
      <form class="col-12 md:col-7 flex flex-column gap-4" @submit.prevent="createLaptopInventoryItem">
        <div class="flex flex-column gap-2">
          <label for="section" class="font-medium">{{ t('laptop-inventory-item.section') }}</label>
          <pv-select
              id="section"
              v-model="form.sectionId"
              :options="techShelfSections"
              option-label="name"
              option-value="id"
              :placeholder="t('laptop-inventory-item.select-section')"
              class="w-full"
              @change="onSectionChange"/>
          <small v-if="selectedSection" class="text-color-secondary">
            {{ t('laptop-inventory-item.available-capacity', {capacity: availableCapacity}) }}
          </small>
        </div>
        <div class="flex flex-column gap-2">
          <label for="laptop" class="font-medium">{{ t('laptop-inventory-item.laptop') }}</label>
          <pv-select
              id="laptop"
              v-model="form.laptopId"
              :options="laptops"
              option-label="name"
              option-value="id"
              :loading="!!selectedSection && !laptopsLoaded"
              :disabled="!selectedSection"
              :placeholder="t('laptop-inventory-item.select-laptop')"
              filter
              class="w-full">
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <img :src="slotProps.option.thumbnail" :alt="slotProps.option.name" class="option-thumbnail"/>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </pv-select>
        </div>
        <div class="flex flex-column gap-2">
          <label for="quantity" class="font-medium">{{ t('laptop-inventory-item.quantity') }}</label>
          <pv-input-number
              input-id="quantity"
              v-model="form.quantity"
              :min="1"
              show-buttons
              :invalid="!!selectedSection && !isQuantityValid"
              class="w-full"/>
          <pv-message v-if="selectedSection && !isQuantityValid" severity="error" size="small" variant="simple">
            {{ t('laptop-inventory-item.capacity-exceeded', {capacity: availableCapacity}) }}
          </pv-message>
        </div>
        <div class="flex gap-2">
          <pv-button type="submit" :label="t('laptop-inventory-item.create')" icon="pi pi-check" :disabled="!canCreate"/>
          <pv-button :label="t('laptop-inventory-item.cancel')" icon="pi pi-times" severity="secondary" @click="navigateToHome"/>
        </div>
        <div v-if="errors.length" class="text-red-500">
          {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
        </div>
      </form>
      <div class="col-12 md:col-5">
        <pv-card v-if="selectedLaptop" class="shadow-2">
          <template #header>
            <img :src="selectedLaptop.thumbnail" :alt="selectedLaptop.name" class="laptop-preview w-full"/>
          </template>
          <template #title>{{ selectedLaptop.name }}</template>
          <template #content>
            <span class="text-color-secondary">{{ t('laptop-inventory-item.price') }}: </span>
            <span class="text-2xl font-bold text-primary">{{ formatCurrency(selectedLaptop.price) }}</span>
          </template>
        </pv-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.option-thumbnail {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

.laptop-preview {
  height: 16rem;
  object-fit: contain;
}
</style>
