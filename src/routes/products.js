const {Router} = require('express');
const knex = require('../database/config');
const { v4: uuidv4 } = require('uuid');
require('dotenv/config');

const routes_products = Router();


routes_products.get('/all',async (req,res)=>{
    //const {authorization}=req.header;
 


    try{
        const productsList = await knex.select('*').from('produtos');
        return res.status(200).json(productsList);
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.get('/find/:id',async (req,res)=>{
    
    try{
        const {id}=req.params;
        const product = await knex.select('*').from('produtos').where({"uuid":id});
        return res.status(200).json(product);
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.post('/register',async (req,res)=>{
    try{
        const {nome,descricao,preco,categoria,thumbnail} = req.body;
        const product = {
            "uuid":uuidv4(),
            "nome":nome,
            "descricao":descricao,
            "preco":preco,
            "quantidade":0,
            "idCategoria":categoria,
            "thumbnail":thumbnail,
        };

        console.log(product) 
        await knex('produtos').insert(product);
        return res.status(200).json({"success_mensage":"sucess insert"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.put('/edit',async(req,res)=>{
    try{
        const {uuid,nome,descricao,preco,categoria,thumbnail} = req.body;
        const product = {
            "nome":nome,
            "descricao":descricao,
            "preco":preco,
            "quantidade":0,
            "idCategoria":categoria,
            "thumbnail":thumbnail,
        };
        
        await knex('produtos').where({"uuid":uuid}).update(product);
        return res.status(200).json({"success_mensage":"updated with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.delete('/delete/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await knex('produtos').where({"uuid":id}).delete();
        return res.status(200).json({"success_mensage":"deleted with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
})

module.exports = routes_products;