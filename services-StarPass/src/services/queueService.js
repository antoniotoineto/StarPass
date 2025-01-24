import { attractionStates } from "../controllers/attractionController.js";

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
    userQueues[userCode].push({ attractionId: id, queuePosition: "X", estimatedTime: "Y" })

    return { status: true, response: queues[id].queue };
};

export const attractionQueue = (attractionId) => {

    if (!queues[attractionId]) {
        return { status: false, message: "Essa atração ainda não possui fila." };
    }

    return { status: true, response: queues[attractionId] };
};

export const attractionQueueStatus = (attractionId, attraction) => {
    
    const queue = queues[attractionId]?.queue;
    if (!queue) {
        return { status: true, peopleInQueue: 0, waitTime: 0 }
    }

    let queueLength = 0
    queueLength = queue.length;

    // TEM QUE REFAZER TUDOOOOOO AAAAA
    // let currentExecutionTime = 0;
    // let currentOperationalTime = 0;
    // let estimatedTime = -1;

    // const { maximumCapacity, executionTime, entryTime, exitTime } = attraction;
    // const operationalTime = entryTime + exitTime;
    // const cyclesNeeded = Math.floor(queueLength / maximumCapacity);

    // if(!attractionStates[attractionId]) {
    //     return {status: false, message: "Atração não encontrada na base de dados."}
    // } else if(attractionStates[attractionId].operant){
    //     currentExecutionTime = attractionStates[attractionId].timer;
    //     currentOperationalTime = exitTime;
    // }

    // if (cyclesNeeded < 1) {
    //     estimatedTime = 0
    // } else {
    //     estimatedTime = 
    //         (currentExecutionTime + currentOperationalTime) + 
    //         (executionTime + operationalTime) * (cyclesNeeded-1);
    // }

    return {status: true, peopleInQueue: queueLength, waitTime: estimatedTime}

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
    return {status: true, response: userQueuesData}
};