import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttractionQueue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [queue, setQueue] = useState<{ code: string; timestamp: string }[]>([]);
  const [attractionName, setAttractionName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/consultar-fila/${id}`);
        const attractionQueue = response.data.attractionQueue || {};
        setQueue(attractionQueue.queue || []);
        setAttractionName(attractionQueue.atractionName || 'Brinquedo Desconhecido');
      } catch (err) {
        setError('Erro ao buscar fila para o brinquedo.');
      }
    };

    fetchQueue();
  }, [id]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Logo</h1>
        <h2 style={styles.subtitle}>
          Fila do Brinquedo: {attractionName || 'Carregando...'}
        </h2>
        {error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <ul style={styles.list}>
            {queue.length > 0 ? (
              queue.map((user, index) => (
                <li key={index} style={styles.listItem}>
                  <span>Código: {user.code}</span>
                  <span>Horário: {new Date(user.timestamp).toLocaleTimeString()}</span>
                </li>
              ))
            ) : (
              <p style={styles.emptyQueue}>Não há usuários na fila.</p>
            )}
          </ul>
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
    listStyleType: "none" as "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
  },
  emptyQueue: {
    textAlign: "center" as "center",
    fontSize: "0.9rem",
    color: "#888",
  },
};

export default AttractionQueue;
