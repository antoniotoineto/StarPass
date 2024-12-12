import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GateCodes: React.FC = () => {
    const { gate } = useParams<{ gate: string }>();
    const [codes, setCodes] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/codigos-guiche/${gate}`);
                setCodes(response.data.codes);
            } catch (err) {
                setError("Erro ao buscar os códigos.");
            }
        };

        fetchCodes();
    }, [gate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Códigos do Portão {gate}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {codes.length > 0 ? (
                <ul>
                    {codes.map((code, index) => (
                        <li key={index}>{code}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum código encontrado para este portão.</p>
            )}
        </div>
    );
};

export default GateCodes;
