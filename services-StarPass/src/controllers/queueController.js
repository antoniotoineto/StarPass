import { 
    processQueueEntry, 
    attractionQueue, 
    attractionQueueStatus, 
    exitQueue,
    allUserQueues
} from "../services/queueService.js";
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
    let name = null
    if(attractionsCache && attractionsCache.length > 0){
        const attraction = attractionsCache.find(attraction => attraction.id === attractionId);
        if(attraction) name = attraction.name;
    }

    const attrQueue = attractionQueue(attractionId);

    if (!attrQueue.status) return res.status(400).json({ attractionName: name, message: attrQueue.message })

    return res.status(200).json({
        attractionQueue: attrQueue.response
    })

};

export const getAttractionQueueStatus = (req, res) => {
    const { attractionId } = req.params

    let attraction = null;
    if(attractionsCache !== null){
        attraction = attractionsCache.find(attraction => attraction.id === attractionId)
        if (!attraction) {
            return res.status(404).json({message: "Atração não encontrada."});
        }
    } else {
        return res.status(404).json({message: "Atrações não foram carregadas da base de dados."});
    }

    const attrQueueStatus = attractionQueueStatus(attractionId, attraction);

    if(!attrQueueStatus.status) return res.status(404).json({ message: attrQueueStatus.message });

    return res.status(200).json({
        queueLength: attrQueueStatus.peopleInQueue,
        estimatedTime: attrQueueStatus.waitTime
    });

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