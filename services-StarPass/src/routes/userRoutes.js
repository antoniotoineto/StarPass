import express from "express";
import { getActiveUsers, exitPark } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/usuarios-ativos", getActiveUsers);
userRoutes.post("/retirar-usuario", exitPark);

export default userRoutes;
