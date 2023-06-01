const express = require('express');
const animesRouter = require('./routes/animes');
const app = express();
const cors = require('cors');
const port = 3000;
const swagger = require('./swagger');


app.use(cors());
app.use(express.json());

app.use('/animes', animesRouter);


swagger(app);
app.listen(port, () => {
  console.log('Servidor iniciado na porta '+ port);
});