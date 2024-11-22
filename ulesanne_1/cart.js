//Cart.js
export class Cart {
    constructor() {
        this.items = []; // Ostukorvi sisu hoidmiseks
    }

    // Lisa toode ostukorvi
    addProduct(product, quantity) {
        if (quantity <= 0 || typeof quantity !== 'number') {
            throw new Error('Toote kogus peab olema positiivne arv.');
        }
        this.items.push({ product, quantity });
    }

    // Eemalda toode ostukorvist nime järgi
    removeProduct(productName) {
        this.items = this.items.filter(item => item.product.title !== productName);
    }

    // Arvuta ostukorvi kogusumma
    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    // Getter ostukorvis olevate toodete koguarvu jaoks
    get totalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
}
