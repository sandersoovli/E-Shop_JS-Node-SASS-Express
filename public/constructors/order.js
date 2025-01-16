// order.js
export class Order {
    constructor(cart) {
        this.orderDate = new Date(); // Tellimuse kuupäev
        this.cart = cart;            // Viide ostukorvile
    }

    // Kuvab tellimuse detailid
    printOrder() {
        console.log(`Tellimuse kuupäev: ${this.orderDate.toLocaleString()}`);
        console.log('Tooted ostukorvis:');
        this.cart.items.forEach(item => {
            console.log(`- ${item.product.title}, kogus: ${item.quantity}`);
        });
        console.log(`Kogusumma: ${this.cart.calculateTotal().toFixed(2)} €`);
    }
}

export const oderConstructor = new Order();