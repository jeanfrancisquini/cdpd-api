const database = require('../../database/connection')

class DefTypePaymentController{
    
    post(request,response){
        const {description} = request.body;

        database.insert({
                    "descricao":description
                })
                .table("def_tipo_pagamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Tipo de pagamento criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description")
                .table("def_tipo_pagamento").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description} = request.body;

        database.where({id: id})
                .update({
                    "descricao": description
                })
                .table("def_tipo_pagamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Tipo de pagamento atualizado com sucesso!"})
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
                    response.json({message: "Tipo de pagamento deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new DefTypePaymentController();