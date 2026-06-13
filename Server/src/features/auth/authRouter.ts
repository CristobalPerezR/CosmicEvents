import { Router } from "express";
import { DoLogin, DoRegister, CheckUsername, CheckEmail } from "../auth/auth.controller.js"

const routes: Router = Router();

routes.post("/login", DoLogin);
routes.post("/register", DoRegister);

routes.post("/GET_username", CheckUsername); // Only to Fast Check on Register
routes.post("/GET_email", CheckEmail); // Only to Fast Check on Register

export default routes;