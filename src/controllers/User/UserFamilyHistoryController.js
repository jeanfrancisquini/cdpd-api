const database = require('../../database/connection')

class UserFamilyHistoryController{
    
    post(request,response){
        const {
                idUser,
                cardiopata,
                hipertensivo,
                diabetico
              } = request.body;

        database.insert({
                    "id_usuario": idUser,
                    "cardiopata": cardiopata,
                    "hipertensivo": hipertensivo,
                    "diabetico": diabetico
                })
                .table("usuario_historico_familiar")
                .then(data => {
                    console.log(data)
                    response.json({message: "Histórico familiar de usuário criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
        "id_usuario as idUser",
        "cardiopata as cardiopata",
        "hipertensivo as hipertensivo",
        "diabetico as diabetico")
                .table("usuario_historico_familiar").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idUser,
            cardiopata,
            hipertensivo,
            diabetico
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_usuario": idUser,
                    "cardiopata": cardiopata,
                    "hipertensivo": hipertensivo,
                    "diabetico": diabetico
                })
                .table("usuario_historico_familiar")
                .then(data => {
                    console.log(data)
                    response.json({message: "Histórico familiar de usuário atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("usuario_historico_familiar")
                .then(data => {
                    console.log(data)
                    response.json({message: "Histórico familiar de usuário deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new UserFamilyHistoryController();