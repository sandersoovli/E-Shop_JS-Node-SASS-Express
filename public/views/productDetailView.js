// productDetailView.js

import { getAllCategory, getProductsData } from "../api.js";

//funktsioon toote leidmiseks ID alusel
const getProductById = async (id) => {
    try { 
        const prodcts = await getProductsData();
        //const product = await getProductById(productId);
        return prodcts.find((product) => product.id === parseInt(id));
    } catch (error) {
        console.error("Viga toote leidmisel:", error);
    }
};
export const displayProductDetailView = async (productId) => {
    const product = await getProductById(productId);
    
    if (!product) {
        console.error("Toodet ei leitud ID-ga:", productID);
        return;
    }

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
