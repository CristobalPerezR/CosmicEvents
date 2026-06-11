import { Router } from "express";
import { UpdateCity, UpdatePhone, UpdateEmail, DeleteAccount, CheckEmail, GetEmail, CheckPhone, GetPhone, GetSettings, UpdateSettings, GetCountries, GetSubdivisions, GetCities } from "../UserProfile/user.controller.js";
import { validateToken } from "../../shared/middlewares/TokenMiddleware.js";

const router : Router = Router();

router.post("/delete_account", validateToken, DeleteAccount); // WORK

router.post("/update_email", validateToken, UpdateEmail);
router.post("/update_phone", validateToken, UpdatePhone);
router.post("/update_city", validateToken, UpdateCity); // WORK

router.post("/update_settings", validateToken, UpdateSettings); // WORK

//TOOLS
router.post("/TOOL_check_email", CheckEmail); // WORK
router.post("/TOOL_get_email", validateToken, GetEmail); // WORK

router.post("/TOOL_check_phone", CheckPhone); // WORK
router.post("/TOOL_get_phone", validateToken, GetPhone);

router.post("/TOOL_get_settings", validateToken, GetSettings); //WORK

// LOCATION TOOLS
router.get("/GET_Countries", validateToken, GetCountries);
router.get("/GET_Countries/:country_id/Subdivisions", validateToken, GetSubdivisions);
router.get("/GET_Subdivisions/:subd_id/Cities", validateToken, GetCities);


export default router;