import express from "express";
import { generateEntryCode, validateEntryCode, getGateCodes } from "../controllers/gateController.js";

const gateRoutes = express.Router();

gateRoutes.post("/codigo-entrada", generateEntryCode);
gateRoutes.post("/validar-codigo", validateEntryCode);
gateRoutes.get("/codigos-guiche/:gate", getGateCodes);

export default gateRoutes;
