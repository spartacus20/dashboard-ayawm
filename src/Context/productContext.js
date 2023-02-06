import { createContext, useContext, useReducer } from "react";

export const ProductContext = createContext();

export const  ProductProvider = ({ reducer, initialState, children }) => (
  <ProductContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProductContext.Provider>
);

export const useProductValue = () => useContext(ProductContext);
