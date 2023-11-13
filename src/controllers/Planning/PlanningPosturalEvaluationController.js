const database = require('../../database/connection')

class PlanningPosturalEvaluationController{
    
    post(request,response){
        const {
                idPlanning ,
                pe ,
                joelho ,
                linhaPoplitea ,
                coxa ,
                quadril ,
                trianguloDeTales ,
                ombro ,
                escapula ,
                lordose ,
                escoliose ,
                cifose ,
                cabeca
              } = request.body;
              
        database.insert({
                "id_planejamento": idPlanning ,
                "pe": pe ,
                "joelho": joelho ,
                "linha_poplitea": linhaPoplitea ,
                "coxa": coxa ,
                "quadril": quadril ,
                "triangulo_de_tales": trianguloDeTales ,
                "ombro": ombro ,
                "escapula": escapula ,
                "lordose": lordose ,
                "escoliose": escoliose ,
                "cifose": cifose ,
                "cabeca": cabeca
                })
                .table("planejamento_avaliacao_postural")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Postural criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "pe as pe" ,
                        "joelho as joelho" ,
                        "linha_poplitea as linhaPoplitea" ,
                        "coxa as coxa" ,
                        "quadril as quadril" ,
                        "triangulo_de_tales as trianguloDeTales" ,
                        "ombro as ombro" ,
                        "escapula as escapula" ,
                        "lordose as lordose" ,
                        "escoliose as escoliose" ,
                        "cifose as cifose" ,
                        "cabeca as cabeca")
                .table("planejamento_avaliacao_postural").then(data => {
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
            pe ,
            joelho ,
            linhaPoplitea ,
            coxa ,
            quadril ,
            trianguloDeTales ,
            ombro ,
            escapula ,
            lordose ,
            escoliose ,
            cifose ,
            cabeca
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "pe": pe ,
                    "joelho": joelho ,
                    "linha_poplitea": linhaPoplitea ,
                    "coxa": coxa ,
                    "quadril": quadril ,
                    "triangulo_de_tales": trianguloDeTales ,
                    "ombro": ombro ,
                    "escapula": escapula ,
                    "lordose": lordose ,
                    "escoliose": escoliose ,
                    "cifose": cifose ,
                    "cabeca": cabeca
                })
                .table("planejamento_avaliacao_postural")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Postural atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_avaliacao_postural")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Postural deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningPosturalEvaluationController();