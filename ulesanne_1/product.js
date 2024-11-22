// product.js
export class Product {
    // Konstruktor, mis määrab toote omadused
    constructor(id, title, price, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
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
