const database = require('../../database/connection')

class PlanningMacrocycleMonthDatasController{
    
    post(request,response){
        const {
                idPlanningMacrocycleMonth ,
                week ,
                mesocycle ,
                microcycle ,
                metaWeekly
              } = request.body;

        database.insert({
                    "id_planejamento_macrociclo_mes": idPlanningMacrocycleMonth ,
                    "semana": week ,
                    "mesociclo": mesocycle ,
                    "microciclo": microcycle ,
                    "meta_semanal": metaWeekly
                })
                .table("planejamento_macrociclo_mes_dados")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento_macrociclo_mes as idPlanningMacrocycleMonth" ,
                        "semana as week" ,
                        "mesociclo as mesocycle" ,
                        "microciclo as microcycle" ,
                        "meta_semanal as metaWeekly")
                .table("planejamento_macrociclo_mes_dados").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idPlanningMacrocycleMonth ,
            week ,
            mesocycle ,
            microcycle ,
            metaWeekly
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento_macrociclo_mes": idPlanningMacrocycleMonth ,
                    "semana": week ,
                    "mesociclo": mesocycle ,
                    "microciclo": microcycle ,
                    "meta_semanal": metaWeekly
                })
                .table("planejamento_macrociclo_mes_dados")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_macrociclo_mes_dados")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningMacrocycleMonthDatasController();