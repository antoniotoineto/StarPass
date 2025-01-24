import { fetchAttractions, toggleAttractionState } from "../services/attractionService.js";

export let attractionsCache = null
export const attractionStates = {};

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
                    timer: attraction.executionTime || 0,
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

    //const attraction = attractionsCache.find(attraction => attraction.id === attractionId);
    const attractionCurrentState = attractionStates[attractionId].operant
    const timer = attractionStates[attractionId].timer

    return res.status(200).json({ 
        state: attractionCurrentState, 
        executionTime: timer,
        currentExecutionTime: 0
    });
};