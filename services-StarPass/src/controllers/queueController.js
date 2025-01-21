import { processQueueEntry, attractionQueue, attractionQueueStatus, exitQueue } from "../services/queueService.js";
import { attractionsCache } from "./attractionController.js";

export const joinQueue = (req, res) => {
    const { id, attractionName, userCode } = req.body;

    const processEntry = processQueueEntry(id, attractionName, userCode);

    if (!processEntry.status) return res.status(400).json({ message: processEntry.message });

    return res.status(200).json({
        message: `Usuário ${userCode} entrou na fila do brinquedo '${attractionName}' com sucesso.`,
        currentQueue: processEntry.response
    });

};

export const getAttractionQueue = (req, res) => {
    const { attractionId } = req.params

    const attrQueue = attractionQueue(attractionId);

    if (!attrQueue.status) return res.status(400).json({ message: attrQueue.message })

    return res.status(200).json({
        attractionQueue: attrQueue.response
    })

};

export const getAttractionQueueStatus = (req, res) => {
    const { attractionId } = req.params

    const attrQueueStatus = attractionQueueStatus(attractionId, attractionsCache);

    if(!attrQueueStatus.status) return res.status(404).json({ message: attrQueueStatus.message });

    return res.status(200).json({
        queueLength: attrQueueStatus.peopleInQueue,
        estimatedTime: attrQueueStatus.waitTime
    });

};

export const getUserQueues = (req, res) => {

};

export const leaveQueue = (req, res) => {
    const { userCode, attractionId } = req.params

    const exit = exitQueue(userCode, attractionId);

    if (!exit.status) return res.status(404).json({ message: exit.message });

    return res.status(200).json({
        message: exit.message,
        userQueues: exit.response,
    });

};