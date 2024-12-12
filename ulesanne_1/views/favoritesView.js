import { customerConstructor } from "../constructors/customer.js";
import { favorites } from "../main.js";
// Lemmikute vaate genereerimine
export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("container");
  container.innerHTML = "<h2>Lemmikud</h2>";

// Kui lemmikud on tühi, kuvame vastava sõnumi
if (!favorites || favorites.length === 0) {
    const noFavoritesMessage = document.createElement("p");
    noFavoritesMessage.innerText = "Sul ei ole lemmikuid.";
    container.appendChild(noFavoritesMessage);
    return;
}

// Kui lemmikud on olemas, kuvame need
favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");

    // Kuvame toote nime ja hinda
    favoriteItemElement.innerHTML = `
        <h3>${item.title}</h3>
        <p>Hind: $${item.price}</p>
    `;

    // Eemaldamisnupp
    const removeButton = document.createElement("button");
    removeButton.textContent = "Eemalda";

    // Eemaldamisnupu funktsionaalsus
    removeButton.addEventListener("click", () => {
        customerConstructor.toggleFavorites(item); // Eemalda toode lemmikutest
        displayFavoritesView(); // Uuenda lemmikute vaadet
    });

    favoriteItemElement.appendChild(removeButton);
    container.appendChild(favoriteItemElement);
});
};