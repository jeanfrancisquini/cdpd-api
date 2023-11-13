const database = require('../../database/connection')

class DefPlanController{
    
    post(request,response){
        const {description,frequency,idTypePayment,price,idActivity,idPeriod} = request.body;

        database.insert({
                    "descricao": description,
                    "frequencia": frequency,
                    "id_tipo_pagamento": idTypePayment,
                    "preco": price,
                    "id_atividade": idActivity,
                    "id_periodo": idPeriod
                })
                .table("def_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Plano criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description",
                        "frequencia as frequency",
                        "id_tipo_pagamento as idTypePayment",
                        "preco as price",
                        "id_atividade as idActivity",
                        "id_periodo as idPeriod"
                        )
                .table("def_plano").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description,frequency,idTypePayment,price,idActivity,idPeriod} = request.body;

        database.where({id: id})
                .update({
                    "descricao": description,
                    "frequencia": frequency,
                    "id_tipo_pagamento": idTypePayment,
                    "preco": price,
                    "id_atividade": idActivity,
                    "id_periodo": idPeriod
                })
                .table("def_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Periodo atualizada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query
        
        database.where({id: id})
                .del()
                .table("def_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Periodo deletada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new DefPlanController();