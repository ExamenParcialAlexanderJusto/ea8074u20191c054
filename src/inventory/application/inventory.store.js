import {reactive, ref} from "vue";
import {InventoryApi} from "../infrastructure/inventory-api.js";
import {LaptopCatalogApi} from "../infrastructure/laptop-catalog-api.js";
import {TechShelfSectionAssembler} from "../infrastructure/tech-shelf-section.assembler.js";
import {LaptopInventoryItemAssembler} from "../infrastructure/laptop-inventory-item.assembler.js";
import {LaptopAssembler} from "../infrastructure/laptop.assembler.js";

const inventoryApi = new InventoryApi();
const laptopCatalogApi = new LaptopCatalogApi();

function createInventoryStore() {
    const techShelfSections = ref([]);
    const laptopInventoryItems = ref([]);
    const laptops = ref([]);
    const errors = ref([]);
    const techShelfSectionsLoaded = ref(false);
    const laptopInventoryItemsLoaded = ref(false);
    const laptopsLoaded = ref(false);

    function fetchTechShelfSections() {
        inventoryApi.getTechShelfSections().then(response => {
            techShelfSections.value = TechShelfSectionAssembler.toEntitiesFromResponse(response);
            techShelfSectionsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchLaptopInventoryItems() {
        inventoryApi.getLaptopInventoryItems().then(response => {
            laptopInventoryItems.value = LaptopInventoryItemAssembler.toEntitiesFromResponse(response);
            laptopInventoryItemsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchLaptopsByCategory(category) {
        laptopsLoaded.value = false;
        laptops.value = [];
        laptopCatalogApi.getLaptopsByCategory(category).then(response => {
            laptops.value = LaptopAssembler.toEntitiesFromResponse(response);
            laptopsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getTechShelfSectionById(id) {
        let idNum = parseInt(id);
        return techShelfSections.value.find(section => section.id === idNum);
    }

    function getLaptopInventoryItemsBySectionId(sectionId) {
        return laptopInventoryItems.value.filter(item => item.sectionId === sectionId);
    }

    function getAvailableCapacityBySectionId(sectionId) {
        const section = getTechShelfSectionById(sectionId);
        return section ? section.calculateAvailableCapacity(laptopInventoryItems.value) : 0;
    }

    function addLaptopInventoryItem(item) {
        const section = getTechShelfSectionById(item.sectionId);
        if (!section || !section.canAccommodate(item.quantity, laptopInventoryItems.value)) {
            const error = new Error('Quantity exceeds the available capacity of the tech shelf section.');
            errors.value.push(error);
            return Promise.reject(error);
        }
        const resource = LaptopInventoryItemAssembler.toResourceFromEntity(item);
        return inventoryApi.createLaptopInventoryItem(resource).then(response => {
            const newItem = LaptopInventoryItemAssembler.toEntityFromResource(response.data);
            laptopInventoryItems.value.push(newItem);
        }).catch(error => {
            errors.value.push(error);
            throw error;
        });
    }

    return reactive({
        techShelfSections,
        laptopInventoryItems,
        laptops,
        errors,
        techShelfSectionsLoaded,
        laptopInventoryItemsLoaded,
        laptopsLoaded,
        fetchTechShelfSections,
        fetchLaptopInventoryItems,
        fetchLaptopsByCategory,
        getTechShelfSectionById,
        getLaptopInventoryItemsBySectionId,
        getAvailableCapacityBySectionId,
        addLaptopInventoryItem
    });
}

let inventoryStore = null;

function useInventoryStore() {
    if (!inventoryStore) inventoryStore = createInventoryStore();
    return inventoryStore;
}

export default useInventoryStore;
