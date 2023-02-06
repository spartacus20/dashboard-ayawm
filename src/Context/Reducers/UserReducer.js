import axios from "../../Services/axios"
import { auth_url } from "../../Utils/constants"
import { Authentication } from "../../Utils/Authentication"
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const cookie = new Cookies();

export const UserInitialState = {
    user: null,
}

export const actionTypes = {
    LOGIN: "LOGIN",
    SET_USER: "SET_USER",
    LOGOUT: "LOGOUT",
}


const userReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            // console.log(action.payload.email)
            axios.post(auth_url, {
                email: action.payload.email,
                password: action.payload.password
            }).then((res) => {
                // console.log("estoy aqui")
                const { data } = res;

                // console.log(data);
                cookie.set("jid", data.refreshToken, {
                    maxAge: 60 * 60 * 24 * 7, // 7 is relative to the days.
                    path: "/",
                });
                window.location.href = "/";
                return {
                    ...state,
                };
            }).catch((err) => {
                const { data } = err.response;
                // console.log(data)
                toast.error(data.msg)
                return {
                    ...state,
                }
            })
        case actionTypes.SET_USER:
            console.log(action.user)
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;

    }
}
export default userReducer;
