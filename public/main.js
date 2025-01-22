// Importige vajalikud vaated ja klassid
import { customerConstructor } from './constructors/customer.js';
import { cartConstructor } from './constructors/cart.js';
import { Product } from './constructors/product.js';
import { Cart } from './constructors/cart.js';
import { Customer } from './constructors/customer.js';
import { Order } from './constructors/order.js';
import { displayProductsByCategory } from './views/allProductsView.js';
import { displayProductDetailView } from './views/productDetailView.js';
import { displayCartView } from './views/CartView.js';
import { displayFavoritesView } from './views/favoritesView.js';
import { getProductsData} from './api.js';
import { getAllCategory } from './api.js';
import { navigate } from './router.js';
let products = []; 

const initApp = async () => {
    try {
        // Hankige kategooriad andmebaasist
        const categories = await getAllCategory();
        if (categories.length === 0) {
            console.warn("Kategooriad puuduvad.");
        }
        products = await getProductsData();
        if (products.length === 0) {
            console.warn("Tooted puuduvad.");
        }
        displayProductsByCategory("all"); // Display all products (or a default category)
       
        
        // Kuvage esimese kategooria tooted
        
    } catch (error) {
        console.error("Viga rakenduse initsialiseerimisel:", error);
    }
};



// Loo klient ja esita tellimus
const customer = new Customer('Alice');


// Nuppude sündmuste sidumine
document.getElementById("category-button")?.addEventListener("click", () => navigate("allCategories"));
document.getElementById("products-button")?.addEventListener("click", () => navigate("allProducts"));
document.getElementById("cart-button")?.addEventListener("click", () => navigate("cart"));
document.getElementById("favorites-button")?.addEventListener("click", () => navigate("favorites"));



export const favorites = [];
document.addEventListener("DOMContentLoaded", initApp)