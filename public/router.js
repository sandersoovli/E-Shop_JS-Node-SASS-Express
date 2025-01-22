import { displayFavoritesView } from './views/favoritesView.js';
import { displayProductDetailView } from './views/productDetailView.js';
import { displayCartView } from './views/CartView.js';
import { displayProductsByCategory } from './views/allProductsView.js';

// Navigeerimise funktsioon
export const navigate = (view, param) => {
  // Defineeri erinevad vaated ja nende funktsioonid
  const views = {
    allProducts: () => displayProductsByCategory(param || 'all'), // Kui kategooriat ei anta, kasutab vaikeväärtust "all"
    productDetail: () => displayProductDetailView(param), // Näitab toote detailvaadet
    cart: () => displayCartView(), // Kuvab ostukorvi vaate
    favorites: () => displayFavoritesView() // Kuvab lemmikute vaate
  };

  // Kontrolli, kas määratud vaade eksisteerib
  if (views[view]) {
    views[view](); // Käivita sobiv vaade
  } else {
    console.error(`Vaadet "${view}" ei leitud.`); // Kui vaade ei ole määratud, kuvatakse viga
  }

  
};
