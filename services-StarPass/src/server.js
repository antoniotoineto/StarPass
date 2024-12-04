import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const gate1Codes = [];
const gate2Codes = [];
const gate3Codes = [];

const activeUsers = [];

const generateCode = () => {
    let newCode;

    do {
        newCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while (activeUsers.includes(newCode));

    return newCode;
};

app.post('/codigo-entrada', (req, res) => {
    const { gate } = req.body;

    if (!["1", "2", "3"].includes(gate)) {
        return res.status(400).json({ error: "Portão inválido. Escolha 1, 2 ou 3." });
    }

    const code = generateCode();

    switch (gate) {
        case "1":
            gate1Codes.push(code);
            break;
        case "2":
            gate2Codes.push(code);
            break;
        case "3":
            gate3Codes.push(code);
            break;
    }

    console.log(`Código gerado para o portão ${gate}: ${code}`);
    return res.status(200).json({ code });
});

app.post('/validar-codigo', (req, res) => {
    const { gate, code } = req.body;

    let isValid = false;


    switch (gate) {
        case "1":
            isValid = gate1Codes.includes(code);
            break;
        case "2":
            isValid = gate2Codes.includes(code);
            break;
        case "3":
            isValid = gate3Codes.includes(code);
            break;
        default:
            return res.status(400).json({ error: "Portão inválido." });
    }

    if (isValid) {
        switch (gate) {
            case "1":
                gate1Codes.splice(gate1Codes.indexOf(code), 1);
                break;
            case "2":
                gate2Codes.splice(gate2Codes.indexOf(code), 1);
                break;
            case "3":
                gate3Codes.splice(gate3Codes.indexOf(code), 1);
                break;
        }

        activeUsers.push({ code });

        console.log(`Código ${code} validado no portão ${gate}.`);
        return res.status(200).json({ valid: true, message: "Código válido!" });
    } else {
        return res.status(400).json({ valid: false, message: "Código inválido ou já utilizado." });
    }
});

app.get('/usuarios-ativos', (req, res) => {
    return res.status(200).json(activeUsers);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
