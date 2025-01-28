import { attractionStates, attractionsCache } from "../controllers/attractionController.js";

export const queues = {};
export const userQueues = {};

export const processQueueEntry = (id, userCode) => {
    if (!id || !userCode) {
        return { status: false, message: "Os campos 'id', e 'userCode' são obrigatórios." };
    }

    if (!queues[id]) {
        queues[id] = {
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
            return { status: false, message: "Atração não encontrada na base de dados." }
        }
    } else {
        return { status: false, message: "Atrações não foram carregadas da base de dados." };
    }

    const queueStatus = attractionQueueStatus(id, attraction, userCode);

    userQueues[userCode].push({
        attractionId: id,
        queuePosition: queueStatus.peopleInQueue,
        estimatedTime: queueStatus.waitTime,
        wave: queueStatus.wave !== -1 ? queueStatus.wave : -1,
    })

    return { status: true, message: "Usuário entrou na fila do brinquedo com sucesso!" };
};

export const attractionQueue = (attractionId) => {

    if (!queues[attractionId]) {
        return { status: false, message: "Essa atração ainda não possui fila." };
    }

    return { status: true, response: queues[attractionId] };
};

export const attractionQueueStatus = (attractionId, attraction, userStatus) => {

    let currentExecutionTime = 0;
    const { executionTime, exitTime, maximumCapacity } = attraction;

    if (!attractionStates[attractionId]) {
        return { status: "not_found", message: "Estados da atração não encontrados." }
    }

    const isAttractionOperant = attractionStates[attractionId].operant;
    if (isAttractionOperant) {
        currentExecutionTime = attractionStates[attractionId].timer;
    }

    const boarding = isBoardingInProgress(attractionId, currentExecutionTime, executionTime, exitTime, maximumCapacity);

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

    let wave = -1;

    let estimatedTime = -1;
    const totalExecutionTime = attractionStates[attractionId].initialTimer;
    let cyclesNeeded = -1;

    if (userStatus === "out") {
        cyclesNeeded = Math.floor(queueLength / maximumCapacity);
    } else {
        const userIndex = queue.findIndex(user => user.code === userStatus);
        if (userIndex === -1) return { status: "not_found", message: "Usuário não encontrado na fila." };

        cyclesNeeded = Math.floor(userIndex / maximumCapacity);
        queueLength = userIndex + 1;
        wave = Math.ceil((userIndex + 1) / maximumCapacity);
    }

    if (cyclesNeeded < 1) {
        if (boarding.status) {
            return { status: "boarding", peopleInQueue: queueLength, waitTime: 0, timeLeft: boarding.timeLeft, wave: wave };
        }
        if (isAttractionOperant) return { status: "operational", peopleInQueue: queueLength, waitTime: currentExecutionTime, wave: wave };

        return { status: "not_operational", peopleInQueue: queueLength, waitTime: 0, wave: wave };
    } else {
        estimatedTime = currentExecutionTime + (totalExecutionTime * cyclesNeeded);
        return { status: "long_queue", peopleInQueue: queueLength, waitTime: estimatedTime, wave: wave };
    }

};

const isBoardingInProgress = (attractionId, timer, executionTime, exitTime, maximumCapacity) => {
    if (timer < 0) return { status: false, message: "Atração em estado não-operante." };

    if(attractionStates[attractionId].peopleOnboard >= maximumCapacity) return { status: false, message: "Atração em capacidade máxima." };

    if (timer > (executionTime + exitTime)) {
        return { status: true, timeLeft: timer - (executionTime + exitTime) };
    }

    return { status: false, message: "Embarque encerrado ou não iniciado." };
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
    if (!userQueues[userCode] || userQueues[userCode].length === 0) {
        return { status: false, message: "O usuário não está participando de nenhuma fila." };
    }

    userQueues[userCode].forEach((entry, index) => {
        const { attractionId } = entry;

        let attraction = null;
        if (attractionsCache !== null) {
            attraction = attractionsCache.find((attraction) => attraction.id === attractionId);

            if (!attraction) {
                console.warn(`Atração com ID ${attractionId} não encontrada no cache.`);
                return; 
            }
        } else {
            return { status: false, message: "Atrações não foram carregadas da base de dados." };
        }

        const queueStatus = attractionQueueStatus(attractionId, attraction, userCode);

        if (queueStatus) {
            userQueues[userCode][index] = {
                ...entry, 
                queuePosition: queueStatus.peopleInQueue,
                estimatedTime: queueStatus.waitTime,
                wave: queueStatus.wave !== -1 ? queueStatus.wave : -1,
            };
        } else {
            console.warn(
                `Não foi possível atualizar os dados para a atração ${attractionId}.`,
                queueStatus?.message || "Erro desconhecido."
            );
        }
    });

    const userQueuesData = userQueues[userCode];
    return { status: true, response: userQueuesData };
};

export const enterAttraction = (attractionId, userCode) => {
    if (!queues[attractionId] || !queues[attractionId].queue) {
        return { status: false, message: "Brinquedo não encontrado ou sem fila ativa." };
    }

    const userInQueue = queues[attractionId].queue.find((entry) => entry.code === userCode);
    if (!userInQueue) {
        return { status: false, message: "Usuário não está na fila deste brinquedo." };
    }

    const userAttractionData = userQueues[userCode]?.find((entry) => entry.attractionId === attractionId);

    if (!userAttractionData) {
        return { status: false, message: "O brinquedo não está entre as filas do usuário." };
    }

    if (userAttractionData.wave !== 1) {
        return { status: false, message: "Ainda não está na vez desse usuário." };
    }

    let attraction = null;
    if (attractionsCache !== null) {
        attraction = attractionsCache.find(attraction => attraction.id === attractionId)
        if (!attraction) {
            return { status: false, message: "Atração não encontrada na base de dados." }
        }
    } else {
        return { status: false, message: "Atrações não foram carregadas da base de dados." };
    }

    if (!attractionStates[attractionId]) {
        return { status: false, message: "Estado do brinquedo não encontrado." };
    }

    if (!attractionStates[attractionId].operant) {
        return { status: false, message: "Esta atração ainda não está operacional." };
    } else {
        const timer = attractionStates[attractionId].timer;
        const preBoardingTime = attraction.executionTime + attraction.exitTime;
        if (timer < preBoardingTime) return { status: false, message: "Embarque finalizado." };
    }

    if(attractionStates[attractionId].peopleOnboard >= attraction.maximumCapacity){
        return { status: false, message: "Brinquedo atingiu capacidade máxima." };
    }

    queues[attractionId].queue = queues[attractionId].queue.filter((entry) => entry.code !== userCode);

    userQueues[userCode] = userQueues[userCode].filter((entry) => entry.attractionId !== attractionId);

    attractionStates[attractionId].peopleOnboard += 1;

    return { status: true, message: "Usuário entrou no brinquedo com sucesso." };
};