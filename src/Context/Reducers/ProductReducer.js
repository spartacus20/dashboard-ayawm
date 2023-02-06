

export const ProductInitialState = {
    products: null,
}

export const actionTypes = {
   
    SET_PRODUCTS: "SET_USER",
   
}

const productReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
           return { ...state, products: action.products }
        default:
            return state;

    }
}

export default productReducer