
import axios from "../../Services/axios";
import { products_url } from "../../Utils/constants";
import { actionTypes } from "../Reducers/ProductReducer.js";
import { useProductValue } from "../productContext";

export function useFetchProducts()  {
    const [{ products }, dispatch] = useProductValue();
    axios.get(products_url).then((res) => {
        console.log(res.data.data)
        dispatch({ type: actionTypes.SET_PRODUCTS, items: res.data.data })
      }).catch((err) => {
        console.log(err)
      })
}