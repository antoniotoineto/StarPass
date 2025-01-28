import { fetchAttractions, toggleAttractionState } from "../services/attractionService.js";
import { queues, userQueues } from "../services/queueService.js";

export let attractionsCache = null
export const attractionStates = {};
let attractionIntervals = {};

export const getAllAttractions = async (req, res) => {
    if (attractionsCache === null) {
        try {
            const result = await fetchAttractions();
            if (result.status) {
                attractionsCache = result.response
                console.log("Atrações atualizadas no cache.");
            }

            attractionsCache.forEach(attraction => {
                attractionStates[attraction.id] = {
                    operant: false,
                    timer: attraction.entryTime + attraction.executionTime + attraction.exitTime,
                    initialTimer: attraction.entryTime + attraction.executionTime + attraction.exitTime,
                    peopleOnboard: 0
                };
            });
            console.log("Atrações e estados inicializados no cache.");

        } catch (error) {
            console.error('Erro ao buscar atrações:', error);
            res.status(500).json({ message: 'Erro ao buscar atrações' });
        }
    }

    res.status(200).json(attractionsCache);
};

export const setAttractionState = async (req, res) => {
    const { attractionId } = req.params;

    if (!attractionsCache || !attractionStates[attractionId]) {
        return res.status(404).json({ message: "Atração não encontrada." });
    }

    const attractionState = toggleAttractionState(attractionStates[attractionId])

    if (attractionState.state) {
        startAttractionTimer(attractionId);
        checkFinishBoarding(attractionId);
    } else {
        stopAttraction(attractionId);
        resetAttractionMonitoring(attractionId);
    }

    return res.status(200).json({
        message: attractionState.message,
        state: attractionState.state,
    });
};

export const getAttractionState = async (req, res) => {
    const { attractionId } = req.params;

    if (!attractionsCache || !attractionStates[attractionId]) {
        return res.status(404).json({ message: "Atração não encontrada." });
    }

    const attractionCurrentState = attractionStates[attractionId].operant
    const timer = attractionStates[attractionId].timer
    const initialTimer = attractionStates[attractionId].initialTimer

    return res.status(200).json({
        state: attractionCurrentState,
        currentExecutionTime: timer,
        initialExecutionTime: initialTimer
    });
};

export const startAttractionTimer = (attractionId) => {

    if (!attractionStates[attractionId]) {
        return { status: false, message: "Atração não encontrada." };
    }

    const attraction = attractionStates[attractionId];

    if (attractionIntervals[attractionId]) {
        clearInterval(attractionIntervals[attractionId]);
    }

    attractionIntervals[attractionId] = setInterval(() => {
        if (attraction.operant && attraction.timer > 0) {
            attraction.timer -= 1;
            console.log(`Atração ${attractionId} - Timer: ${attraction.timer}s`);
        } else {
            clearInterval(attractionIntervals[attractionId]);
            attraction.operant = false;
            attraction.timer = attraction.initialTimer;
            attractionStates[attractionId].peopleOnboard = 0;
            console.log(`Atração ${attractionId} finalizada.`);
        }
    }, 1000);
};

export const stopAttraction = (attractionId) => {
    const attraction = attractionStates[attractionId];
    attraction.operant = false;
    attraction.timer = attraction.initialTimer;
    console.log(`Atração ${attractionId} parada.`);
};

const monitoredAttractions = {};

export const checkFinishBoarding = (attractionId) => {
    if (!attractionsCache || Object.keys(attractionStates).length === 0) {
        console.error("As atrações ou estados não foram inicializados.");
        return;
    }

    if (monitoredAttractions[attractionId]) {
        return;
    }

    monitoredAttractions[attractionId] = setInterval(() => {
        const attractionState = attractionStates[attractionId];
        if (!attractionState || !attractionState.operant) {
            clearInterval(monitoredAttractions[attractionId]);
            delete monitoredAttractions[attractionId];
            return;
        }

        const attraction = attractionsCache.find((attr) => attr.id === attractionId);
        if (!attraction) {
            console.warn(`Atração com ID ${attractionId} não encontrada no cache.`);
            return;
        }

        const boardingTimeLimit = attraction.executionTime + attraction.exitTime;

        if (attractionState.peopleOnboard < attraction.maximumCapacity) {
            if (attractionState.timer > boardingTimeLimit) {
                return;
            } else {
                console.log(`Atração ${attractionId} finalizou embarque por tempo excedido.`);

                const absentUsers = attraction.maximumCapacity - attractionState.peopleOnboard;

                const removedUsers = queues[attractionId].queue.splice(0, absentUsers);


                removedUsers.forEach((removedUser) => {
                    const userCode = removedUser.code;
                    
                    if (!userQueues[userCode]) {
                        console.warn(`Usuário ${userCode} não encontrado em userQueues. Pulando.`);
                        return;
                    }

                    userQueues[userCode] = userQueues[userCode].filter(
                        (entry) => entry.attractionId !== attractionId
                    );
                });

                console.log(
                    `Usuários ausentes foram removidos da fila da atração ${attractionId}.`
                );

                clearInterval(monitoredAttractions[attractionId]);
                delete monitoredAttractions[attractionId];
                return;
            }
        } else {
            console.log(`Atração ${attractionId} finalizou embarque por capacidade máxima.`);

            clearInterval(monitoredAttractions[attractionId]);
            delete monitoredAttractions[attractionId];
            return;
        }
    }, 1000);

    console.log(`Monitoramento iniciado para a atração ${attractionId}.`);
};

export const resetAttractionMonitoring = (attractionId) => {
    if (monitoredAttractions[attractionId]) {
        clearInterval(monitoredAttractions[attractionId]);
        delete monitoredAttractions[attractionId];
        console.log(`Monitoramento da atração ${attractionId} foi interrompido.`);
    } else {
        console.warn(`Atração ${attractionId} não está sendo monitorada.`);
    }
};