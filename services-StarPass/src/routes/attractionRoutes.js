import express from "express";
import { getAllAttractions, getAttractionState, setAttractionState } from "../controllers/attractionController.js";

const attractionRoutes = express.Router();

attractionRoutes.get("/lista-brinquedos", getAllAttractions);
attractionRoutes.post("/mudar-estado/:attractionId", setAttractionState);
attractionRoutes.get("/consultar-estado/:attractionId", getAttractionState);

export default attractionRoutes;
