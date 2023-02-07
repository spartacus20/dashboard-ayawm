

export const ProductInitialState = {
    products: null,
    product_loading: false, 
    product_error: null,
}

export const actionTypes = {
   
    SET_PRODUCTS: "SET_USER",
    UPDATE_PRODUCTS: "UPDATE_PRODUCTS",
    
   
}

const productReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCTS:
            return { ...state, products: action.items } 
        case actionTypes.SET_PRODUCTS:
           return { ...state, products: action.items }
        default:
            return state;

    }
}

export default productReducer