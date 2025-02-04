import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSelect } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';

const SelectGate: React.FC = () => {
    const [selectedGate, setSelectedGate] = useState<string>("0");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSelection = () => {
        if (selectedGate === "0") {
            setError(true)
        } else {
            navigate(`/codes/${selectedGate}`);
        }
    };

    const handleBack = () => {
        navigate(`/`);
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.topBar}>
                    <IoMdArrowBack size={35} style={styles.backIcon} onClick={() => handleBack()} />
                    <img src='/logo_StarPass.png' style={styles.image}/>
                </div>
                <h2 style={styles.subtitle}>
                    Selecione o guichê para mostrar as senhas de entrada
                </h2>
                <AiOutlineSelect size={50} style={styles.icon} />
                <select
                    style={styles.select}
                    value={selectedGate}
                    onChange={(e) => setSelectedGate(e.target.value)}
                >
                    <option value="0">Selecione</option>
                    <option value="1">Guichê 1</option>
                    <option value="2">Guichê 2</option>
                    <option value="3">Guichê 3</option>
                </select>
                {error && <p style={styles.error}>Selecione um guichê para continuar</p>}
                <button style={styles.button} onClick={handleSelection}>
                    Ver Códigos
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        backgroundColor: "#e6e6e6",
        padding: "40px",
    },
    topBar: {
        display: "flex",
        flexDirection: "row" as "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "relative" as "relative",
    },
    backIcon: {
        position: "absolute" as "absolute",
        left: 20,
        cursor: "pointer",
    },
    card: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: 18
    },
    image: {
        width: 250,
        height: 70,
        marginRight: 15
    },
    subtitle: {
        fontSize: "1.2rem",
        textAlign: "center" as "center",
    },
    icon: {
        marginBottom: "10px",
    },
    select: {
        width: "80%",
        maxWidth: "400px",
        padding: "10px",
        fontSize: "1rem",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        marginTop: "-10px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default SelectGate;
