// Server/src/index.ts
import express from 'express';
import cors from "cors";

import authRoutes from "./features/auth/authRouter.js";
import userRoutes from "./features/UserProfile/userRouter.js";
import globalRoutes from "./features/Global-Use/globalRouter.js"

const app = express();


app.use(express.json());
app.use(cors());


/* ROUTES */
app.use(authRoutes); // Login | Register
app.use(userRoutes); // DeleteAccount | Account Managements
app.use(globalRoutes); //


app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
}); 