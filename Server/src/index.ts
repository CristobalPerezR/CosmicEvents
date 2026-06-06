// Server/src/index.ts
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./features/router/authRouter.js";
import userRoutes from "./features/router/userRouter.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


/* ROUTES */
app.use(authRoutes); // Login | Register
app.use(userRoutes); // DeleteAccount | 


app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
}); 