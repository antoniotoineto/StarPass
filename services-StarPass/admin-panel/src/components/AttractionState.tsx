import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

interface AttractionStateProps {
  entryTime: number;
  executionTime: number;
  exitTime: number;
}

const AttractionState: React.FC<AttractionStateProps> = ({ entryTime, executionTime, exitTime }) => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [attractionState, setAttactionState] = useState<string | null>("N/A");
  const [error, setError] = useState<string | null>(null);
  const timerCache = useRef<number | null>(null);
  const isTimerEnded = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchState = async () => {
    try {
      const response = await api.get(`/brinquedos/consultar-estado/${id}`);
      const { state: attractionState, currentExecutionTime, initialExecutionTime } = response.data;
      setState(attractionState);
      setTimer(currentExecutionTime);
      timerCache.current = initialExecutionTime;

      if (attractionState && currentExecutionTime > 0) {
        startTimer(currentExecutionTime);
      } else {
        setAttactionState("INATIVO");
      }
    } catch (err: any) {
      setError("Atração ainda não possui fila ou está indisponível.");
    }
  };

  useEffect(() => {
    fetchState();
  }, [id]);

  const handleAdd = async () => {
    if (inputValue.trim() === "") {
      setFeedbackMessage("O campo não pode estar vazio.");
      setIsSuccess(false);

      setTimeout(() => {
        setFeedbackMessage("");
        setIsSuccess(null);
      }, 7000);

      return;
    }

    try {
      const response = await api.post("/filas/entrar-brinquedo", {
        attractionId: id,
        userCode: inputValue,
      });

      if (response.status === 200) {
        setFeedbackMessage("Usuário adicionado à fila com sucesso!");
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error: any) {
      console.error("Erro ao adicionar usuário à fila:", error);
      if (error.response.data.message) {
        setFeedbackMessage(error.response.data.message);
      } else {
        setFeedbackMessage("Falha ao adicionar usuário na fila.");
      }
      setIsSuccess(false);
    }

    setInputValue("");

    setTimeout(() => {
      setFeedbackMessage("");
      setIsSuccess(null);
    }, 7000);
  };

  const startTimer = (startValue?: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer((prev) => startValue ?? prev);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev !== null && prev > 0) {
          checkState(prev - 1);
          return prev - 1;
        } else {
          clearInterval(intervalRef.current!);
          handleTimerEnd();
          return 0;
        }
      });
    }, 1000);
  };


  const checkState = (timer: any) => {
    const boardingTimeLimit = executionTime + exitTime;
    const operationalTimeLimit = exitTime;
    if (timer > boardingTimeLimit) return setAttactionState("EMBARQUE")

    if (timer > operationalTimeLimit) return setAttactionState("OPERACIONAL")

    if (timer < operationalTimeLimit) return setAttactionState("DESEMBARQUE")
  }

  const handleTimerEnd = async () => {
    if (isTimerEnded.current) return;
    isTimerEnded.current = true;

    try {
      setState(false);
      setTimer(timerCache.current);
    } catch (err) {
      console.error("Erro ao finalizar o brinquedo:", err);
      setError("Erro ao finalizar o brinquedo. Tente novamente.");
    } finally {
      isTimerEnded.current = false;
    }
  };

  const toogleState = async () => {
    clearInterval(intervalRef.current!); 

    try {
      const response = await api.post(`/brinquedos/mudar-estado/${id}`);
      setState(response.data.state);
      setTimer(timerCache.current);

      if (!state) {
        startTimer(); 
      }

      setError(null);
    } catch (err) {
      console.error("Erro ao iniciar o brinquedo:", err);
      setError("Erro ao iniciar o brinquedo. Tente novamente.");
    }
  }

  const handleStart = async () => {
    if (!state) {
      toogleState();
    } else {
      const confirmStop = window.confirm("Tem certeza de que deseja parar esta atração?");
      if (confirmStop) {
        toogleState();
        handleTimerEnd();
      } else {
        window.alert("Ação cancelada.");
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
        <div style={styles.contentContainer}>
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
            <p style={styles.attractionState}>
              {attractionState}
            </p>
          </p>

          <p style={styles.cardText}>Embarque:</p>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              placeholder="Insira o código do usuário"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button style={styles.addButton} onClick={handleAdd}>
              +
            </button>
          </div>

          {feedbackMessage && (
            <p
              style={{
                ...styles.feedback,
                color: isSuccess ? "green" : "red",
              }}
            >
              {feedbackMessage}
            </p>
          )}

          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.button,
                backgroundColor: state ? "#f76157" : "#4CAF50",
              }}
              onClick={handleStart}
            >
              {state ? "Parar" : "Iniciar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#e3e3e3",
    borderRadius: 18,
    width: "80%",
    maxWidth: "500px",
  },
  contentContainer: {
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",

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
    marginTop: 1
  },
  attractionState: {
    backgroundColor: "#6f86e3",
    borderRadius: 5,
    color: 'white'
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    padding: "8px",
    fontSize: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: 1,
  },
  addButton: {
    padding: "8px 16px",
    fontSize: "0.8rem",
    backgroundColor: "#6f86e3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  feedback: {
    fontSize: "0.9rem",
    marginTop: "10px",
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
    marginTop: "10%"
  }


};

export default AttractionState;
