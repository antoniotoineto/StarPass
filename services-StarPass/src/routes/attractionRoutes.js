import express from "express";
import { getAllAttractions, setAttractionState } from "../controllers/attractionController.js";

const attractionRoutes = express.Router();

attractionRoutes.get("/lista-brinquedos", getAllAttractions);
attractionRoutes.post("/estado-brinquedo/:attractionId", setAttractionState);

export default attractionRoutes;
