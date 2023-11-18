const database = require('../../database/connection')

class PlanningTimelineController{
    
    post(request,response){
        const {
                idPlanning ,
                hour ,
                monday ,
                tuesday ,
                wednesday ,
                thursday ,
                friday ,
                saturday ,
                sunday
              } = request.body;
              
        database.insert({
                "id_planejamento": idPlanning ,
                "horario": hour ,
                "segunda": monday ,
                "terca":tuesday ,
                "quarta": wednesday ,
                "quinta": thursday ,
                "sexta": friday ,
                "sabado": saturday ,
                "domingo": sunday
                })
                .table("planejamento_cronograma")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Cronograma criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "horario as hour" ,
                        "segunda as monday" ,
                        "terca as tuesday" ,
                        "quarta as wednesday" ,
                        "quinta as thursday" ,
                        "sexta as friday" ,
                        "sabado as saturday" ,
                        "domingo as sunday")
                .table("planejamento_cronograma").then(data => {
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
            hour ,
            monday ,
            tuesday ,
            wednesday ,
            thursday ,
            friday ,
            saturday ,
            sunday
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "horario": hour ,
                    "segunda": monday ,
                    "terca":tuesday ,
                    "quarta": wednesday ,
                    "quinta": thursday ,
                    "sexta": friday ,
                    "sabado": saturday ,
                    "domingo": sunday
                })
                .table("planejamento_cronograma")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Cronograma atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_cronograma")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Cronograma deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningTimelineController();