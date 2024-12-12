import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowBack } from "react-icons/io";


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

        const intervalId = setInterval(fetchCodes, 5000);

        return () => clearInterval(intervalId);
    }, [gate]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.topBar}>
                    <IoMdArrowBack size={50} style={styles.icon} />
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
        justifyContent: "space-between",
        padding: "0 20px", 
    },
    icon: {
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
        minWidth: "50px",
        width: 300,
    },
    codeItem: {
        backgroundColor: "#e3e3e3",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "1.5rem",
        textAlign: "center" as "center",
        minWidth: "50px",
        width: 250
    },
    emptyMessage: {
        color: 'red'
    }
};

export default GateCodes;
