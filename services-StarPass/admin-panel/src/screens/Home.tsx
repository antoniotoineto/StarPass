import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.logo}>Logo</h1>
                <h2 style={styles.subtitle}>Telas Administrativas - Star Pass</h2>
                <div style={styles.button} onClick={() => handleNavigation('/codes')}>
                    Códigos de entrada
                </div>
                <div style={styles.button} onClick={() => handleNavigation('/active-users')}>
                    Usuários ativos
                </div>
                <div style={styles.button} onClick={() => handleNavigation('/attractions')}>
                    Atrações
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
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: 18,
    },
    logo: {
        fontSize: "2rem",
        fontWeight: "bold" as "bold",
    },
    subtitle: {
        fontSize: "1.2rem",
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

export default AdminPanel;
