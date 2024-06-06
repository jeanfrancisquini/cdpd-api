const database = require('../../src/database/connection')

class ReleaseController{
    
    post(request,response){
        const {
            userId,
            activityId,
            value,
            typePaymentId
          } = request.body;



        database.raw('exec stp_grava_lancamento ?,?,?,?',[userId,value,activityId,typePaymentId])
        .then(data => {
            //console.log(data);
            response.json(data[0]);
        }).catch(error => {
            console.log(error);
        })
    }

    get(request,response){
        const {
            userId ,
            activityId 
          } = request.body;

        database.select("id",
                        "id_usuario as userId",
                        "valor as value",
                        "data_pagamento as paymentDate",
                        "data_validade as nextPayment",
                        "id_tipo_pagamento as idTypePayment",
                        "id_atividade as idActivity",
                        )
                    .modify(function(queryBuilder) {
                
                        if (userId != null) {
                            queryBuilder.where({"id_aluno": userId ?? null})
                        }
                        if (activityId != null) {
                            queryBuilder.where({"id_atividade": activityId ?? null})
                        }                    
                    })
                .table("lancamento").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

}

module.exports = new ReleaseController();