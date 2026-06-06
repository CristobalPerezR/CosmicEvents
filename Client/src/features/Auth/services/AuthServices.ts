import axiosInstance from "../../../api/axiosConfig"

export const Login_Service = async (name: string, psw: string) => {
    try {
        const res = await axiosInstance.post('/login', {
            name: name,
            psw: psw
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
};


export const Register_Service  = async (name: string, handle: string, psw: string, email: string) => {
    try {
        const res = await axiosInstance.post('/register', {
            name: name,
            handle: handle,
            psw: psw,
            email: email
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
};