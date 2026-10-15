import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const techShelfSectionsEndpointPath     = import.meta.env.VITE_TECH_SHELF_SECTIONS_ENDPOINT_PATH;
const laptopInventoryItemsEndpointPath  = import.meta.env.VITE_LAPTOP_INVENTORY_ITEMS_ENDPOINT_PATH;

export class InventoryApi extends BaseApi {
    #techShelfSectionsEndpoint;
    #laptopInventoryItemsEndpoint;

    constructor() {
        super();
        this.#techShelfSectionsEndpoint = new BaseEndpoint(this, techShelfSectionsEndpointPath);
        this.#laptopInventoryItemsEndpoint = new BaseEndpoint(this, laptopInventoryItemsEndpointPath);
    }

    getTechShelfSections() {
        return this.#techShelfSectionsEndpoint.getAll();
    }

    getLaptopInventoryItems() {
        return this.#laptopInventoryItemsEndpoint.getAll();
    }

    createLaptopInventoryItem(resource) {
        return this.#laptopInventoryItemsEndpoint.create(resource);
    }
}
