
// main.js impordin product.js, cart.js, customer.js
import { Product } from './product.js';
import { Cart } from './cart.js';
import { Customer } from './customer.js';
import { Order } from './order.js'; // Vajadusel import Order

// Loo mõned tooted
const laptop = new Product('Sülearvuti', 999.99, 'Elektroonika'); // Lisatud tagasi
const phone = new Product('Telefon', 599.99, 'Elektroonika');

// Loo ostukorv ja lisa tooted
const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

// Kuvage ostukorvi kogusumma ja toodete arv
console.log('Kogusumma:', cart.calculateTotal().toFixed(2));
console.log('Kokku tooteid ostukorvis:', cart.totalItems);

// Loo klient ja esita tellimus
const customer = new Customer('Alice');
customer.placeOrder(cart);

// Kuvage tellimuste ajalugu
customer.printOrderHistory();
const order = new Order(cart);