import express from 'express'

const app = express()

app.get('/listaBrinquedos', (req, res) => {
    res.send('Brinquedo 1, 2, 3');
});

app.listen(3000)