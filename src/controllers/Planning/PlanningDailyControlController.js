const database = require('../../database/connection')

class PlanningDailyControlController{
    
    post(request,response){
        const {
                idPlanning ,
                classNumber ,
                fCInicial ,
                fCTreino ,
                fCRecuperacao ,
                BORG ,
                pesoInicial ,
                pesoFinal ,
                duracao ,
                sono ,
                qualidadeSono ,
                recuperacao ,
                menstruada ,
                motivacao ,
                data 
              } = request.body;
              
        database.insert({
                "id_planejamento": idPlanning ,
                "numero_aula": classNumber ,
                "fc_inicial": fCInicial ,
                "fc_treino": fCTreino ,
                "fc_recuperacao": fCRecuperacao ,
                "borg": BORG ,
                "peso_inicial": pesoInicial ,
                "peso_final": pesoFinal ,
                "duracao": duracao ,
                "sono": sono ,
                "qualidade_sono": qualidadeSono ,
                "recuperacao": recuperacao ,
                "menstruada": menstruada ,
                "motivacao": motivacao ,
                "data": data 
                })
                .table("planejamento_controle_diario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Controle Diário criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "numero_aula as classNumber" ,
                        "fc_inicial as fCInicial" ,
                        "fc_treino as fCTreino" ,
                        "fc_recuperacao as fCRecuperacao" ,
                        "borg as BORG" ,
                        "peso_inicial as pesoInicial" ,
                        "peso_final as pesoFinal" ,
                        "duracao as duracao" ,
                        "sono as sono" ,
                        "qualidade_sono as qualidadeSono" ,
                        "recuperacao as recuperacao" ,
                        "menstruada as menstruada" ,
                        "motivacao as motivacao" ,
                        "data as data"  )
                .table("planejamento_controle_diario").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    getById(request,response){

        const {id} = request.query

        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "numero_aula as classNumber" ,
                        "fc_inicial as fCInicial" ,
                        "fc_treino as fCTreino" ,
                        "fc_recuperacao as fCRecuperacao" ,
                        "borg as BORG" ,
                        "peso_inicial as pesoInicial" ,
                        "peso_final as pesoFinal" ,
                        "duracao as duracao" ,
                        "sono as sono" ,
                        "qualidade_sono as qualidadeSono" ,
                        "recuperacao as recuperacao" ,
                        "menstruada as menstruada" ,
                        "motivacao as motivacao" ,
                        "data as data"  )
                .table("planejamento_controle_diario")
                .where({id: id})
                .then(data => {
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
            classNumber ,
            fCInicial ,
            fCTreino ,
            fCRecuperacao ,
            BORG ,
            pesoInicial ,
            pesoFinal ,
            duracao ,
            sono ,
            qualidadeSono ,
            recuperacao ,
            menstruada ,
            motivacao ,
            data 
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "numero_aula": classNumber ,
                    "fc_inicial": fCInicial ,
                    "fc_treino": fCTreino ,
                    "fc_recuperacao": fCRecuperacao ,
                    "borg": BORG ,
                    "peso_inicial": pesoInicial ,
                    "peso_final": pesoFinal ,
                    "duracao": duracao ,
                    "sono": sono ,
                    "qualidade_sono": qualidadeSono ,
                    "recuperacao": recuperacao ,
                    "menstruada": menstruada ,
                    "motivacao": motivacao ,
                    "data": data 
                })
                .table("planejamento_controle_diario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Controle Diário atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_controle_diario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Controle Diário deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningDailyControlController();