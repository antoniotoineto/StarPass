import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectGate: React.FC = () => {
    const [selectedGate, setSelectedGate] = useState<string>("0");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSelection = () => {
        if(selectedGate==="0"){
            setError(true)
        } else {
            navigate(`/codes/${selectedGate}`);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Selecione o Guichê</h1>
            <select value={selectedGate} onChange={(e) => setSelectedGate(e.target.value)}>
                <option value="0">Selecione</option>
                <option value="1">Guichê 1</option>
                <option value="2">Guichê 2</option>
                <option value="3">Guichê 3</option>
            </select>
            <br />
            {error && <p style={{ color: "red" }}>Selecione um guichê para continuar</p>}
            <button onClick={handleSelection} style={{ marginTop: "20px" }}>
                Ver Códigos
            </button>
        </div>
    );
};

export default SelectGate;
