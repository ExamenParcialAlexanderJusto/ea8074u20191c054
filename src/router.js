import {createRouter, createWebHistory} from "vue-router";
import Home from "./shared/presentation/views/home.vue";

const laptopInventoryItemForm = () => import('./inventory/presentation/views/laptop-inventory-item-form.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',              name: 'home',                       component: Home,                    meta: { title: 'Home' } },
    { path: '/laptop/items/new',  name: 'laptop-inventory-item-new',  component: laptopInventoryItemForm, meta: { title: 'New Laptop Inventory Item' } },
    { path: '/',                  redirect: '/home' },
    { path: '/:pathMatch(.*)*',   name: 'not-found',                  component: pageNotFound,            meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'Saga Tech Management';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    return true;
});

export default router;
