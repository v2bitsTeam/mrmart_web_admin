import React, { useState, useContext, createContext } from "react";

const CategoriesContext = createContext();
const UpdateCategoriesContext = createContext();

export function useCategories() {
  return useContext(CategoriesContext);
}

export function useCategoriesUpdate() {
  return useContext(UpdateCategoriesContext);
}

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  function updateCategories(categories) {
    setCategories(categories);
  }

  return (
    <CategoriesContext.Provider value={categories}>
      <UpdateCategoriesContext.Provider value={updateCategories}>
        {children}
      </UpdateCategoriesContext.Provider>
    </CategoriesContext.Provider>
  );
};
