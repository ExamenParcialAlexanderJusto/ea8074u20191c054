export class LaptopInventoryItem {
    constructor({ id = null, sectionId = null, laptopCategoryId = '', laptopId = null, laptopName = '',
                  price = 0, imageUrl = '', quantity = 0, registeredAt = new Date() }) {
        this.id = id;
        this.sectionId = sectionId;
        this.laptopCategoryId = laptopCategoryId;
        this.laptopId = laptopId;
        this.laptopName = laptopName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.registeredAt = registeredAt instanceof Date ? registeredAt : new Date(registeredAt);
    }
}
