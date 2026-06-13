import { Router } from "express";
import { UpdateCity, UpdatePhone, UpdateEmail, DeleteAccount, CheckEmail, GetEmail, CheckPhone, GetPhone, GetSettings, UpdateSettings, GetCountries, GetSubdivisions, GetCities, UpdatePassword, CheckPassword } from "../UserProfile/user.controller.js";
import { validateToken } from "../../shared/middlewares/TokenMiddleware.js";

const router : Router = Router();

router.post("/delete_account", validateToken, DeleteAccount); // WORK

router.post("/update_email", validateToken, UpdateEmail); // WORK
router.post("/update_phone", validateToken, UpdatePhone); // WORK
router.post("/update_city", validateToken, UpdateCity); // WORK
router.post("/update_settings", validateToken, UpdateSettings); // WORK

router.post("/update_password", validateToken, UpdatePassword); 

//TOOLS
router.post("/TOOL_check_email", validateToken, CheckEmail); // WORK
router.post("/TOOL_get_email", validateToken, GetEmail); // WORK
router.post("/TOOL_check_phone", validateToken, CheckPhone); // WORK
router.post("/TOOL_get_phone", validateToken, GetPhone); // WORK
router.post("/TOOL_get_settings", validateToken, GetSettings); //WORK
router.post("/TOOL_check_password", validateToken, CheckPassword); //WORK

// LOCATION TOOLS
router.get("/GET_Countries", validateToken, GetCountries); // WORK
router.get("/GET_Countries/:country_id/Subdivisions", validateToken, GetSubdivisions); // WORK
router.get("/GET_Subdivisions/:subd_id/Cities", validateToken, GetCities); // WORK


export default router;