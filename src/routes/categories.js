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

routes_categories.post('/register',async (req,res)=>{
    
    try{
        const {nome,descricao} = req.body;

        const category = {
            "nome":nome,
            "descricao":descricao
        };
        console.log(category)
        await knex('categorias').insert(category);
        return res.status(200).json({"success_mensage":"sucess insert"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_categories.delete('/delete/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await knex('categorias').where({"id":id}).delete();
        //fs.unlink(``)
        return res.status(200).json({"success_mensage":"deleted with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
})

routes_categories.put('/edit',async(req,res)=>{
    try{
        const {id,nome,descricao} = req.body;

        const category = {
            "nome":nome,
            "descricao":descricao,
            "id":id
        };
        await knex('categorias').where({"id":id}).update(category);
        return res.status(200).json({"success_mensage":"updated with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

module.exports = routes_categories;