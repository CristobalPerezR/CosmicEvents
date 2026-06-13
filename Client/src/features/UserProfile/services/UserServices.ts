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

export const UpdateDisplayname_Service = async(displayname: string) =>{
    try{
        const res = await axiosInstance.post("/update_displayname", {displayname: displayname});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdatePassword_Service = async(psw: string) =>{
    try{
        const res = await axiosInstance.post("/update_password", {psw: psw});
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

export const UpdatePhone_Service = async(phone : string) =>{
    try{
        const res = await axiosInstance.post("/update_phone", {phone: phone});
        return res.data;
    } catch(error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdateCity_Service = async(city_id: string) => {
    try{
        const res = await axiosInstance.post("/update_city", {city_id: city_id});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const UpdateSettings_Service = async(
    enabled:boolean,
    catalogue:boolean,
    nearby_events:boolean,
    new_followers:boolean,
    likes_summary:boolean
) => {
    try{
        const res = await axiosInstance.post("/update_settings", {
            enabled: enabled,
            catalogue: catalogue,
            nearby_events: nearby_events,
            new_followers: new_followers,
            likes_summary: likes_summary
        });
        return res.data;
    } catch (error){
        console.log("Error:", error);
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

export const GetEmail_Service = async() =>{
    try{
        const res = await axiosInstance.post("/TOOL_get_email");
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

export const GetPhone_Service = async() =>{
    try{
        const res = await axiosInstance.post("/TOOL_get_phone");
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetSettings_Service = async() =>{
    try{
        const res = await axiosInstance.post("TOOL_get_settings");
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const CheckPassword_Service = async(psw: string) =>{
    try{
        const res = await axiosInstance.post("TOOL_check_password", {psw: psw});
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

//#region LOCATIONS 

export const GetCountries_Service = async() => {
    try{
        const res = await axiosInstance.get('/GET_Countries');
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetSubdivisions_Service = async(country_id:string) => {
    try{
        const res = await axiosInstance.get(`/GET_Countries/${country_id}/Subdivisions`);
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetCities_Service = async(subd_id:string) => {
    try{
        const res = await axiosInstance.get(`/GET_Subdivisions/${subd_id}/Cities`);
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}