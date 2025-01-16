//allProductsViews
import { getAllCategory, getProductsData, getProductsDataByCategory } from "../api.js";
import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";
import { navigate } from "../router.js";

//staatiline meetod kategooria nupu loomine
function createCategoryButton(category, onClickCallback) {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-button';
    button.addEventListener('click', () => {
        console.log(`Selected category: ${category}`);
        if (onClickCallback) {
            onClickCallback(category);
        }
    });
    return button;
}

// Toodete vaate genereerimine
export const displayAllProductsView = async (category) => {
    const products = await getProductsData();
    const categories = await getAllCategory();
    categories.forEach(element => {
        console.log(element);
    });
    
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
        <img src= ${product.image}>
            <h3>${product.title}</h3>
            <p>Kategooria: ${product.category}</p>
            <p>Hind: $${product.price}</p>
            <button id="addToCart">ostukorvi</button>
            <button id="addTofavorite">lemmik</button>
        `;
        
        const addToCart = productElement.querySelector("#addToCart");
            addToCart.onclick = (e) => {
                e.stopPropagation();
                cartConstructor.addProduct (product); 
            }
        
        const favorite = productElement.querySelector("#addTofavorite");
            favorite.onclick = (e) => {
                e.stopPropagation();
                customerConstructor.toggleFavorites(product);
            }    
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
