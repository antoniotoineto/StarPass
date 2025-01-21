import express from "express";
import {
    joinQueue,
    getAttractionQueue,
    getAttractionQueueStatus,
    getUserQueues,
    leaveQueue
} from "../controllers/queueController.js";

const queueRoutes = express.Router();

queueRoutes.post("/entrar-fila", joinQueue);
queueRoutes.get("/consultar-fila/:attractionId", getAttractionQueue);
queueRoutes.get("/status-fila-brinquedo/:attractionId", getAttractionQueueStatus);
queueRoutes.get("/filas-usuario/:userCode", getUserQueues);
queueRoutes.post("/sair-fila/:userCode/:attractionId", leaveQueue);

export default queueRoutes;
