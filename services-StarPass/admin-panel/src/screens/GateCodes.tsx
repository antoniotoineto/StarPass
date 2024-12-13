import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';



const GateCodes: React.FC = () => {
    const { gate } = useParams<{ gate: string }>();
    const [codes, setCodes] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/`);
    }

useEffect(() => {
    const fetchCodes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/codigos-guiche/${gate}`);
            if (response.data && Array.isArray(response.data.codes)) {
                setCodes(response.data.codes);
            } else {
                setCodes([]);
                setError("Nenhum código encontrado para este portão.");
            }
        } catch (err) {
            setError("Erro ao buscar os códigos.");
        }
    };

    fetchCodes();

    const intervalId = setInterval(fetchCodes, 5000);

    return () => clearInterval(intervalId);
}, [gate]);

return (
    <div style={styles.container}>
        <div style={styles.card} >
            <div style={styles.topBar}>
                <IoMdArrowBack size={35} style={styles.icon} onClick={()=> handleBack()}/>
                <h1 style={styles.logo}>Logo</h1>
            </div>
            <h1>Guichê {gate}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {codes.length > 0 ? (
                <div style={styles.scrollContainer}>
                    <ul style={styles.codeList}>
                        {codes.map((code, index) => (
                            <li key={index} style={index === 0 ? styles.firstCodeItem : styles.codeItem}>
                                {code}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={styles.emptyMessage}>Nenhum código encontrado para este portão.</p>
            )}
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
    icon: {
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
        borderRadius: 18,
        width: "40%",
        minWidth: "250px"
    },
    logo: {
        fontSize: "2rem",
        fontWeight: "bold" as "bold",
    },
    scrollContainer: {
        width: "100%",
        maxHeight: "200px",
        overflowY: "auto" as "auto",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column" as "column",
        gap: "10px",
    },
    codeList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column" as "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
    },
    firstCodeItem: {
        backgroundColor: "#cccccc",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "2rem",
        fontWeight: "bold" as "bold",
        textAlign: "center" as "center",
        width: "80%",
    },
    codeItem: {
        backgroundColor: "#e3e3e3",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "1.5rem",
        textAlign: "center" as "center",
        width: "70%"
    },
    emptyMessage: {
        color: 'red'
    }
};

export default GateCodes;
