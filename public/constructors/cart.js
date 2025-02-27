export class Cart {
  constructor() {
    // Kontrollime, kas ostukorv on juba localStorage-s
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  // Salvestame ostukorvi localStorage-sse
  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  // Võta kõik ostukorvi tooted
  getAllProducts() {
    return this.items;
  }

  // Lisa toode ostukorvi või suurenda kogust
  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveToLocalStorage(); // Salvestame pärast igat muudatust
    this.displayTotalItems();
  }

  // Uuenda toote kogust
  updateProductQuantity(productId, delta) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      }
    }
    this.saveToLocalStorage(); // Salvestame pärast igat muudatust
    this.displayTotalItems();
  }

  // Eemalda toode ostukorvist ID järgi
  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.saveToLocalStorage(); // Salvestame pärast igat muudatust
    this.displayTotalItems();
  }

  // Kogu ostukorvi hind
  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Kogu ostukorvi hind ilma käibemaksuta
  calculateTotalWithoutTax(taxRate = 0.22) {
    const total = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return total / (1 + taxRate);
  }

  // Toodete koguarv
  displayTotalItems() {
    const cartCount = document.getElementById("cart-count");
    cartCount.innerHTML = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Ostukorvi tühjendamine
  clear() {
    this.items = [];
    this.saveToLocalStorage(); // Salvestame tühjendamise
  }
}

export const cartConstructor = new Cart();
