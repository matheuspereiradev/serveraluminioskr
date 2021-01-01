module.exports={
    render(produto){
        return {
            id:produto.uuidProduto,
            nome:produto.nomeProduto,
            descricao:produto.descricaoProduto,
            preco:produto.precoProduto,
            quantidade:produto.quantidadeProduto,
            thumbnail:produto.thumbnailProduto,
            categoria:{
                idCategoria:produto.idCategoria,
                nomeCategoria:produto.nomeCategoria,
                descricaoCategoria:produto.descricaoCategoria
            }
 
        }
    },

    renderMany(produtos){
        return produtos.map(p=>this.render(p))
    }
}