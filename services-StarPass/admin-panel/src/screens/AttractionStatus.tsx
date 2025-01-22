import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AttractionQueue from '../components/AtractionQueues';
import { useLocation } from 'react-router-dom';
import AttractionState from '../components/AttractionState';
import { subscribe } from 'diagnostics_channel';

const AttractionStatus: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};

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
                <h1 style={styles.title}>Consulta de Atração</h1>
                <h3 style={styles.subtitle}>{name}</h3>
                <div style={styles.dataContainer}>
                    <AttractionQueue />
                    <AttractionState />
                </div>
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
    title: {
        fontSize: "1.6rem",
        textAlign: "center" as "center",
    },
    subtitle: {
        fontSize: "1.3rem",
        textAlign: "center" as "center",
        backgroundColor: '#5ca0ff',
        borderRadius: 10
    },
    dataContainer: {
        display: "flex",
        flexDirection: "row" as "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 100
    },
    
};

export default AttractionStatus;
