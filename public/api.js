import { Product } from "./constructors/product.js";

const BASE_URL = "https://fakestoreapi.com";

// Fetch'ige andmed fakestore API-st ja teisendage need toodete objektideks
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
    console.error("Viga toodete laadimisel:", error);
    return [];
  }
};

// Kuvatakse kõik tooted kategooria järgi või kõik tooted
export const getProductsDataByCategory = async (category = "all") => {
  try {
    let response = "";
    
    if (category === "all" || category === undefined) {
      response = await fetch(`${BASE_URL}/products`);
    } else {
      response = await fetch(`${BASE_URL}/products/category/${category}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productsData = await response.json();
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
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Kuvatakse kõik kategooriad
export const getAllCategory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Viga kategooriate laadimisel:", error);
    return [];
  }
};

// Ostukorvi funktsioonid

// Lisage toode ostukorvi
export const addToCart = (productId, quantity = 1) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kontrollige, kas toode on juba ostukorvis
  const existingProductIndex = cart.findIndex(item => item.id === productId);

  if (existingProductIndex !== -1) {
    // Kui on olemas, suurendage kogust
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Kui pole, lisage uus toode
    cart.push({ id: productId, quantity });
  }

  // Salvestage ostukorv localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Toode lisatud ostukorvi');
};

// Kuvatakse kõik ostukorvis olevad tooted
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Eemaldage toode ostukorvist
export const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Eemaldage toode ostukorvist
  cart = cart.filter(item => item.id !== productId);

  // Salvestage uuesti
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Toode eemaldatud ostukorvist');
};
