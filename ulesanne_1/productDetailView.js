// Täpsustame eksportimist õigesti
export const displayProductDetailView = (product) => {
    const container = document.getElementById("container");
    container.innerHTML = "";  // Tühjendame olemasoleva sisu

    const productDetailContainer = document.createElement("div");
    productDetailContainer.classList.add("product-detail-container");

    // Kuvame toote detailide info
    productDetailContainer.innerHTML = `
        <h2>${product.title}</h2>
        <p><strong>Kategooria:</strong> ${product.category}</p>
        <p><strong>hind:</strong> €${product.price.toFixed(2)}</p>
        <p><strong>Kirjeldus:</strong> ${product.description || "Ei ole kirjeldust saadaval"}</p>
    `;
    container.appendChild(productDetailContainer);  // Lisame detailide konteineri HTML-i
};
