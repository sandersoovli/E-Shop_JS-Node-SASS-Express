import { cartConstructor } from "../constructors/cart.js";


export const displayCartView = () => {
    const container = document.getElementById("container");
    container.innerHTML = "<h2>Ostukorv</h2>";

    const cartproducts = cartConstructor.getAllProducts(); // Ostukorvi tooted

    // Kui ostukorv on tühi, kuvatakse teadet
    if (cartproducts.length === 0) {
        const cartItemElement = document.createElement("p");
        cartItemElement.innerText = "Ostukorv on tühi";
        container.append(cartItemElement);
    } else {
        // Kui tooted on olemas, kuvatakse iga toode
        cartproducts.forEach((item) => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");

            // Kuvame toote teabe
            cartItemElement.innerHTML = `
                <h3>${item.product.title}</h3>  <!-- Toote nimi -->
                <p>Hind: $${item.product.price}</p>  <!-- Toote hind -->
                <p>Kogus: ${item.quantity}</p>  <!-- Toote kogus -->
            `;

            // Eemaldamisnupp
            const removeButton = document.createElement("button");
            removeButton.textContent = "Eemalda";

            // Eemaldamisnupu lisamine
            removeButton.addEventListener("click", () => {
                cartConstructor.removeProduct(item.product.id); // Eemalda toode ostukorvist
                displayCartView(); // Uuenda ostukorvi vaadet
                console.log(cartConstructor);
            });

            cartItemElement.appendChild(removeButton);
            container.append(cartItemElement);
        });

        // Kokkuhind
        const totalPrice = cartConstructor.calculateTotal();
        const totalPriceWithoutTax = cartConstructor.calculateTotalWithoutTax(); // Maksudeta hind

        const totalElement = document.createElement("p");
        totalElement.innerHTML = `Kokku: $${totalPrice.toFixed(2)}`;

        const totalPriceWithoutTaxElement = document.createElement("p");
        totalPriceWithoutTaxElement.innerHTML = `Kokku ilma käibemaksuta: $${totalPriceWithoutTax.toFixed(2)}`;

        container.appendChild(totalElement);
        container.appendChild(totalPriceWithoutTaxElement);

        //hind ilmakäibe maksuta
        //calculateTotalWithoutTax(taxRate = 0.22)
    }
};
