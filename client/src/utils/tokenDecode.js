// get token from local storage and decode it and return the user object
import {jwtDecode} from "jwt-decode";

const tokenDecode = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return jwtDecode(token);
    }
    return null;
    };

export default tokenDecode;