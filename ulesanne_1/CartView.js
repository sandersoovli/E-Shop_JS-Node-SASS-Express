//Ostukorvi vaate genereerimine
export const dispalyCartView = (cart) => {
    container.innerHTML = "<h2>Ostukorv</h2>";

if (!cart.length) {
    const cartitemElemnt = document.createElement("p");
    cartItemElemnt.innerText = "Ostukorv on tühi";
    container.append(cartItemElemnt);
} else {
    cart.forEach((item) => {
        const cartItemElemnt = document.createElement("div");
        cartItemElemnt.classList.add("cart-item");
        cartItemElemnt.innerHTML =  `
        <h3>${item.product.title}</h3>
        <h3>Hind: $${item.price}</h3>
        <h3>Kogus: ${item.quantity}</h3>
    `;
    container.append(cartItemElemnt);
        });
    }
};