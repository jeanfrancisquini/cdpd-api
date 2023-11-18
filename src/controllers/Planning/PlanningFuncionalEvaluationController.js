const database = require('../../database/connection')

class PlanningFuncionalEvaluationController{
    
    post(request,response){
        const {
                idPlanning ,
                agachamentoOmbro ,
                agachamentoToracica ,
                agachamentoQuadril ,
                agachamentoJoelho ,
                agachamentoTornozelo ,
                ombroEsquerdo ,
                ombroDireito ,
                rotacaoTroncoEsquerdo ,
                rotacaoTroncoDireito
              } = request.body;

        database.insert({
                    "id_planejamento": idPlanning ,
                    "agachamento_ombro": agachamentoOmbro ,
                    "agachamento_toracica": agachamentoToracica ,
                    "agachamento_quadril": agachamentoQuadril ,
                    "agachamento_joelho": agachamentoJoelho ,
                    "agachamento_tornozelo": agachamentoTornozelo ,
                    "ombro_esquerdo": ombroEsquerdo ,
                    "ombro_direito": ombroDireito ,
                    "rotacao_tronco_esquerdo": rotacaoTroncoEsquerdo ,
                    "rotacao_tronco_direto": rotacaoTroncoDireito
                })
                .table("planejamento_avaliacao_funcional")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Funcional criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "agachamento_ombro as agachamentoOmbro" ,
                        "agachamento_toracica as agachamentoToracica" ,
                        "agachamento_quadril as agachamentoQuadril" ,
                        "agachamento_joelho as agachamentoJoelho" ,
                        "agachamento_tornozelo as agachamentoTornozelo" ,
                        "ombro_esquerdo as ombroEsquerdo" ,
                        "ombro_direito as ombroDireito" ,
                        "rotacao_tronco_esquerdo as rotacaoTroncoEsquerdo" ,
                        "rotacao_tronco_direto as rotacaoTroncoDireito")
                .table("planejamento_avaliacao_funcional").then(data => {
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
            agachamentoOmbro ,
            agachamentoToracica ,
            agachamentoQuadril ,
            agachamentoJoelho ,
            agachamentoTornozelo ,
            ombroEsquerdo ,
            ombroDireito ,
            rotacaoTroncoEsquerdo ,
            rotacaoTroncoDireito
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "agachamento_ombro": agachamentoOmbro ,
                    "agachamento_toracica": agachamentoToracica ,
                    "agachamento_quadril": agachamentoQuadril ,
                    "agachamento_joelho": agachamentoJoelho ,
                    "agachamento_tornozelo": agachamentoTornozelo ,
                    "ombro_esquerdo": ombroEsquerdo ,
                    "ombro_direito": ombroDireito ,
                    "rotacao_tronco_esquerdo": rotacaoTroncoEsquerdo ,
                    "rotacao_tronco_direto": rotacaoTroncoDireito
                })
                .table("planejamento_avaliacao_funcional")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Funcional atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_avaliacao_funcional")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Avaliação Funcional deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningFuncionalEvaluationController();