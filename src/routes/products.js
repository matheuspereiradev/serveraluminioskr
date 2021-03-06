const {Router} = require('express');
const knex = require('../database/config');
const { v4: uuidv4 } = require('uuid');
require('dotenv/config');
const multer = require('multer');
const uploadConfig =require('../config/multerConfig');
const upload = multer(uploadConfig);
const viewProdutos = require('../views/productView');
const fs = require('fs')

const routes_products = Router();


routes_products.get('/all',async (req,res)=>{
    //const {authorization}=req.header;
    try{
        const productsList = await knex.select('categorias.id as idCategoria'
                                             , 'categorias.nome as nomeCategoria'
                                             , 'categorias.descricao as descricaoCategoria'
                                             , 'produtos.uuid as uuidProduto'
                                             , 'produtos.nome as nomeProduto'
                                             , 'produtos.descricao as descricaoProduto'
                                             , 'produtos.preco as precoProduto'
                                             , 'produtos.quantidade as quantidadeProduto'
                                             , 'produtos.thumbnail as thumbnailProduto'
                                             ).from('produtos').leftJoin('categorias', 'produtos.idCategoria', 'categorias.id');
        return res.status(200).json(viewProdutos.renderMany(productsList));
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.get('/find/:id',async (req,res)=>{
    
    try{
        const {id}=req.params;
        const product = await knex.select(   'categorias.id as idCategoria'
                                                , 'categorias.nome as nomeCategoria'
                                                , 'categorias.descricao as descricaoCategoria'
                                                , 'produtos.uuid as uuidProduto'
                                                , 'produtos.nome as nomeProduto'
                                                , 'produtos.descricao as descricaoProduto'
                                                , 'produtos.preco as precoProduto'
                                                , 'produtos.quantidade as quantidadeProduto'
                                                , 'produtos.thumbnail as thumbnailProduto'
                                                ).from('produtos')
                                                .leftJoin('categorias', 'produtos.idCategoria', 'categorias.id')
                                                .where({"uuid":id});
                                                
        return res.status(200).json(viewProdutos.renderMany(product));
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.post('/register',upload.single('thumbnail'),async (req,res)=>{
    const img= req.file.filename;
    try{
        const data = req.body;

        const product = {
            "uuid":uuidv4(),
            "nome":"teste",
            "descricao":data.descricao,
            "preco":data.preco,
            "quantidade":0,
            "idCategoria":data.categoria,
            "thumbnail":img,
        };
        console.log(product)
        await knex('produtos').insert(product);
        return res.status(200).json({"success_mensage":"sucess insert"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.put('/edit',upload.single('thumbnail'),async(req,res)=>{
    const img= req.file.filename;
    try{
        const data = req.body;

        const product = {
            "nome":data.nome,
            "descricao":data.descricao,
            "preco":data.preco,
            "idCategoria":data.categoria,
            "thumbnail":img,
        };
        console.log(product)
        await knex('produtos').where({"uuid":data.uuid}).update(product);
        return res.status(200).json({"success_mensage":"updated with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
});

routes_products.delete('/delete/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await knex('produtos').where({"uuid":id}).delete();
        //fs.unlink(``)
        return res.status(200).json({"success_mensage":"deleted with success"});
    }catch(erro){
        return res.status(500).json({"error_mensage":erro});
    }
})

module.exports = routes_products;