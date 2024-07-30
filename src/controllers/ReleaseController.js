const database = require('../../src/database/connection')

class ReleaseController{
    
    post(request,response){
        const {
            userId,
            activityId,
            value,
            typePaymentId,
            obs
          } = request.body;



        database.raw('exec stp_grava_lancamento ?,?,?,?,?',[userId,value,activityId,typePaymentId,obs])
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


        database.raw('exec stp_busca_agendamento ?,?,?,?',[userId ?? null,activityId?? null])
          .then(async data => {
                var resultsPromise = data.map(async (obj) => {

                    //obj.time = moment(obj.time).format('HH:mm:ss')
                    return obj
                })

                response.json(await Promise.all(resultsPromise)); 
          }).catch(error => {
              console.log(error);
          })

        // database.select("id",
        //                 "id_usuario as userId",
        //                 "valor as value",
        //                 "data_pagamento as paymentDate",
        //                 "data_validade as nextPayment",
        //                 "id_tipo_pagamento as idTypePayment",
        //                 "id_atividade as idActivity",
        //                 "obs"
        //                 )
        //             .modify(function(queryBuilder) {
                
        //                 if (userId != null) {
        //                     queryBuilder.where({"id_usuario": userId ?? null})
        //                 }
        //                 if (activityId != null) {
        //                     queryBuilder.where({"id_atividade": activityId ?? null})
        //                 }                    
        //             })
        //         .table("lancamento").then(data => {
        //             console.log(data);
        //             response.json(data);
        //         }).catch(error => {
        //             console.log(error);
        //         })
    }

}

module.exports = new ReleaseController();