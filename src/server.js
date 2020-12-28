const express = require('express');
const cors = require('cors');
const port = 8081;
const routesIndex = require('./routes/index');
const routeProducts = require('./routes/products');
const routeCategories = require('./routes/categories')
const bodyParser = require('body-parser')

const app = express();

//app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

app.use('/',routesIndex);
app.use('/products',routeProducts);
app.use('/categories',routeCategories);

app.listen(port,()=>{
    console.log(`Rodando na porta ${port}`)
});