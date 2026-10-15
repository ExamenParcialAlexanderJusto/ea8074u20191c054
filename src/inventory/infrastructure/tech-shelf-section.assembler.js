import {TechShelfSection} from "../domain/model/tech-shelf-section.entity.js";

export class TechShelfSectionAssembler {
    static toEntityFromResource(resource) {
        return new TechShelfSection({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
