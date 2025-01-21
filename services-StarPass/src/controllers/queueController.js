import { processQueueEntry, attractionQueue, attractionQueueStatus, exitQueue } from "../services/queueService.js";

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

    const attraction = attractionsCache.find(attraction => attraction.id === attractionId)
    if (!attraction) {
        return res.status(404).json({ message: "Atração não encontrada." });
    }

    const queue = queues[attractionId]?.queue;
    if (!queue) {
        return res.status(200).json({
            queueLength: 0,
            estimatedTime: 0
        });
    }

    let queueLength = 0
    queueLength = queue.length();
    const { executionTime, maximumCapacity, operationalTime } = attraction;
    let estimatedTime = -1

    const cyclesNeeded = Math.floor(queueLength / maximumCapacity);

    if (cyclesNeeded < 1) {
        estimatedTime = 0
    } else {
        estimatedTime = (executionTime + operationalTime) * cyclesNeeded;
    }

    return res.status(200).json({
        queueLength,
        estimatedTime,
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