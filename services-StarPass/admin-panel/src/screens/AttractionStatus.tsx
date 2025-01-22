import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AttractionQueue from './AtractionsQueues';

const AttractionStatus: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/attractions`);
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.topBar}>
                    <IoMdArrowBack size={35} style={styles.icon} onClick={() => handleBack()} />
                    <h1 style={styles.logo}>Logo</h1>
                </div>
                <h1 style={styles.subtitle}>Consulta de brinquedo</h1>
                <AttractionQueue />
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
    card: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: 18,
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
    logo: {
        fontSize: "2rem",
        fontWeight: "bold" as "bold",
    },
    subtitle: {
        fontSize: "1.6rem",
        textAlign: "center" as "center",
        marginBottom: "20px",
    },
    button: {
        width: "80%",
        maxWidth: "400px",
        padding: "15px",
        fontSize: "1rem",
        textAlign: "center" as "center",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default AttractionStatus;
