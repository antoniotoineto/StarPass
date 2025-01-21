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

export const attractionQueueStatus = (attractionId, attractionsCache) => {
    let attraction = null;
    if(attractionsCache !== null){
        attraction = attractionsCache.find(attraction => attraction.id === attractionId)
        if (!attraction) {
            return {status: false, message: "Atração não encontrada."}
        }
    } else {
        return {status: false, message: "Atrações não foram carregadas da base de dados."}
    }

    const queue = queues[attractionId]?.queue;
    if (!queue) {
        return { status: true, peopleInQueue: 0, waitTime: 0 }
    }

    let queueLength = 0
    queueLength = queue.length;
    const { executionTime, maximumCapacity, operationalTime } = attraction;
    let estimatedTime = -1

    const cyclesNeeded = Math.floor(queueLength / maximumCapacity);

    if (cyclesNeeded < 1) {
        estimatedTime = 0
    } else {
        estimatedTime = (executionTime + operationalTime) * cyclesNeeded;
    }

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