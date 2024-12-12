// Importige vajalikud vaated ja klassid
import { customerConstructor } from './constructors/customer.js';
import { cartConstructor } from './constructors/cart.js';
import { Product } from './constructors/product.js';
import { Cart } from './constructors/cart.js';
import { Customer } from './constructors/customer.js';
import { Order } from './constructors/order.js';
import { displayAllProductsView } from './views/allProductsView.js';
import { displayProductDetailView } from './views/productDetailView.js';
import { displayCartView } from './views/CartView.js';
import { displayFavoritesView } from './views/favoritesView.js';

// Loo mõned tooted
export const products = [
    new Product(0, 'Sülearvuti', 999.99, 'Elektroonika'),
    new Product(1, 'Telefon', 599.99, 'Elektroonika'),
    new Product(2, 'Tahvelarvuti', 499.99, 'Elektroonika')
];





// Lemmikud
export const favorites = [products[1].id, products[2].id]; // Telefon ja Tahvelarvuti ID-d

// Loo klient ja esita tellimus
const customer = new Customer('Alice');


// Funktsioon, mis vastutab erinevate vaadete kuvamise eest
const views = {
    allProducts: () => displayAllProductsView(products), // Kuvab kõik tooted
    productDetail: (productId) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            displayProductDetailView(product); // Kuvame konkreetse toote detailid
        } else {
            console.error(`Toodet ID-ga "${productId}" ei leitud.`);
        }
    },
    cart: () => displayCartView(), // Kuvame ostukorvi sisu
    favorites: () => displayFavoritesView(), // Kuvame lemmikud
};

// Navigeerimisfunktsioon
const navigate = (view, param = null) => {
    if (views[view]) {
        views[view](param); // Käivitame vastava vaate
    } else {
        console.error(`Vaadet "${view} ei leitud.`);
    }

    // Uuenda URL-i
    const newUrl = param ? `/${view}/${encodeURIComponent(param)}` : `/${view}`;
    window.history.pushState({}, "", newUrl);
};

// Nuppude sündmuste sidumine
document.getElementById("products-button")?.addEventListener("click", () => navigate("allProducts"));
document.getElementById("cart-button")?.addEventListener("click", () => navigate("cart"));
document.getElementById("favorites-button")?.addEventListener("click", () => navigate("favorites"));

// Lehe laadimisel määrame algvaate
window.addEventListener('load', () => {
    const path = window.location.pathname.split('/');
    const view = path[2] || 'allProducts';
    const param = path[3] || null;
    navigate(view, param); // Mine õigele vaatele
});

// Browseri ajaloo sündmuste kuulamine (tagasi/edasi liikumine)
window.addEventListener('popstate', () => {
    const path = window.location.pathname.split('/');
    const view = path[2] || 'allProducts';
    const param = path[3] || null;
    navigate(view, param); // Uuenda vaadet vastavalt URL-ile
});

