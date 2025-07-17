import Keys from "@/constants/Keys";
import axios from "axios";

const axiosInstance = axios.create(
    {
        // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
        headers: {
            // Authorization: `Bearer ${localStorage.getItem(Keys.userToken)}`
        }
    }
)

export default axiosInstance