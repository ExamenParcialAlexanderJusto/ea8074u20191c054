import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {definePreset} from "@primeuix/themes";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
    Button,
    Card,
    Divider,
    InputNumber,
    Message,
    Select,
    SelectButton,
    Toast,
    ToastService,
    Toolbar
} from "primevue";
import router from "./router.js";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

const SagaFalabellaPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{lime.50}',
            100: '{lime.100}',
            200: '{lime.200}',
            300: '{lime.300}',
            400: '{lime.400}',
            500: '{lime.500}',
            600: '{lime.600}',
            700: '{lime.700}',
            800: '{lime.800}',
            900: '{lime.900}',
            950: '{lime.950}'
        }
    }
});

createApp(App)
    .use(i18n)
    .use(PrimeVue, {theme: { preset: SagaFalabellaPreset, options: { darkModeSelector: false }}, ripple: true, license: primeUiLicenseKey})
    .use(ToastService)
    .component('pv-button',         Button)
    .component('pv-card',           Card)
    .component('pv-divider',        Divider)
    .component('pv-input-number',   InputNumber)
    .component('pv-message',        Message)
    .component('pv-select',         Select)
    .component('pv-select-button',  SelectButton)
    .component('pv-toast',          Toast)
    .component('pv-toolbar',        Toolbar)
    .use(router)
    .mount('#app')
