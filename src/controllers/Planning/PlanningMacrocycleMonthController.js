const database = require('../../database/connection')

class PlanningMacrocycleMonthController{
    
    post(request,response){
        const {
                idPlanningMacrocycle ,
                month ,
                metaMonthly ,
                extraActivities 
              } = request.body;
              
        database.insert({
                    "id_planejamento_macrociclo": idPlanningMacrocycle ,
                    "mes": month ,
                    "meta_mensal": metaMonthly ,
                    "atividades_extras": extraActivities 
                })
                .table("planejamento_macrociclo_mes")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento_macrociclo as idPlanningMacrocycle",
                        "mes as month",
                        "meta_mensal as metaMonthly" ,
                        "atividades_extras as extraActivities" )
                .table("planejamento_macrociclo_mes").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idPlanningMacrocycle ,
            month ,
            metaMonthly ,
            extraActivities 
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento_macrociclo": idPlanningMacrocycle ,
                    "mes": month ,
                    "meta_mensal": metaMonthly ,
                    "atividades_extras": extraActivities 
                })
                .table("planejamento_macrociclo_mes")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_macrociclo_mes")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningMacrocycleMonthController();