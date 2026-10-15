<script setup>
import {useI18n} from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";

const visible = defineModel('visible', {type: Boolean, default: false});
const { t } = useI18n();

const items = [
  {label: 'option.home', icon: 'pi pi-home', to: '/home'},
  {label: 'option.new-laptop-inventory-item', icon: 'pi pi-plus-circle', to: '/laptop/items/new'}
];
</script>

<template>
  <pv-drawer v-model:visible="visible" :header="t('app.title')">
    <div class="flex flex-column h-full">
      <nav class="flex flex-column gap-2">
        <router-link
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="flex align-items-center gap-2 p-3 border-round hover:surface-100 text-color"
            active-class="bg-primary-50 text-primary font-semibold"
            @click="visible = false">
          <i :class="item.icon"/>
          <span>{{ t(item.label) }}</span>
        </router-link>
      </nav>
      <div class="mt-auto pt-3 flex justify-content-center">
        <language-switcher/>
      </div>
    </div>
  </pv-drawer>
</template>
