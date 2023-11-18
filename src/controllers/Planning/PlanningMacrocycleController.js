const database = require('../../database/connection')

class PlanningMacrocycleController{
    
    post(request,response){
        const {
                idPlanning ,
                mainObjective ,
                secondaryObjective ,
                secondaryObjective2 ,
                obsEvaluator
              } = request.body;

        database.insert({
                    "id_planejamento": idPlanning ,
                    "objetivo_principal": mainObjective ,
                    "objetivo_secundario": secondaryObjective ,
                    "objetivo_secundario_2": secondaryObjective2 ,
                    "obs_avaliador": obsEvaluator
                })
                .table("planejamento_macrociclo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "objetivo_principal as mainObjective" ,
                        "objetivo_secundario as secondaryObjective" ,
                        "objetivo_secundario_2 as secondaryObjective2" ,
                        "obs_avaliador as obsEvaluator")
                .table("planejamento_macrociclo").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {
            idPlanning ,
            mainObjective ,
            secondaryObjective ,
            secondaryObjective2 ,
            obsEvaluator
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "objetivo_principal": mainObjective ,
                    "objetivo_secundario": secondaryObjective ,
                    "objetivo_secundario_2": secondaryObjective2 ,
                    "obs_avaliador": obsEvaluator
                })
                .table("planejamento_macrociclo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_macrociclo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Macrociclo deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningMacrocycleController();