import axios from "axios"
import readline from "readline"

// Configuração do readline para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para gerar um código aleatório de 4 dígitos
const generateUserCode = () => Math.floor(1000 + Math.random() * 9000).toString();

// Função que faz a chamada para a API
const callApi = (attractionId) => {
  const payload = {
    id: attractionId,
    userCode: generateUserCode()
  };

  axios.post("https://starpass-api-d78c37e87736.herokuapp.com/filas/entrar-fila", payload)
    .then(response => {
      console.log("✅ API Response:", response.data);
    })
    .catch(error => {
      console.error("❌ Erro ao chamar API:", error.response.data.message);
    });
};

// Pergunta ao usuário pelo Attraction ID e inicia a chamada da API
rl.question("Digite o Attraction ID: ", (attractionId) => {
  console.log(`Chamando API a cada 1 segundo com Attraction ID: ${attractionId}`);

  setInterval(() => {
    callApi(attractionId);
  }, 1000);

  rl.close();
});
