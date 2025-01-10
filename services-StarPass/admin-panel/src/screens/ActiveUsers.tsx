import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveUsers: React.FC = () => {
  const [codes, setCodes] = useState<{ code: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios-ativos');
        setCodes(response.data);
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
        <h1 style={styles.logo}>Logo</h1>
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
  logo: {
    fontSize: "2rem",
    fontWeight: "bold" as "bold",
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
