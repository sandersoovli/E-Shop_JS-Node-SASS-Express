//customrt.js
import { Order } from './order.js';

export class Customer {
    constructor(name) {
        this.name = name; // Kliendi nimi
        this.orderHistory = []; // Tellimuste ajaloo massiiv
        this.favorites = []; // Lemmikute massiiv
    }

    // Meetod tellimuse tegemiseks
    placeOrder(cart) {
        const newOrder = new Order(cart); // Loome uue tellimuse
        this.orderHistory.push(newOrder); // Lisame tellimuse ajalukku
    }

    // Meetod tellimuste ajaloo printimiseks
    printOrderHistory() {
        console.log(`${this.name} tellimuste ajalugu:`);
        this.orderHistory.forEach((order, index) => {
            console.log(`Tellimus ${index + 1}:`);
            console.log(`Kuupäev: ${order.orderDate.toLocaleString()}`);
            console.log(`Kogusumma: ${order.cart.calculateTotal().toFixed(2)} €`);
            console.log('---');
        });
    }

    // Meetod lemmikute lisamiseks/eemaldamiseks
    toggleFavorites(product) {
        // Kontrollime, kas toode on juba lemmikutes
        const existingItem = this.favorites.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            // Kui on lemmikutes, eemaldame selle
            this.favorites = this.favorites.filter(
                (item) => item.id !== product.id
            );
        } else {
            // Kui ei ole lemmikutes, lisame selle
            this.favorites.push( product );
        }
        console.log("Kõik lemmikud: ", this.favorites);
    }

    // Meetod kõikide lemmikute saamiseks
    getAllFavorites() {
        return this.favorites;
    }
}

// Ekspordime kliendi loomise funktsiooni
export const customerConstructor = new Customer("Sander");
