import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttractionState: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [queue, setQueue] = useState<{ code: string; timestamp: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchQueue = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/filas/consultar-fila/${id}`);
//         const attractionQueue = response.data.attractionQueue || {};
//         setQueue(attractionQueue.queue || []);
//         setAttractionName(attractionQueue.attractionName || 'Brinquedo Desconhecido');
//       } catch (err: any) {
//         if (err.response && err.response.data && err.response.data.message) {
//           setError(err.response.data.message);
//           setAttractionName(err.response.data.attractionName || 'Brinquedo Desconhecido');
//         } else {
//           setError("Atração ainda não possui fila ou está indisponível.")
//         }
//       }
//     };

//     fetchQueue();

//     const intervalId = setInterval(fetchQueue, 5000);

//     return () => clearInterval(intervalId);
//   }, [id]);

  return (
      <div style={styles.card}>
        <h2 style={styles.subtitle}>
          Execução
        </h2>
        {error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <p>tmj</p>
        )}
      </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#e3e3e3",
    borderRadius: 18,
    width: "80%",
    maxWidth: "500px",
    height: "40vh"
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center" as "center",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "10px",
    textAlign: 'center' as 'center'
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

export default AttractionState;
