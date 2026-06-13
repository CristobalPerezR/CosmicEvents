import axiosInstance from "../../../api/axiosConfig";

export const GetFollowsAndFollowers_Service = async(username:string) =>{
    try{
        const res = await axiosInstance.get(`/GET_FollowsFollowers/${username}`);
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}

export const GetNPosts_Service = async(username:string) =>{
    try{
        const res = await axiosInstance.get(`/GET_NPost/${username}`);
        return res.data;
    } catch (error){
        console.error("Error:", error);
        throw error;
    }
}
