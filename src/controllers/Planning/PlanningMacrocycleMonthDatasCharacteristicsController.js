const database = require('../../database/connection')

class PlanningMacrocycleMonthDatasCharacteristicsController{
    
    post(request,response){
        const {
                idPlanningMacrocycleMonthDatas ,
                valency ,
                intensity ,
                emphasis ,
                obs
              } = request.body;

        database.insert({
                    "id_planejamento_macrociclo_mes_dados": idPlanningMacrocycleMonthDatas ,
                    "valencia": valency ,
                    "intensidade": intensity ,
                    "enfase": emphasis ,
                    "obs": obs
                })
                .table("planejamento_macrociclo_mes_dados_caracateristicas")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados Caracteristicas criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento_macrociclo_mes_dados as idPlanningMacrocycleMonthDatas" ,
                        "valencia as valency" ,
                        "intensidade as intensity" ,
                        "enfase as emphasis" ,
                        "obs as obs" )
                .table("planejamento_macrociclo_mes_dados_caracateristicas").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idPlanningMacrocycleMonthDatas ,
            valency ,
            intensity ,
            emphasis ,
            obs
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento_macrociclo_mes_dados": idPlanningMacrocycleMonthDatas ,
                    "valencia": valency ,
                    "intensidade": intensity ,
                    "enfase": emphasis ,
                    "obs": obs
                })
                .table("planejamento_macrociclo_mes_dados_caracateristicas")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados Caracteristicas atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_macrociclo_mes_dados_caracateristicas")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo Mês Dados Caracteristicas deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningMacrocycleMonthDatasCharacteristicsController();