import { fetchAttractions } from "../services/attractionService.js";

let attractionsCache = null

export const getAllAttractions = async (req, res) => {
    if (attractionsCache === null) {
        try {
            const result = await fetchAttractions();
            if (result.status) {
                attractionsCache = result.response
                console.log("Atrações atualizadas no cache.");
            }

        } catch (error) {
            console.error('Erro ao buscar atrações:', error);
            res.status(500).json({ message: 'Erro ao buscar atrações' });
        }
    }

    res.status(200).json(attractionsCache);

};