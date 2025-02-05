import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


const ActiveUsers: React.FC = () => {
  const [codes, setCodes] = useState<{ code: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/`);
  }

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await api.get('/usuarios/usuarios-ativos');
        setCodes(response.data.currentActiveUsers);
        setError('');
      } catch (err) {
        setError('Erro ao buscar códigos');
      }
    };

    fetchCodes();

    const intervalId = setInterval(fetchCodes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <IoMdArrowBack size={35} style={styles.icon} onClick={() => handleBack()} />
          <img src='/logo_StarPass.png' style={styles.image}/>
        </div>
        <h2 style={styles.subtitle}>Usuários Ativos</h2>
        {error && <p style={styles.error}>{error}</p>}
        <ul style={styles.list}>
          {Array.isArray(codes) && codes.map((item, index) => (
            <li key={index} style={styles.listItem}>
              {item.code}
            </li>
          ))}
        </ul>
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
    width: "80%",
    maxWidth: "500px",
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
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  list: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    maxHeight: "200px",
    overflowY: "auto" as "auto",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
    textAlign: "left" as "left",
  },
};

export default ActiveUsers;
