import {Laptop} from "../domain/model/laptop.entity.js";

export class LaptopAssembler {
    static toEntityFromResource(resource) {
        return new Laptop({
            id: resource.id,
            name: resource.title,
            price: resource.price,
            thumbnail: resource.thumbnail
        });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['products'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
