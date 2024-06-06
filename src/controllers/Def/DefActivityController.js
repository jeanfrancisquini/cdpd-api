const database = require('../../database/connection')

class DefActivityController{
    
    post(request,response){
        const {description, valorMatricula} = request.body;

        database.insert({
                    "descricao":description,
                    "valor_matricula": valorMatricula
                })
                .table("def_atividade")
                .then(data => {
                    console.log(data)
                    response.json({message: "Atividade criada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description",
                        "valor_matricula as valorMatricula"
                    )
                .table("def_atividade").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description,valorMatricula} = request.body;

        database.where({id: id})
                .update({
                    "descricao": description,
                    "valor_matricula": valorMatricula
                })
                .table("def_atividade")
                .then(data => {
                    console.log(data)
                    response.json({message: "Atividade atualizada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query
        
        database.where({id: id})
                .del()
                .table("def_tipo_pagamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Atividade deletada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new DefActivityController();