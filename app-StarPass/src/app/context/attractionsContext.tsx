import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../data/api';

interface Attraction {
    id: string;
    name: string;
    type: string;
    description: string;
    minimumHeight: string;
    executionTime: number;
    images: string[];
    location: string;
}

interface AttractionContextType {
    attractions: Attraction[];
    fetchAttractions: () => Promise<void>;
}

const AttractionContext = createContext<AttractionContextType | undefined>(undefined);

export const AttractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);

    const fetchAttractions = async () => {
        if (attractions.length > 0) return; // Avoid unecessary calls
        try {
            const response = await api.get('/lista-brinquedos');
            setAttractions(response.data);
        } catch (error: any) {
            console.error('Erro ao buscar atrações:', error.message);
        }
    };

    useEffect(() => {
        fetchAttractions();
    }, []);

    return (
        <AttractionContext.Provider value={{ attractions, fetchAttractions }}>
            {children}
        </AttractionContext.Provider>
    );
};

export const useAttractions = () => {
    const context = useContext(AttractionContext);
    if (!context) {
        throw new Error('useAttractions must be used within a AttractionProvider');
    }
    return context;
};
