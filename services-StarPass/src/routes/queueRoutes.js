import express from "express";
import {
    joinQueue,
    getAttractionQueue,
    getAttractionQueueStatus,
    getUserQueues,
    leaveQueue,
    joinAttraction
} from "../controllers/queueController.js";

const queueRoutes = express.Router();

queueRoutes.post("/entrar-fila", joinQueue);
queueRoutes.get("/consultar-fila/:attractionId", getAttractionQueue);
queueRoutes.get("/status-fila-brinquedo/:attractionId/:userStatus", getAttractionQueueStatus);
queueRoutes.get("/filas-usuario/:userCode", getUserQueues);
queueRoutes.post("/sair-fila/:userCode/:attractionId", leaveQueue);
queueRoutes.post("/entrar-brinquedo", joinAttraction);


export default queueRoutes;
