
import { Product } from "./constructors/product.js";


const BASE_URL = "https://fakestoreapi.com";
//const response = await fetch(`${BASE_URL}/products`);
//const products = await response.json();

// tegime funktsiooni, et fetch'ida andmed json failist
export const getProductsData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Fetched data is not valid or is empty.");
    }
      //return data.json();
      //const response = await fetch(`${BASE_URL}/products/`);
      
      return data.map(
        (item) =>
          new Product(
            item.id,
            item.title,
            item.price,
            item.category,
            item.description,
            item.image
          )
      );
    } catch (error) {
      console.error("Viga toodete laadimisel:",error);
      return [];
    }
  };

  //kuvada kõik tooted
  export const getProductsDataByCategory = async (category) => {
    try {
        let response = "";
        
        if(category === "all" || category === undefined) {
          response = await fetch('https://fakestoreapi.com/products')
        
        } else {
          response = await fetch(`${BASE_URL}/products/category/${category}`);
        };
        console.log(response);


        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const productsData = await response.json();
        console.log(productsData);
        if (!Array.isArray(productsData) || productsData.length === 0) {
          throw new Error("Fetched products by category are empty or invalid.");
          return [];
      }
        return productsData.map(
            (item) =>
                new Product(
                    item.id,
                    item.title,
                    item.price,
                    item.category,
                    item.description,
                    item.image
                )
        );
    }catch (error) {
    console.error(error);
    }
  };

  export const getAllCategory = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const categories = await response.json();  // Parse the response to JSON
        return categories;
    } catch (error) {
        console.error("Viga kategooriate laadimisel:", error);
        return [];
    }
  };