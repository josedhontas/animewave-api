const express = require('express');
const animesRouter = require('./routes/animes');
const app = express();
const cors = require('cors');
const port = 8000;


app.use(cors());
app.use(express.json());

app.use('/animes', animesRouter);


app.listen(port, () => {
    console.log('Servidor iniciado na porta', port)
})