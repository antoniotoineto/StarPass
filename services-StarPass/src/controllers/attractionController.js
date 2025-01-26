import { fetchAttractions, toggleAttractionState } from "../services/attractionService.js";

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
    } else {
        stopAttraction(attractionId);
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
        return {status: false, message: "Atração não encontrada."};
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
