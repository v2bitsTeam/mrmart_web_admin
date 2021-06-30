import React, { useState, useContext, createContext } from "react";

const ProductsContext = createContext();
const UpdateProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export function useProductsUpdate() {
  return useContext(UpdateProductsContext);
}

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  function updateProducts(products) {
    setProducts(products);
  }

  return (
    <ProductsContext.Provider value={products}>
      <UpdateProductsContext.Provider value={updateProducts}>
        {children}
      </UpdateProductsContext.Provider>
    </ProductsContext.Provider>
  );
};
