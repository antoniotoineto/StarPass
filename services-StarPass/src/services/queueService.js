import { attractionStates, attractionsCache } from "../controllers/attractionController.js";

const queues = {};
const userQueues = {};

export const processQueueEntry = (id, attractionName, userCode) => {
    if (!id || !attractionName || !userCode) {
        return { status: false, message: "Os campos 'id', 'attractionName' e 'userCode' são obrigatórios." };
    }

    if (!queues[id]) {
        queues[id] = {
            attractionName,
            queue: []
        };
    }

    if (!userQueues[userCode]) {
        userQueues[userCode] = [];
    }

    if (userQueues[userCode].length >= 6) {
        return { status: false, message: "Usuário atingiu o limite máximo de 6 filas simultâneas." };
    }

    const userAlreadyInQueue = queues[id].queue.find(user => user.code === userCode);
    if (userAlreadyInQueue) {
        return { status: false, message: "Usuário já está na fila deste brinquedo." };
    }

    queues[id].queue.push({ code: userCode, timestamp: new Date() });

    let attraction = null;
    if (attractionsCache !== null) {
        attraction = attractionsCache.find(attraction => attraction.id === id)
        if (!attraction) {
            return {status: false, message: "Atração não encontrada na base de dados."}
        }
    } else {
        return {status: false, message: "Atrações não foram carregadas da base de dados." };
    }

    const queueStatus = attractionQueueStatus(id, attraction, userCode);

    userQueues[userCode].push({ 
        attractionId: id, 
        queuePosition: queueStatus.peopleInQueue, 
        estimatedTime: queueStatus.waitTime 
    })

    return { status: true, response: queues[id].queue };
};

export const attractionQueue = (attractionId) => {

    if (!queues[attractionId]) {
        return { status: false, message: "Essa atração ainda não possui fila." };
    }

    return { status: true, response: queues[attractionId] };
};

export const attractionQueueStatus = (attractionId, attraction, userStatus) => {

    let currentExecutionTime = 0;
    const { executionTime, exitTime } = attraction;

    if (!attractionStates[attractionId]) {
        return { status: "not_found", message: "Estados da atração não encontrados." }
    }

    const isAttractionOperant = attractionStates[attractionId].operant;
    if (isAttractionOperant) {
        currentExecutionTime = attractionStates[attractionId].timer;
    }

    const boarding = isBoardingInProgress(currentExecutionTime, executionTime, exitTime);

    const queue = queues[attractionId]?.queue;
    if (!queue) {
        if (boarding.status) {
            return { status: "boarding", peopleInQueue: 0, waitTime: 0, timeLeft: boarding.timeLeft }
        }

        if (isAttractionOperant) return { status: "operational", peopleInQueue: 0, waitTime: currentExecutionTime }

        return { status: "not_operational", peopleInQueue: 0, waitTime: 0 }
    }

    let queueLength = 0
    queueLength = queue.length;

    let estimatedTime = -1;
    const { maximumCapacity } = attraction;
    const totalExecutionTime = attractionStates[attractionId].initialTimer;
    let cyclesNeeded = -1;

    if(userStatus === "out"){
        cyclesNeeded = Math.floor(queueLength / maximumCapacity);
    } else {
        const userIndex = queue.findIndex(user => user.code === userStatus);
        if(userIndex === -1) return {status: "not_found", message: "Usuário não encontrado na fila."};

        cyclesNeeded = Math.floor(userIndex / maximumCapacity);
        queueLength = userIndex + 1;
    }

    if (cyclesNeeded < 1) {
        if (boarding.status) {
            return { status: "boarding", peopleInQueue: queueLength, waitTime: 0, timeLeft: boarding.timeLeft };
        }
        if(isAttractionOperant) return { status: "operational", peopleInQueue: queueLength, waitTime: currentExecutionTime };

        return { status: "not_operational", peopleInQueue: queueLength, waitTime: 0 };
    } else {
        estimatedTime = currentExecutionTime + (totalExecutionTime * cyclesNeeded);
        return { status: "long_queue", peopleInQueue: queueLength, waitTime: estimatedTime };
    }

};

const isBoardingInProgress = (timer, executionTime, exitTime) => {
    if (timer < 0) return { status: false, message: "Atração em estado não-operante." };

    if (timer > (executionTime + exitTime)) {
        return { status: true, timeLeft: timer - (executionTime + exitTime)};
    }

    return { status: false, message: "Embarque encerrado." };
};

export const exitQueue = (userCode, attractionId) => {
    if (!queues[attractionId]) {
        return { status: false, message: "Brinquedo não encontrado." }
    }

    queues[attractionId].queue = queues[attractionId].queue.filter(
        (user) => user.code !== userCode
    );

    if (userQueues[userCode]) {
        userQueues[userCode] = userQueues[userCode].filter(
            (queue) => queue.attractionId !== attractionId
        );
    }

    return {
        status: true,
        message: `Usuário ${userCode} foi removido da fila do brinquedo.`,
        response: userQueues[userCode] || []
    }
};

export const allUserQueues = (userCode) => {
    const userQueuesData = userQueues[userCode] || [];
    return { status: true, response: userQueuesData }
};