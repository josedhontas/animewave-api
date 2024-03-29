const express = require('express');
const animesRouter = require('./routes/animes');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const swagger = require('./swagger');


app.use(cors());
app.use(express.json());
//teste

app.use('/animes', animesRouter);


swagger(app);
app.listen(port, () => {
  console.log('Servidor iniciado na porta '+ port);
});