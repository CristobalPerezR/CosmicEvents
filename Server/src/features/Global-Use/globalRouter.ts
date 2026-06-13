import { Router } from "express";
import { validateToken } from "../../shared/middlewares/TokenMiddleware.js";
import { GetFollowersAndFollows } from "./global.controller.js";

const router : Router = Router();

router.get("/GET_FollowsFollowers/:user_username", validateToken, GetFollowersAndFollows);


export default router;