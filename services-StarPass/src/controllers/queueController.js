import {
    processQueueEntry,
    attractionQueue,
    attractionQueueStatus,
    exitQueue,
    allUserQueues,
    enterAttraction
} from "../services/queueService.js";
import { attractionsCache } from "./attractionController.js";

export const joinQueue = (req, res) => {
    const { id, userCode } = req.body;

    const processEntry = processQueueEntry(id, userCode);

    if (!processEntry.status) return res.status(400).json({ message: processEntry.message });

    return res.status(200).json({
        message: `Usuário ${userCode} entrou na fila do brinquedo com sucesso.`,
        currentQueue: processEntry.response
    });

};

export const getAttractionQueue = (req, res) => {
    const { attractionId } = req.params
    let name = null
    if (attractionsCache && attractionsCache.length > 0) {
        const attraction = attractionsCache.find(attraction => attraction.id === attractionId);
        if (attraction) name = attraction.name;
    }

    const attrQueue = attractionQueue(attractionId);

    if (!attrQueue.status) return res.status(400).json({ attractionName: name, message: attrQueue.message })

    return res.status(200).json({
        attractionQueue: attrQueue.response
    })

};

export const getAttractionQueueStatus = (req, res) => {
    const { attractionId, userStatus } = req.params

    let attraction = null;
    if (attractionsCache !== null) {
        attraction = attractionsCache.find(attraction => attraction.id === attractionId)
        if (!attraction) {
            return res.status(404).json({ message: "Atração não encontrada." });
        }
    } else {
        return res.status(404).json({ message: "Atrações não foram carregadas da base de dados." });
    }

    const attrQueueStatus = attractionQueueStatus(attractionId, attraction, userStatus);

    switch (attrQueueStatus.status) {
        case ("not_found"):
            return res.status(404).json({ message: attrQueueStatus.message });

        case ("boarding"):
            return res.status(200).json({
                queueLength: attrQueueStatus.peopleInQueue,
                estimatedTime: attrQueueStatus.waitTime,
                timeLeft: attrQueueStatus.timeLeft
            });

        case ("operational"):
            console.log("Status da fila: ", attrQueueStatus.status);
            return res.status(200).json({
                queueLength: attrQueueStatus.peopleInQueue,
                estimatedTime: attrQueueStatus.waitTime,
            });
        case ("not_operational"):
            console.log("Status da fila: ", attrQueueStatus.status);
            return res.status(200).json({
                queueLength: attrQueueStatus.peopleInQueue,
                estimatedTime: attrQueueStatus.waitTime,
            });
        case ("long_queue"):
            console.log("Status da fila: ", attrQueueStatus.status);
            return res.status(200).json({
                queueLength: attrQueueStatus.peopleInQueue,
                estimatedTime: attrQueueStatus.waitTime,
            });
        default:
            return res.status(400).json({ message: "Erro inesperado. Tente novamente." });
    }


};

export const getUserQueues = (req, res) => {
    const { userCode } = req.params
    const userQueues = allUserQueues(userCode);

    return res.status(200).json({
        userQueues: userQueues.response
    })

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

export const joinAttraction = (req, res) => {
    const { attractionId, userCode } = req.body;

    const joinAttraction = enterAttraction(attractionId, userCode);

    if(!joinAttraction.status) return res.status(400).json({ message: joinAttraction.message });

    return res.status(200).json({ message: joinAttraction.message });
};