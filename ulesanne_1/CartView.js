// CartView.js
export const displayCartView = (cartItems) => {
    const container = document.getElementById("cart-view");
    if (!container) {
        console.error("Element 'cart-view' ei ole leitud!");
        return;
    }

    container.innerHTML = "<h2>Ostukorv</h2>";

    if (cartItems.length === 0) {
        const cartItemElement = document.createElement("p");
        cartItemElement.innerText = "Ostukorv on tühi";
        container.append(cartItemElement);
    } else {
        cartItems.forEach((item) => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            cartItemElement.innerHTML = `
                <h3>${item.product.title}</h3>
                <p>Hind: €${item.product.price.toFixed(2)}</p>
                <p>Kogus: ${item.quantity}</p>
                <p>Kogusumma: €${(item.product.price * item.quantity).toFixed(2)}</p>
            `;
            container.append(cartItemElement);
        });
    }
};
