// product.js
export class Product {
    // Konstruktor, mis määrab toote omadused
    constructor(id, title, price, category, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
    }

    // meetod toote kokkuvõte kirjeldamiseks
    describe() {
        return `${this.title} hind on ${this.price} ja kuulub kategooriasse ${this.category}.`;
    }

    // staatiline meetod allahindlus hinna arvutamiseks
    static discountedPrice(price, discountPercentage) {
        return price - (price * (discountPercentage / 100));
    }

    
}
