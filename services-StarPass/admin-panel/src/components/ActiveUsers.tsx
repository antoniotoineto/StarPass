import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveUsers: React.FC = () => {
  const [codes, setCodes] = useState<{ code: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/usuarios-ativos');
        console.log(response.data);  // Verifique a estrutura dos dados
        setCodes(response.data);
      } catch (err) {
        setError('Erro ao buscar códigos');
      }
    };

    fetchCodes();
  }, []);

  return (
    <div>
      <h1>Códigos Ativos</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(codes) && codes.map((item, index) => (
          <li key={index}>{item.code}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
