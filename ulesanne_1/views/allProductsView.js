// Toodete vaate genereerimine
export const displayAllProductsView = (products) => {
    const container = document.getElementById("container");
    container.innerHTML = "<h2>Tooted</h2>";

    // Veendumine, et 'products' on massiiv
    if (!Array.isArray(products)) {
        console.error('Tooted ei ole massiiv!');
        return;
    }

    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products-container");

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        // Kasutame template-literaale ja ühe tervikliku stringi
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>Kategooria: ${product.category}</p>
            <p>Hind: $${product.price}</p>
        `;

        // Kinnitame, et 'product.id' on olemas
        if (product.id !== undefined && product.id !== null) {
            productElement.onclick = (e) => {
                e.stopPropagation();
                navigate("productDetail", product.id); // Toote detailvaate kuvamiseks
            };
        } else {
            console.error("Tootel puudub ID:", product);
        }

        productsContainer.append(productElement);
    });

    container.append(productsContainer);
};
