import type { Request, Response } from "express";
import * as GlobalModels from "./global.model.js"

export const GetFollowersAndFollows = async(
    req: Request,
    res: Response
) => {
    try{
        const { user_username } = req.params;
        const fwrs = await GlobalModels.get_followers(user_username as string);
        const fws = await GlobalModels.get_follows(user_username as string);
        res.json({
            follows: fws,
            followers: fwrs
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};

export const GetNPosts = async(
    req: Request,
    res: Response
) => {
    try{
        const { user_username } = req.params;
        const subs = await GlobalModels.get_nposts(user_username as string);
        res.json(subs);

    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        })
    }
};