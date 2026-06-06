import type { Request, Response } from "express";
import * as UserModels from "./user.model.js"
import redisClient from "../../shared/config/redis.js";

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

        await redisClient.del(`user:${userId}`);

        res.status(200).json(del);

    } catch (error){
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

        await redisClient.del(`user:${userId}`);

        res.status(200).json(ap);

    } catch (error){
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

        await redisClient.del(`user:${userId}`);

        res.status(200).json(ap);

    } catch (error){
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

export const UpdateCountry = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const { country } = req.body;
        const ap = await UserModels.update_country(userId, country);

        await redisClient.del(`user:${userId}`);

        res.status(200).json(ap);

    } catch (error){
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

//#region TOOLS

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
        const cachedUser = await redisClient.get(`user:${userId}`);
        if (cachedUser){
            const user = JSON.parse(cachedUser);
            res.status(200).json(user.email);
        }

    } catch (error){
        res.status(500).json({
            message: "Internal Error"
        })
    }
};


// -> Check if the new email is used by someone else.
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
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

// -> Get Email From user 
export const GetPhone = async(
    req: Request,
    res: Response
) => {
    try{
        const userId = parseInt((req as any).user.id);
        const cachedUser = await redisClient.get(`user:${userId}`);
        if (cachedUser){
            const user = JSON.parse(cachedUser);
            res.status(200).json(user.phone);
        }

    } catch (error){
        res.status(500).json({
            message: "Internal Error"
        })
    }
};