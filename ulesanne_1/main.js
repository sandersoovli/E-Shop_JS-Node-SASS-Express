// 1. Toodete lisamine e-poodi
class Product {
    // Konstruktor, mis määrab toote omadused
    constructor(title, price, category) {
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

// kasutuse näide
const laptop = new Product('Sülearvuti', 999.99, 'Elektroonika');

//Prindi toote kokuvõte
console.log(laptop.describe());

//Prindi allahinnatud hind (10% allahindlus)
console.log(Product.discountedPrice(laptop.price, 10)); //10% allahindlus