import { notification } from "antd";
import instance from "../core/api";

export const signup = async (user: any) => {
    try {
        const response = await instance.post(`auth/signup`, user);
        return response.data;
    } catch (error:any) {
        notification.error({message:error.response.data.message});
        const errorMessage =
            error.response && error.response.data
                ? error.response.data.message
                : "Signup failed. Please try again.";
        throw new Error(errorMessage);
    }
};
export const signin = async (user: any) => {
    try {
        const response = await instance.post(`auth/signin`, user);
        return response.data;
    } catch (error:any) {
        notification.error({message:error.response.data.message});
        const errorMessage =
            error.response && error.response.data
                ? error.response.data.message
                : "Signin failed. Please check your credentials and try again.";

        throw new Error(errorMessage);
    }
};
