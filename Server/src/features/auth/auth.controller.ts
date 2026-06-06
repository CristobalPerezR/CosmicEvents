import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as AuthModels from "./auth.model.js"


export const DoLogin = async(
    req: Request,
    res: Response
) => {
    try {
        const { username, psw } = req.body;

        const existuser = await AuthModels.CheckUsername(username);

        if (existuser){ // User Exist

            const hashedpsw = await AuthModels.GetPsw(username);

            if (await bcrypt.compare(psw, hashedpsw.user_psw)){ // MATCHED
                const user = await AuthModels.Login(username);
                const payload = {
                    id: user.user_id,
                    username: user.user_username
                };
                
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h'});

                res.status(200).json({
                    token,
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
            } else{ // Passwords does not match
                res.status(200).json(existuser);
            }
        } else{ // User Don't Exist
            res.status(200).json(existuser);
        }

    } catch (error){
        res.status(500).json({
            message: "Internal Error"
        });
    }
};


export const DoRegister = async (
    req: Request,
    res: Response
) => {
    try {
        const { username, displayname, psw, email } = req.body;
        const check_email = await AuthModels.CheckEmail(email);
        const check_username = await AuthModels.CheckUsername(username);

        if (check_email){ // Existe Email
            res.status(200).json({
                message: "Email already used."
            });
            
        } else if(check_username){ // Existe Usuario 
            res.status(200).json({
                message: "Username already used."
            });

        } else{ // Vacio
            const hashedpsw = await bcrypt.hash(psw, 10);
            const reg = await AuthModels.CreateAccount(username, displayname, hashedpsw, email);
            res.status(200).json({
                message: "User Created"
            });
        };

    } catch (error){
        res.status(500).json({
            message: "Interal Error"
        });
    }
};



export const CheckUsername = async(
    req: Request,
    res: Response
) => {
    try {
        const { username } = req.body;
        const bool = await AuthModels.CheckUsername(username);
        res.status(200).json(bool); // Return True or False

    } catch (error){
        res.status(500).json({
            message: "Interal Error"
        });
    }
};