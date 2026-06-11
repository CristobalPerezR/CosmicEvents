import axiosInstance from "../../../api/axiosConfig"

export const Login_Service = async (username: string, psw: string) => {
    try {
        const res = await axiosInstance.post('/login', {
            username: username,
            psw: psw
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
};


export const Register_Service  = async (username: string, displayname: string, psw: string, email: string) => {
    try {
        const res = await axiosInstance.post('/register', {
            username: username,
            displayname: displayname,
            psw: psw,
            email: email
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
};

export const CheckUsername_Service = async (username: string) => {
    try {
        const res = await axiosInstance.post('/GET_username', {
            username: username
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const CheckEmail_Service = async (email: string) => {
    try {
        const res = await axiosInstance.post('/GET_email', {
            email: email
        });
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}