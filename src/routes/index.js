const {Router} = require('express');
const knex = require('../database/config');


const routes = Router();

routes.get('/',(req,res)=>{
    res.json({mensagem:"funcionando"})
})

module.exports = routes;