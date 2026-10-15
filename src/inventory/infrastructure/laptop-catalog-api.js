import {BaseApi} from "../../shared/infrastructure/base-api.js";

const laptopCatalogApiUrl            = import.meta.env.VITE_LAPTOP_CATALOG_API_URL;
const productsByCategoryEndpointPath = import.meta.env.VITE_PRODUCTS_BY_CATEGORY_ENDPOINT_PATH;

export class LaptopCatalogApi extends BaseApi {
    constructor() {
        super(laptopCatalogApiUrl);
    }

    getLaptopsByCategory(category) {
        return this.http.get(`${productsByCategoryEndpointPath}/${category}`);
    }
}
