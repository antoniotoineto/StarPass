import prisma from "../models/prismaClientModel.js";

export const fetchAttractions = async () => {
    try {
        const attractions = await prisma.attractions.findMany();
        return {status: true, response: attractions}
    } catch (error) {
        console.error('Erro ao buscar brinquedos:', error);
        return {status: false, message: error}
    }

};
