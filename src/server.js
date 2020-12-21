const express = require('express');
const cors = require('cors');
const port = 8081;
const routesIndex = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors())

app.use('/',routesIndex);

app.listen(port,()=>{
    console.log(`Rodando na porta ${port}`)
});