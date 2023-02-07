import { createContext, useContext, useReducer } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ reducer, initialState, children }) => {


  return (
    <ProductContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProductContext.Provider>
  )
};


export const useProductValue = () => useContext(ProductContext);
