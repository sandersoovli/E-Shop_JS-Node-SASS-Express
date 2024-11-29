
// main.js impordin product.js, cart.js, customer.js
import { Product } from './product.js';
import { Cart } from './cart.js';
import { Customer } from './customer.js';
import { Order } from './order.js'; // Vajadusel import Order
import { displayAllProductsView } from './allProductsView.js';
import { dispalyCartView } from './CartView.js';

// Loo mõned tooted
const products = [
    new Product(0,'Sülearvuti', 999.99, 'Elektroonika'), // Lisatud tagasi
    new Product(1,'Telefon', 599.99, 'Elektroonika'),
    new Product(2,'Tahvelarvuti', 499.99, 'Elektroonika')
];
/* Loo ostukorv ja lisa tooted
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
*/
//tund 26_11_24
document.title = "My website";
const myHeading = document.getElementById("My-heading");
console.log(myHeading);

        
        
/*const mainContainer = document.getElementById("container");
console.log(mainContainer);

products.forEach(element => {
    
console.log(element.id);
});
function dispalyProducts(){
    const productsContainer = document.getElementById("products");

    products.forEach((Product) => {
        const productCard = document.createElement("div");

        const ProductTitle = document.createElement("h3");
        productCard.append(ProductTitle);
        
        productsContainer.append(productCard);
    })
};*/
// 
displayAllProductsView(products)
dispalyCartView(cart)