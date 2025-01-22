//allProductsViews
import { getAllCategory, getProductsData, getProductsDataByCategory } from "../api.js";
import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";
import { navigate } from "../router.js";

//staatiline meetod kategooria nupu loomine
function createCategoryButton(category) {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-button';
    button.addEventListener('click', () => {
        console.log(`Selected category: ${category}`);
        displayProductsByCategory(category);
    });
    return button;
}

// Toodete vaate genereerimine
export const displayProductsByCategory = async (SelectedCategory ) => {
    console.log("tere");
    console.log(SelectedCategory);
    const products = await getProductsDataByCategory(SelectedCategory);


    if (!Array.isArray(products)) {
        console.error('Tooted ei ole massiiv!');
        const container = document.getElementById("container");
        container.innerHTML = "<p>Kategoorias ei ole tooteid saadaval.</p>";
        return;
    }
    /*const categories = await getAllCategory();
    categories.forEach(element => {
        console.log(element);
    });*/
    
    // Laadige kategooriad
    const categories = await getAllCategory();

    // Kuvage kõik kategooriad
    categories.forEach(element => {
        console.log(element);
    });

    // Kategooriate nuppude konteiner
    const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("categories-container");
    //"all" nupp - kõik tooted on nähtaval
    const AllButton = createCategoryButton("all");
        categoriesContainer.appendChild(AllButton);

    // loo nupud iga kategooria jaoks
    categories.forEach((category) => {
        const CategoryButton = createCategoryButton(category, (category) => displayAllProductsView(category));
        categoriesContainer.appendChild(CategoryButton);
    });

    const container = document.getElementById("container");
    container.innerHTML = "<h2>Tooted</h2>";

    // Lisame kategooriate nuppude konteineri
    container.appendChild(categoriesContainer);

    console.log(products);

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
