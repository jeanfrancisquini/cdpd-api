const database = require('../../database/connection')

class PlanningPathologicalHistoryController{
    
    post(request,response){
        const {
                idPlanning ,
                submetidoCirurgia ,
                submetidoCirurgiaQual ,
                usoMedicamentos ,
                usoMedicamentosQual ,
                apresentaLesao ,
                apresentaLesaoQual ,
                apresentaAlergia ,
                apresentaAlergiaQual ,
                apresentaDoencaOuSintoma ,
                apresentaDoencaOuSintomaQual ,
                tpm ,
                tpmOutrasManifestacoes ,
                usaPsicotropicos ,
                ehFumante ,
                cigarrosPorDia ,
                fumanteAQuantoTempo ,
                usaBebidaAlcolicas ,
                usaBebidaAlcolicasComQueFrequencia ,
                fazDietaParaQue ,
                fazDietaQuantoTempo ,
                dietaConsumoDiarioCalorias , 
              } = request.body;
              
        database.insert({
                "id_planejamento": idPlanning ,
                "submetido_cirurgia": submetidoCirurgia ,
                "submetido_cirurgia_qual": submetidoCirurgiaQual ,
                "uso_medicamentos": usoMedicamentos ,
                "uso_medicamentos_qual": usoMedicamentosQual ,
                "apresenta_lesao": apresentaLesao ,
                "apresenta_lesao_qual": apresentaLesaoQual ,
                "apresenta_alergia": apresentaAlergia ,
                "apresenta_alergia_qual": apresentaAlergiaQual ,
                "apresenta_doenca_ou_sintoma": apresentaDoencaOuSintoma ,
                "apresenta_doenca_ou_sintoma_qual": apresentaDoencaOuSintomaQual ,
                "tpm": tpm ,
                "tpm_outras_manifestacoes": tpmOutrasManifestacoes ,
                "usa_psicotropicos": usaPsicotropicos ,
                "eh_fumante": ehFumante ,
                "cigarros_por_dia": cigarrosPorDia ,
                "fumante_a_quanto_tempo": fumanteAQuantoTempo ,
                "usa_bebida_alcolicas": usaBebidaAlcolicas ,
                "usa_bebida_alcolicas_com_que_frequencia": usaBebidaAlcolicasComQueFrequencia ,
                "faz_dieta_para_que": fazDietaParaQue ,
                "faz_dieta_quanto_tempo": fazDietaQuantoTempo ,
                "dieta_consumo_diario_calorias": dietaConsumoDiarioCalorias 
                })
                .table("planejamento_historico_patologico")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Histórico Patológico criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_planejamento as idPlanning" ,
                        "submetido_cirurgia as submetidoCirurgia" ,
                        "submetido_cirurgia_qual as submetidoCirurgiaQual" ,
                        "uso_medicamentos as usoMedicamentos" ,
                        "uso_medicamentos_qual as usoMedicamentosQual" ,
                        "apresenta_lesao as apresentaLesao" ,
                        "apresenta_lesao_qual as apresentaLesaoQual" ,
                        "apresenta_alergia as apresentaAlergia" ,
                        "apresenta_alergia_qual as apresentaAlergiaQual" ,
                        "apresenta_doenca_ou_sintoma as apresentaDoencaOuSintoma" ,
                        "apresenta_doenca_ou_sintoma_qual as apresentaDoencaOuSintomaQual" ,
                        "tpm as tpm" ,
                        "tpm_outras_manifestacoes as tpmOutrasManifestacoes" ,
                        "usa_psicotropicos as usaPsicotropicos" ,
                        "eh_fumante as ehFumante" ,
                        "cigarros_por_dia as cigarrosPorDia" ,
                        "fumante_a_quanto_tempo as fumanteAQuantoTempo" ,
                        "usa_bebida_alcolicas as usaBebidaAlcolicas" ,
                        "usa_bebida_alcolicas_com_que_frequencia as usaBebidaAlcolicasComQueFrequencia" ,
                        "faz_dieta_para_que as fazDietaParaQue" ,
                        "faz_dieta_quanto_tempo as fazDietaQuantoTempo" ,
                        "dieta_consumo_diario_calorias as dietaConsumoDiarioCalorias"  )
                .table("planejamento_historico_patologico").then(data => {
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
            submetidoCirurgia ,
            submetidoCirurgiaQual ,
            usoMedicamentos ,
            usoMedicamentosQual ,
            apresentaLesao ,
            apresentaLesaoQual ,
            apresentaAlergia ,
            apresentaAlergiaQual ,
            apresentaDoencaOuSintoma ,
            apresentaDoencaOuSintomaQual ,
            tpm ,
            tpmOutrasManifestacoes ,
            usaPsicotropicos ,
            ehFumante ,
            cigarrosPorDia ,
            fumanteAQuantoTempo ,
            usaBebidaAlcolicas ,
            usaBebidaAlcolicasComQueFrequencia ,
            fazDietaParaQue ,
            fazDietaQuantoTempo ,
            dietaConsumoDiarioCalorias , 
          } = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "id_planejamento": idPlanning ,
                    "submetido_cirurgia": submetidoCirurgia ,
                    "submetido_cirurgia_qual": submetidoCirurgiaQual ,
                    "uso_medicamentos": usoMedicamentos ,
                    "uso_medicamentos_qual": usoMedicamentosQual ,
                    "apresenta_lesao": apresentaLesao ,
                    "apresenta_lesao_qual": apresentaLesaoQual ,
                    "apresenta_alergia": apresentaAlergia ,
                    "apresenta_alergia_qual": apresentaAlergiaQual ,
                    "apresenta_doenca_ou_sintoma": apresentaDoencaOuSintoma ,
                    "apresenta_doenca_ou_sintoma_qual": apresentaDoencaOuSintomaQual ,
                    "tpm": tpm ,
                    "tpm_outras_manifestacoes": tpmOutrasManifestacoes ,
                    "usa_psicotropicos": usaPsicotropicos ,
                    "eh_fumante": ehFumante ,
                    "cigarros_por_dia": cigarrosPorDia ,
                    "fumante_a_quanto_tempo": fumanteAQuantoTempo ,
                    "usa_bebida_alcolicas": usaBebidaAlcolicas ,
                    "usa_bebida_alcolicas_com_que_frequencia": usaBebidaAlcolicasComQueFrequencia ,
                    "faz_dieta_para_que": fazDietaParaQue ,
                    "faz_dieta_quanto_tempo": fazDietaQuantoTempo ,
                    "dieta_consumo_diario_calorias": dietaConsumoDiarioCalorias 
                })
                .table("planejamento_historico_patologico")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Histórico Patológico atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento_historico_patologico")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento Histórico Patológico deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new PlanningPathologicalHistoryController();