import type { Request, Response } from "express";
import * as UserModels from "./user.model.js"
import bcrypt from "bcrypt";

export const GetUserData = async(userId: number) => {
    const user = await UserModels.get_user_data(userId);
    return user;
}

export const DeleteAccount = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const del = await UserModels.delete_account(userId);

        res.status(200).json(del);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

export const UpdateEmail = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = ((req as any).user.id) as number;
        const { email } = req.body;
        const ap = await UserModels.update_email(userId, email);

        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

export const UpdatePhone = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { phone } = req.body;
        const ap = await UserModels.update_phone(userId, phone);

        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

export const UpdateCity = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { city_id } = req.body;
        const ap = await UserModels.update_city(userId, Number(city_id));
        const user = await UserModels.get_user_data(userId);

        res.status(200).json({
            user : {
                username: user.user_username,
                display_user: user.user_display_name,
                profile_image: user.user_profile_picture_url
            },
            location: {
                city: user.city_name,
                country: user.country_name,
                country_sig: user.country_sig
            }
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

export const UpdateSettings = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { enabled, catalogue, nearby_events, new_followers, likes_summary} = req.body;
        const ap = await UserModels.update_settings(userId, enabled, catalogue, nearby_events, new_followers, likes_summary);

        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

export const UpdatePassword = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { psw } = req.body;
        const hashedpsw = await bcrypt.hash(psw, 10);
        const ap = await UserModels.update_password(userId, hashedpsw);
        
        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

export const UpdateDisplayname = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { displayname } = req.body;
        const ap = await UserModels.update_displayname(userId, displayname);
        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}


//#region TOOLS

//-> Check password match
export const CheckPassword = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { psw } = req.body;

        const hashedpsw = await UserModels.Get_Password(userId);
        if (await bcrypt.compare(psw, hashedpsw.user_psw_hash)){
            res.status(200).json(true);
        } else{
            res.status(200).json(false);
        }

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}



// -> Check if the new email is used by someone else.
export const CheckEmail = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { email } = req.body;
        const ap = await UserModels.Check_Email(userId, email);
        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

// -> Get Email From user 
export const GetEmail = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const email = await UserModels.Get_Email(userId);
        res.status(200).json(email);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};


// -> Check if the new phone is used by someone else.
export const CheckPhone = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { phone } = req.body;
        const ap = await UserModels.Check_Phone(userId, phone);
        res.status(200).json(ap);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

// -> Get Phone From user 
export const GetPhone = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const phone = await UserModels.Get_Phone(userId);
        res.status(200).json(phone);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

// -> Get Notification Settings
export const GetSettings = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const settings = await UserModels.Get_Settings(userId);
        res.status(200).json(settings);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};


//#region GET LOCATION
export const GetCountries = async(
    req: Request,
    res: Response
) => {
    try{
        const countries = await UserModels.Get_Countries();
        res.json(countries);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

export const GetSubdivisions = async(
    req: Request,
    res: Response
) => {
    try{
        const { country_id } = req.params;
        const subs = await UserModels.Get_Subdivisions(Number(country_id));
        res.json(subs);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

export const GetCities = async(
    req: Request,
    res: Response
) => {
    try{
        const { subd_id } = req.params;
        const cities = await UserModels.Get_Cities(Number(subd_id));
        res.json(cities);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};
