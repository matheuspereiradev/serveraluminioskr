const {Router} = require('express');
const knex = require('../database/config');
require('dotenv/config');

const routes_categories = Router();


routes_categories.get('/all',async (req,res)=>{
    try{
        const productsList = await knex.select('*').from('categorias');
        return res.status(200).json(productsList);
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_categories.get('/find/:id',async (req,res)=>{
    
    try{
        const {id}=req.params;
        const product = await knex.select('*').from('categorias').where({"id":id});
        return res.status(200).json(product);
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

module.exports = routes_categories;