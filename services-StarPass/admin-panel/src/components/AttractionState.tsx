import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttractionState: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/brinquedos/consultar-estado/${id}`);
        setState(response.data.state);
        setTimer(response.data.executionTime);
        console.log("timer: ",timer);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Atração ainda não possui fila ou está indisponível.")
        }
      }
    };

    fetchState();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state && timer !== null) {
      interval = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state, timer]);

  const handleStart = async () => {
    if (state === false) {
      try {
        const response = await axios.post(`http://localhost:5000/brinquedos/mudar-estado/${id}`);
        setState(response.data.state);
      } catch (err) {
        console.error("Erro ao iniciar o brinquedo:", err);
        setError("Erro ao iniciar o brinquedo. Tente novamente.");
      }
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.subtitle}>
        Execução
      </h2>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div>
          <p style={styles.cardText}>
            Estado do brinquedo: <br />
            <b>{state === null ? "Carregando..." : state ? "Operante" : "Não operante"}</b>
          </p>

          <p style={styles.cardText}>Tempo restante:
            <p style={styles.timer}>
              {timer !== null
                ? `${Math.floor(timer / 60)}m ${timer % 60}s`
                : "Sem cronômetro disponível"}
            </p>
          </p>

          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.button,
                backgroundColor: state ? "#d3d3d3" : "#4CAF50",
                cursor: state ? "not-allowed" : "pointer",
              }}
              onClick={handleStart}
              disabled={state || false}
            >
              {state ? "Operando..." : "Iniciar"}
            </button>
          </div>
        </div>
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
    gap: "15px",
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
  cardText: {
    fontSize: "1.0rem",
    textAlign: "center" as "center",
  },
  timer: {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center" as "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    color: "#fff",

  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }


};

export default AttractionState;
