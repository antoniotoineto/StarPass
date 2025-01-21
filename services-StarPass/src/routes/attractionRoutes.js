import express from "express";
import { getAllAttractions } from "../controllers/attractionController.js";

const attractionRoutes = express.Router();

attractionRoutes.get("/lista-brinquedos", getAllAttractions);

export default attractionRoutes;
