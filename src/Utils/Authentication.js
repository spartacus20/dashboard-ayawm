import axios from "../Services/axios"
import Cookies from "universal-cookie";

export var Authentication = async () => {
    const cookie = new Cookies();
    const userToken = cookie.get("jid");
    console.log(userToken)
    if (userToken) {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
            });
            return response.data;
        } catch (e) {
            return null;
        }

    }


}