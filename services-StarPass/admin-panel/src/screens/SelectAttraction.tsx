import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowBack } from 'react-icons/io';

const SelectAttraction: React.FC = () => {
  const [attractions, setAttractions] = useState<{ id: string; name: string }[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<string>("0");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/brinquedos/lista-brinquedos');
        setAttractions(response.data);
      } catch (err) {
        console.error('Erro ao buscar atrações:', err);
      }
    };

    fetchAttractions();
  }, []);

  const handleSelection = () => {
    if (selectedAttraction === "0") {
      setError(true);
    } else {
      navigate(`/attractions/${selectedAttraction}`);
    }
  };

  const handleBack = () => {
    navigate(`/`);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <IoMdArrowBack size={35} style={styles.icon} onClick={() => handleBack()} />
          <h1 style={styles.logo}>Logo</h1>
        </div>
        <h2 style={styles.subtitle}>Selecione um Brinquedo</h2>
        {attractions && attractions.length > 0 ? (
          <select
            style={styles.select}
            value={selectedAttraction}
            onChange={(e) => {
              setSelectedAttraction(e.target.value);
              setError(false);
            }}
          >
            <option value="0">Escolha um brinquedo</option>
            {attractions.map((attraction) => (
              <option key={attraction.id} value={attraction.id}>
                {attraction.name}
              </option>
            ))}
          </select>
        ) : (
          <p style={{ textAlign: 'center', marginTop: 5 }}>Carregando...</p>
        )
        }
        {error && <p style={styles.error}>Selecione um brinquedo para continuar.</p>}
        <button style={styles.button} onClick={handleSelection}>
          Ver Fila
        </button>
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
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold" as "bold",
    marginBottom: "12%"
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center" as "center",
  },
  select: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "-10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SelectAttraction;
