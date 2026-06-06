import axiosInstance from "../../../api/axiosConfig";

export const DeleteAccount_Service = async() => {
    try {
        const res = await axiosInstance.post('/delete_account');
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdateEmail_Service = async(email: string) =>{
    try{
        const res = await axiosInstance.post("/update_email", {email: email});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdatePhone_Service = async() => {
    try{
        const res = await axiosInstance.post("/update_phone")
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdateCountry_Service = async() => {
    try{
        const res = await axiosInstance.post("/update_country")
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

//#region TOOLS

export const CheckEmail_Service = async(email: string) =>{
    try{
        const res = await axiosInstance.post("/TOOL_check_email", {email: email});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetEmail_Service = async(email: string) =>{
    try{
        const res = await axiosInstance.post("/TOOL_get_email", {email: email});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const CheckPhone_Service = async(phone: string) =>{
    try{
        const res = await axiosInstance.post("/TOOL_check_phone", {phone: phone});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetPhone_Service = async(phone: string) =>{
    try{
        const res = await axiosInstance.post("/TOOL_get_phone", {phone: phone});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}