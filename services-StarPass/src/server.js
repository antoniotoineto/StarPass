import express from 'express'
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors());

app.get('/brinquedos', (req, res) => {
    res.send('Brinquedos 1, 2, 3');
});

app.post('/codigo-entrada', (req, res) => {
    console.log(req.body);
    res.status(200).send("Dado recebido")
})

app.listen(3000)