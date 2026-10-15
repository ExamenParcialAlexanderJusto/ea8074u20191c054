import axios from "axios";

const inventoryApi = import.meta.env.VITE_INVENTORY_API_URL;

export class BaseApi {
    #http;

    constructor(baseUrl = inventoryApi) {
        this.#http = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    get http() {
        return this.#http;
    }

}
