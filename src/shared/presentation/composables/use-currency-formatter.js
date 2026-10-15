import {computed} from "vue";
import {useI18n} from "vue-i18n";

export function useCurrencyFormatter() {
    const {locale} = useI18n();

    const formatter = computed(() => new Intl.NumberFormat(
        locale.value === 'es' ? 'es-PE' : 'en-US',
        {style: 'currency', currency: 'USD'}
    ));

    const formatCurrency = (value) => formatter.value.format(value ?? 0);

    return {formatCurrency};
}
