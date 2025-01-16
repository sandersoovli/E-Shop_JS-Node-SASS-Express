import { Product } from "./constructors/product.js";


const BASE_URL = "https://fakestoreapi.com";

// tegime funktsiooni, et fetch'ida andmed json failist
export const getProductsData = async () => {
    try {
      const data = await fetch(`/products/`);
      return data.json();
    } catch (error) {
      console.error(error);
    }
  };

  //kuvada kõik tooted
  export const getProductsDataByCategory = async (category = "All prodcts") => {
    try {
        const byCategory = 
        category !== "All products" ? `/category/${category}` : "";
        const data = await fetch(`/products${byCategory}`);

        const prodctsData = await data.json();
        const dataObject = prodctsData.map(
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
        return dataObject;
    }catch (error) {
    console.error(error);
    }
  };

  export const getAllCategory = async () => {
    try {
        const data = await fetch(`/products/categories`);
        return data.json();
    }catch (error) {
        console.error(error);
    }
  };