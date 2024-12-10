import { customerConstructor } from "../constructors/customer.js";

// Lemmikute vaate genereerimine
export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("favorites-view");
  container.innerHTML = "<h2>Lemmikud</h2>";

  // Kui lemmikud on olemas, kuvame need
  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");

    // Kuvame toote nime ja hinda
    favoriteItemElement.innerHTML = `
        <h3>${item.product.title}</h3>
        <p>Hind: $${item.product.price}</p>
    `;

    // Lisame lemmiku vaatesse
    container.appendChild(favoriteItemElement);
  });

  // Kui lemmikuid pole, kuvame vastava sõnumi
  if (favorites.length === 0) {
    const noFavoritesMessage = document.createElement("p");
    noFavoritesMessage.innerText = "Sul ei ole lemmikuid.";
    container.appendChild(noFavoritesMessage);
  }
};
