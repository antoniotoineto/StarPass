import express from 'express';
import cors from 'cors';
import path from "path";
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

const gate1Codes = [];
const gate2Codes = [];
const gate3Codes = [];

const activeUsers = [];
const prisma = new PrismaClient();

const queues = {};
const userQueues = {};

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
        return res.status(401).json({ valid: false, message: "Código inválido ou já utilizado." });
    }
});

app.get('/codigos-guiche/:gate', (req, res) => {
    const { gate } = req.params;

    let codes;

    switch (gate) {
        case "1":
            codes = gate1Codes;
            break;
        case "2":
            codes = gate2Codes;
            break;
        case "3":
            codes = gate3Codes;
            break;
        default:
            return res.status(400).json({ error: "Portão inválido. Escolha 1, 2 ou 3." });
    }

    return res.status(200).json({ gate, codes });
});


app.get('/usuarios-ativos', (req, res) => {
    return res.status(200).json(activeUsers);
});

app.get('/lista-brinquedos', async (req, res) => {
    try {
        const attractions = await prisma.attractions.findMany();
        res.status(200).json(attractions);
    } catch (error) {
        console.error('Erro ao buscar atrações:', error);
        res.status(500).json({ message: 'Erro ao buscar atrações' });
    }
});

app.post('/entrar-fila', async (req, res) => {
    const { id, atractionName, userCode } = req.body;

    if (!id || !atractionName || !userCode) {
        return res.status(400).json({ message: "Os campos 'id', 'atractionName' e 'userCode' são obrigatórios." });
    }

    if (!queues[id]) {
        queues[id] = {
            atractionName,
            queue: []
        };
    }

    if (!userQueues[userCode]) {
        userQueues[userCode] = [];
    }

    if (userQueues[userCode].length >= 6) {
        return res.status(400).json({ message: "Usuário atingiu o limite máximo de 6 filas simultâneas." });
    }

    const userAlreadyInQueue = queues[id].queue.find(user => user.code === userCode);
    if (userAlreadyInQueue) {
        return res.status(400).json({ message: "Usuário já está na fila deste brinquedo." });
    }

    queues[id].queue.push({ code: userCode, timestamp: new Date() });
    userQueues[userCode].push({ attractionId: id, queuePosition: "X", estimatedTime: "Y" })

    return res.status(200).json({
        message: `Usuário ${userCode} entrou na fila do brinquedo '${atractionName}' com sucesso.`,
        currentQueue: queues[id].queue
    });
});

app.get('/consultar-fila/:attractionId', (req, res) => {
    const { attractionId } = req.params
    return res.status(200).json({
        attractionQueue: queues[attractionId]
    })
})

app.get('/dados-fila/:attractionId', (req, res) => {
    const { attractionId } = req.params
    const queueLength = queues[attractionId].queue.length()
})

app.get('/filas-usuario/:userCode', (req, res) => {
    const { userCode } = req.params
    const userQueuesData = userQueues[userCode] || [];
    return res.status(200).json({
        userQueues: userQueuesData
    })
})

app.post('/sair-fila/:userCode/:attractionId', (req, res) => {
    const { userCode, attractionId } = req.params

    if (!queues[attractionId]) {
        return res.status(404).json({ message: 'Brinquedo não encontrado.' });
    }

    queues[attractionId].queue = queues[attractionId].queue.filter(
        (user) => user.code !== userCode
    );

    if (userQueues[userCode]) {
        userQueues[userCode] = userQueues[userCode].filter(
            (queue) => queue.attractionId !== attractionId
        );
    }

    return res.status(200).json({
        message: `Usuário ${userCode} foi removido da fila do brinquedo.`,
        userQueues: userQueues[userCode] || [],
    });
})

app.post('/retirar-usuario', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: "O código de entrada do usuário é obrigatório." });
    }

    const codeIndex = activeUsers.findIndex(object => object.code === code);

    if (codeIndex === -1) {
        return res.status(404).json({ message: `Usuário '${code}' não encontrado.` });
    }

    const removedUser = activeUsers.splice(codeIndex, 1)[0];

    return res.status(200).json({ message: `Usuário '${removedUser.code}' removido com sucesso.` });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});
