import { Router } from "express";
import { UpdateCountry, UpdatePhone, UpdateEmail, DeleteAccount, CheckEmail, GetEmail, CheckPhone, GetPhone } from "../UserProfile/user.controller.js";
import { validateToken } from "../../shared/middlewares/TokenMiddleware.js";

const router : Router = Router();

router.post("/delete_account", validateToken, DeleteAccount); // WORK

router.post("/update_email", validateToken, UpdateEmail);
router.post("/update_phone", validateToken, UpdatePhone);
router.post("/update_country", validateToken, UpdateCountry);

//TOOLS
router.post("/TOOL_check_email", validateToken, CheckEmail); // WORK
router.post("/TOOL_get_email", validateToken, GetEmail);

router.post("/TOOL_check_phone", validateToken, CheckPhone); // WORK
router.post("/TOOL_get_phone", validateToken, GetPhone);



export default router;