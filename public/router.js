import { displayFavoritesView } from './views/favoritesView.js';
import { displayProductDetailView } from './views/productDetailView.js';
import { displayCartView } from './views/CartView.js';
import { displayAllProductsView } from './views/allProductsView.js';

// Navigeerimise funktsioon
export const navigate = (view, param) => {
  // Defineeri erinevad vaated ja nende funktsioonid
  const views = {
    allProducts: () => displayAllProductsView(param || 'all'), // Kui kategooriat ei anta, kasutab vaikeväärtust "all"
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

  // Uuenda URL-i, et peegeldada navigeerimist
  //const encodedParam = encodeURIComponent(param || ''); // Kui param on tühi, kasuta vaikimisi väärtust
  //const newUrl = `/${view}/${encodedParam}`; // Loome URL, et peegeldada vaate ja parameetri muutust
  //window.history.pushState({ view, param }, '', newUrl); // Lisa ajalugu, et hiljem saada juurde vaate ja parameetri teavet
};

/* Kuula brauseri "popstate" sündmusi (tagasi/edasi nupud)
window.addEventListener('popstate', (event) => {
  //const { view, param } = event.state || {}; // Kui ajaloo objekt on olemas, siis saadame vaate ja parameetri
  navigate(view || 'allProducts', param); // Mine õigele vaatele
});*/
