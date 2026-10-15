export class TechShelfSection {
    constructor({ id = null, name = '', laptopCategory = '', maxCapacity = 0 }) {
        this.id = id;
        this.name = name;
        this.laptopCategory = laptopCategory;
        this.maxCapacity = maxCapacity;
    }

    calculateTotalLaptops(items) {
        return items
            .filter(item => item.sectionId === this.id)
            .reduce((total, item) => total + item.quantity, 0);
    }

    calculateAvailableCapacity(items) {
        return this.maxCapacity - this.calculateTotalLaptops(items);
    }

    canAccommodate(quantity, items) {
        return quantity > 0 && quantity <= this.calculateAvailableCapacity(items);
    }
}
