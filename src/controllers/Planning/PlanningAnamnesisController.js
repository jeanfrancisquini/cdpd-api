const database = require('../../database/connection')

class PlanningAnamnesisController{
    
    post(request,response){
        const {
                idPlanning,
                bloodPressure,
                cardiacFrequency
              } = request.body;

        database.insert({
                    "id_planejamento": idPlanning,
                    "pressao_arterial": bloodPressure,
                    "frequencia_cardiaca": cardiacFrequency
                })
                .table("planejamento_anamnese")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Anamnese criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning",
                        "pressao_arterial as bloodPressure",
                        "frequencia_cardiaca as cardiacFrequency")
                .table("planejamento_anamnese").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idPlanning,
            bloodPressure,
            cardiacFrequency
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning,
                    "pressao_arterial": bloodPressure,
                    "frequencia_cardiaca": cardiacFrequency
                })
                .table("planejamento_anamnese")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Anamnese atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_anamnese")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Anamnese deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningAnamnesisController();