// customer.js
import { Order } from './order.js';
export class Customer {
    constructor(name) {
        this.name = name; // kliendi nimi
        this.orderHistory = []; // massiivi tellimuste ajaloog hoidmiseks
    }

    // meetod tellimuse tegemiseks
    placeOrder(cart) {
        const newOrder = new Order(cart); // loob uue tellimuse
        this.orderHistory.push(newOrder); // lisab tellimuse ajalukku
    }

    // meetod tellimuste ajaloo printimiseks
    printOrderHistory() {
        console.log(`${this.name} tellimuste ajalugu:`);
        this.orderHistory.forEach((order, index) => {
            console.log(`Tellimus ${index + 1}:`);
            console.log(`Kuupäev: ${order.orderDate.toLocaleString()}`);
            console.log(`Kogusumma: ${order.cart.calculateTotal().toFixed(2)} €`);
            console.log('---');
        });
    }
}