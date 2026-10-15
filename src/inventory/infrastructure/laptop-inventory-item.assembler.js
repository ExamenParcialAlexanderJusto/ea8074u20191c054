import {LaptopInventoryItem} from "../domain/model/laptop-inventory-item.entity.js";

export class LaptopInventoryItemAssembler {
    static toEntityFromResource(resource) {
        return new LaptopInventoryItem({...resource, registeredAt: new Date(resource.registeredAt)});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        return response.data.map(resource => this.toEntityFromResource(resource));
    }

    static toResourceFromEntity(entity) {
        return {
            sectionId: entity.sectionId,
            laptopCategoryId: entity.laptopCategoryId,
            laptopId: entity.laptopId,
            laptopName: entity.laptopName,
            price: entity.price,
            imageUrl: entity.imageUrl,
            quantity: entity.quantity,
            registeredAt: entity.registeredAt.toISOString()
        };
    }
}
