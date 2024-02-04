const database = require('../../database/connection')

class PlanningController{
    deletePlanning(request,response){
        const {id} = request.query

        console.log(id);

        database.raw('exec stp_cdpd_delete_planejamento ?',[id])
        .then(data => {
            console.log(data);
            response.json(data);
        }).catch(error => {
            console.log(error);
        })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("planejamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    AlterProfile(request,response){
        const {
            idPlanning,
            idProfile
          } = request.body; 

        database.raw('exec stp_altera_perfil ?,?',[idPlanning,idProfile])
        .then(data => {
            console.log(data);
            response.json(data);
        }).catch(error => {
            console.log(error);
        })
    }

    post(request,response){
        const {
                description ,
                year ,
                number ,
                idStudent ,
                registrationDate ,
                idTeacher ,
                obs ,
                numberSubstitution ,
                idProfile ,
                externalKey
              } = request.body;

        database.insert({
                    "descricao": description ,
                    "ano": year ,
                    "numero": number ,
                    "id_aluno": idStudent ,
                    "data_cadastro": registrationDate ,
                    "id_professor": idTeacher ,
                    "observacao": obs ,
                    "numero_substituicao": numberSubstitution ,
                    "id_perfil": idProfile ,
                    "chave_externa": externalKey
                })
                .table("planejamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Planejamento criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    MacrocicloNew(request,response){
        const {
            IdPlanning ,
            IdPlanningMacrociclo,
            IdProfile,
            Month1,
            Month2,
            Month3
                
          } = request.body; 

        database.raw('exec stp_cdpd_planejamento_macrociclo_criacao ?,?,?,?,?',[Month1,Month2,Month3,IdPlanningMacrociclo,IdProfile])
        .then(data => {
            console.log(data);
            database.select("id",
                            "descricao as description" ,
                            "ano as year" ,
                            "numero as number" ,
                            "id_aluno as idStudent" ,
                            "data_cadastro as registrationDate" ,
                            "id_professor as idTeacher" ,
                            "observacao as obs" ,
                            "numero_substituicao as numberSubstitution" ,
                            "id_perfil as idProfile" ,
                            "chave_externa as externalKey")
                    .table("planejamento")
                    .where({"id_planejamento": IdPlanning})
                    .then(data => {
                        response.json(data);
                    }).catch(error => {
                        console.log(error);
                    })
        }).catch(error => {
            console.log(error);
        })
    }

    async get(request,response){

        var planejamento, 
            planejamento_anamnese, 
            planejamento_historico_patologico,
            planejamento_avaliacao_funcional,
            planejamento_avaliacao_postural,
            planejamento_historico_familiar,
            planejamento_fracionamento_corporal,
            planejamento_cronograma,
            planejamento_controle_diario,
            planejamento_macrociclo,
            planejamento_macrociclo_mes,
            planejamento_macrociclo_mes_dados,
            planejamento_macrociclo_mes_dados_caracateristicas

        planejamento = await database.select("id",
                                            "descricao as description" ,
                                            "ano as year" ,
                                            "numero as number" ,
                                            "id_aluno as idStudent" ,
                                            "data_cadastro as registrationDate" ,
                                            "id_professor as idTeacher" ,
                                            "observacao as obs" ,
                                            "numero_substituicao as numberSubstitution" ,
                                            "id_perfil as idProfile" ,
                                            "chave_externa as externalKey")
                                    .table("planejamento")

        var resultsPromise = planejamento.map(async (obj) => {

            //#region planejamento_anamnese
            planejamento_anamnese = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "pressao_arterial as bloodPressure",
                                              "frequencia_cardiaca as cardiacFrequency")
                                      .table("planejamento_anamnese")
                                      .where({"id_planejamento": obj.id})            

            planejamento_anamnese = await Promise.all(planejamento_anamnese)

            obj.planningAnamneses = planejamento_anamnese[0]
            //#endregion
            
            //#region planejamento_historico_patologico
            planejamento_historico_patologico = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "submetido_cirurgia as submetidoCirurgia",
                                              "submetido_cirurgia_qual as submetidoCirurgiaQual",
                                              "uso_medicamentos as usoMedicamentos",
                                              "uso_medicamentos_qual as usoMedicamentosQual",
                                              "apresenta_lesao as apresentaLesao",
                                              "apresenta_lesao_qual as apresentaLesaoQual",
                                              "apresenta_alergia as apresentaAlergia",
                                              "apresenta_alergia_qual as apresentaAlergiaQual",
                                              "apresenta_doenca_ou_sintoma as apresentaDoencaOuSintoma",
                                              "apresenta_doenca_ou_sintoma_qual as apresentaDoencaOuSintomaQual",
                                              "tpm as tpm",
                                              "tpm_outras_manifestacoes as tpmOutrasManifestacoes",
                                              "usa_psicotropicos as usaPsicotropicos",
                                              "eh_fumante as ehFumante",
                                              "cigarros_por_dia as cigarrosPorDia",
                                              "fumante_a_quanto_tempo as fumanteAQuantoTempo",
                                              "usa_bebida_alcolicas as usaBebidaAlcolicas",
                                              "usa_bebida_alcolicas_com_que_frequencia as usaBebidaAlcolicasComQueFrequencia",
                                              "faz_dieta_para_que as fazDietaParaQue",
                                              "faz_dieta_quanto_tempo as fazDietaQuantoTempo",
                                              "dieta_consumo_diario_calorias as dietaConsumoDiarioCalorias",
                                              )
                                      .table("planejamento_historico_patologico")
                                      .where({"id_planejamento": obj.id})            

            planejamento_historico_patologico = await Promise.all(planejamento_historico_patologico)

            obj.planningPathologicalHistories = planejamento_historico_patologico[0]

            //#endregion

            //#region planejamento_avaliacao_funcional
            planejamento_avaliacao_funcional = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "agachamento_ombro as agachamentoOmbro",
                                              "agachamento_toracica as agachamentoToracica",
                                              "agachamento_quadril as agachamentoQuadril",
                                              "agachamento_joelho as agachamentoJoelho",
                                              "agachamento_tornozelo as agachamentoTornozelo",
                                              "ombro_esquerdo as ombroEsquerdo",
                                              "ombro_direito as ombroDireito",
                                              "rotacao_tronco_esquerdo as rotacaoTroncoEsquerdo",
                                              "rotacao_tronco_direto as rotacaoTroncoDireito"
                                              )
                                      .table("planejamento_avaliacao_funcional")
                                      .where({"id_planejamento": obj.id})            

            planejamento_avaliacao_funcional = await Promise.all(planejamento_avaliacao_funcional)

            obj.planningFuncionalEvaluations = planejamento_avaliacao_funcional[0]

            //#endregion

            //#region planejamento_avaliacao_postural
            planejamento_avaliacao_postural = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "pe as pe",
                                                "joelho as joelho",
                                                "linha_poplitea as linhaPoplitea",
                                                "coxa as coxa",
                                                "quadril as quadril",
                                                "triangulo_de_tales as trianguloDeTales",
                                                "ombro as ombro",
                                                "escapula as escapula",
                                                "lordose as lordose",
                                                "escoliose as escoliose",
                                                "cifose as cifose",
                                                "cabeca as cabeca"
                                              )
                                      .table("planejamento_avaliacao_postural")
                                      .where({"id_planejamento": obj.id})            

            planejamento_avaliacao_postural = await Promise.all(planejamento_avaliacao_postural)

            obj.planningPosturalEvaluations = planejamento_avaliacao_postural[0]

            //#endregion

            //#region planejamento_historico_familiar
            planejamento_historico_familiar = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "cardiopata as cardiopata",
                                                "hipertensivo as hipertensivo",
                                                "diabetico as diabetico"
                                              )
                                      .table("planejamento_historico_familiar")
                                      .where({"id_planejamento": obj.id})            

            planejamento_historico_familiar = await Promise.all(planejamento_historico_familiar)

            obj.planningFamilyHistories = planejamento_historico_familiar[0]

            //#endregion

            //#region planejamento_fracionamento_corporal
            planejamento_fracionamento_corporal = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "estatura as estatura",
                                                    "peso as peso",
                                                    "triceps as triceps",
                                                    "escapular as escapular",
                                                    "peitoral as peitoral",
                                                    "suprailiaca as suprailiaca",
                                                    "abdominal as abdominal",
                                                    "coxa_media as coxaMedia",
                                                    "axilar_media as axilarMedia",
                                                    "panturilha_direita as panturilhaDireita",
                                                    "panturilha_esquerda as panturilhaEsquerda",
                                                    "coxa_media_direita as coxaMediaDireita",
                                                    "coxa_media_esquerda as coxaMediaEsquerda",
                                                    "quadril as quadril",
                                                    "cintura as cintura",
                                                    "circunferencia_abdominal as circunferenciaAbdominal",
                                                    "biceps_relaxado_direito as bicepsRelaxadoDireito",
                                                    "biceps_relaxado_esquerdo as bicepsRelaxadoEsquerdo",
                                                    "biceps_contraido_direito as bicepsContraidoDireito",
                                                    "biceps_contraido_esquerdo as bicepsContraidoEsquerdo",
                                                    "torax_relaxado as toraxRelaxado"
                                              )
                                      .table("planejamento_fracionamento_corporal")
                                      .where({"id_planejamento": obj.id})            

            planejamento_fracionamento_corporal = await Promise.all(planejamento_fracionamento_corporal)

            obj.planningBodyFractionations = planejamento_fracionamento_corporal[0]

            //#endregion

            //#region planejamento_cronograma
            planejamento_cronograma = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "horario as hour",
                                                "segunda as monday",
                                                "terca as tuesday",
                                                "quarta as wednesday",
                                                "quinta as thursday",
                                                "sexta as friday",
                                                "sabado as saturday",
                                                "domingo as sunday"
                                              )
                                      .table("planejamento_cronograma")
                                      .where({"id_planejamento": obj.id})            

            planejamento_cronograma = await Promise.all(planejamento_cronograma)

            obj.planningTimelines = planejamento_cronograma

            //#endregion

            //#region planejamento_controle_diario
            planejamento_controle_diario = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "numero_aula as classNumber",
                                                "fc_inicial as fcInicial",
                                                "fc_treino as fcTreino",
                                                "fc_recuperacao as fCRecuperacao",
                                                "borg as borg",
                                                "peso_inicial as pesoInicial",
                                                "peso_final as pesoFinal",
                                                "duracao as duracao",
                                                "sono as sono",
                                                "qualidade_sono as qualidadeSono",
                                                "recuperacao as recuperacao",
                                                "menstruada as menstruada",
                                                "motivacao as motivacao",
                                                "data as Data"
                                              )
                                      .table("planejamento_controle_diario")
                                      .where({"id_planejamento": obj.id})            

            planejamento_controle_diario = await Promise.all(planejamento_controle_diario)

            obj.planningDailyControls = planejamento_controle_diario

            //#endregion

            //#region planejamento_macrociclo
            planejamento_macrociclo = await database.select("id",
                                            "objetivo_principal as mainObjective",
                                            "objetivo_secundario as secondaryObjective",
                                            "objetivo_secundario_2 as secondaryObjective2",
                                            "obs_avaliador as obsEvaluator")
                                      .table("planejamento_macrociclo")
                                      .where({"id_planejamento": obj.id})

            var results2Promise = planejamento_macrociclo.map(async (obj2) => {
                planejamento_macrociclo_mes = await database.select("id",
                                                    "id_planejamento_macrociclo as idPlanningMacrocycle",
                                                    "mes as month",
                                                    "meta_mensal as metaMonthly",
                                                    "atividades_extras as extraActivities")
                                            .table("planejamento_macrociclo_mes")
                                            .where({"id_planejamento_macrociclo": obj2.id})

                planejamento_macrociclo_mes = planejamento_macrociclo_mes.map(async (obj3) => {
                    planejamento_macrociclo_mes_dados = await database.select("id",
                                                        "id_planejamento_macrociclo_mes as idPlanningMacrocycleMonth",
                                                        "semana as week",
                                                        "mesociclo as mesocycle",
                                                        "microciclo as microcycle",
                                                        "meta_semanal as metaWeekly")
                                                .table("planejamento_macrociclo_mes_dados")
                                                .where({"id_planejamento_macrociclo_mes": obj3.id})
    
                    planejamento_macrociclo_mes_dados = planejamento_macrociclo_mes_dados.map(async (obj4) => {
                        planejamento_macrociclo_mes_dados_caracateristicas = await database.select("id",
                                                            "id_planejamento_macrociclo_mes_dados as idPlanningMacrocycleMonthDatas",
                                                            "valencia as valency",
                                                            "intensidade as intensity",
                                                            "enfase as emphasis",
                                                            "obs as obs")
                                                    .table("planejamento_macrociclo_mes_dados_caracateristicas")
                                                    .where({"id_planejamento_macrociclo_mes_dados": obj4.id})
        
                        
        
                        obj4.planningMacrocycleMonthDatasCharacteristics = await Promise.all(planejamento_macrociclo_mes_dados_caracateristicas)
        
                        return obj4
                    })
                    
    
                    obj3.planningMacrocycleMonthDatas = await Promise.all(planejamento_macrociclo_mes_dados)
    
                    return obj3
                })
                

                obj2.planningMacrocycleMonths = await Promise.all(planejamento_macrociclo_mes)

                return obj2
            })

            planejamento_macrociclo = await Promise.all(results2Promise)

            obj.planningMacrocycles = planejamento_macrociclo[0]

            //#endregion

            return obj
        })

        response.json(await Promise.all(resultsPromise));   
    }

    async getByUserId(request,response){

        const {
            userId           
          } = request.query; 

        var planejamento, 
            planejamento_anamnese, 
            planejamento_historico_patologico,
            planejamento_avaliacao_funcional,
            planejamento_avaliacao_postural,
            planejamento_historico_familiar,
            planejamento_fracionamento_corporal,
            planejamento_cronograma,
            planejamento_controle_diario,
            planejamento_macrociclo,
            planejamento_macrociclo_mes,
            planejamento_macrociclo_mes_dados,
            planejamento_macrociclo_mes_dados_caracateristicas

        planejamento = await database.where({id_aluno: userId}).select("id",
                                            "descricao as description" ,
                                            "ano as year" ,
                                            "numero as number" ,
                                            "id_aluno as idStudent" ,
                                            "data_cadastro as registrationDate" ,
                                            "id_professor as idTeacher" ,
                                            "observacao as obs" ,
                                            "numero_substituicao as numberSubstitution" ,
                                            "id_perfil as idProfile" ,
                                            "chave_externa as externalKey")
                                    .table("planejamento")
                                    

        var resultsPromise = planejamento.map(async (obj) => {

            //#region planejamento_anamnese
            planejamento_anamnese = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "pressao_arterial as bloodPressure",
                                              "frequencia_cardiaca as cardiacFrequency")
                                      .table("planejamento_anamnese")
                                      .where({"id_planejamento": obj.id})            

            planejamento_anamnese = await Promise.all(planejamento_anamnese)

            obj.planningAnamneses = planejamento_anamnese[0]
            //#endregion
            
            //#region planejamento_historico_patologico
            planejamento_historico_patologico = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "submetido_cirurgia as submetidoCirurgia",
                                              "submetido_cirurgia_qual as submetidoCirurgiaQual",
                                              "uso_medicamentos as usoMedicamentos",
                                              "uso_medicamentos_qual as usoMedicamentosQual",
                                              "apresenta_lesao as apresentaLesao",
                                              "apresenta_lesao_qual as apresentaLesaoQual",
                                              "apresenta_alergia as apresentaAlergia",
                                              "apresenta_alergia_qual as apresentaAlergiaQual",
                                              "apresenta_doenca_ou_sintoma as apresentaDoencaOuSintoma",
                                              "apresenta_doenca_ou_sintoma_qual as apresentaDoencaOuSintomaQual",
                                              "tpm as tpm",
                                              "tpm_outras_manifestacoes as tpmOutrasManifestacoes",
                                              "usa_psicotropicos as usaPsicotropicos",
                                              "eh_fumante as ehFumante",
                                              "cigarros_por_dia as cigarrosPorDia",
                                              "fumante_a_quanto_tempo as fumanteAQuantoTempo",
                                              "usa_bebida_alcolicas as usaBebidaAlcolicas",
                                              "usa_bebida_alcolicas_com_que_frequencia as usaBebidaAlcolicasComQueFrequencia",
                                              "faz_dieta_para_que as fazDietaParaQue",
                                              "faz_dieta_quanto_tempo as fazDietaQuantoTempo",
                                              "dieta_consumo_diario_calorias as dietaConsumoDiarioCalorias",
                                              )
                                      .table("planejamento_historico_patologico")
                                      .where({"id_planejamento": obj.id})            

            planejamento_historico_patologico = await Promise.all(planejamento_historico_patologico)

            obj.planningPathologicalHistories = planejamento_historico_patologico[0]

            //#endregion

            //#region planejamento_avaliacao_funcional
            planejamento_avaliacao_funcional = await database.select("id",
                                              "id_planejamento as idPlanning",
                                              "agachamento_ombro as agachamentoOmbro",
                                              "agachamento_toracica as agachamentoToracica",
                                              "agachamento_quadril as agachamentoQuadril",
                                              "agachamento_joelho as agachamentoJoelho",
                                              "agachamento_tornozelo as agachamentoTornozelo",
                                              "ombro_esquerdo as ombroEsquerdo",
                                              "ombro_direito as ombroDireito",
                                              "rotacao_tronco_esquerdo as rotacaoTroncoEsquerdo",
                                              "rotacao_tronco_direto as rotacaoTroncoDireito"
                                              )
                                      .table("planejamento_avaliacao_funcional")
                                      .where({"id_planejamento": obj.id})            

            planejamento_avaliacao_funcional = await Promise.all(planejamento_avaliacao_funcional)

            obj.planningFuncionalEvaluations = planejamento_avaliacao_funcional[0]

            //#endregion

            //#region planejamento_avaliacao_postural
            planejamento_avaliacao_postural = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "pe as pe",
                                                "joelho as joelho",
                                                "linha_poplitea as linhaPoplitea",
                                                "coxa as coxa",
                                                "quadril as quadril",
                                                "triangulo_de_tales as trianguloDeTales",
                                                "ombro as ombro",
                                                "escapula as escapula",
                                                "lordose as lordose",
                                                "escoliose as escoliose",
                                                "cifose as cifose",
                                                "cabeca as cabeca"
                                              )
                                      .table("planejamento_avaliacao_postural")
                                      .where({"id_planejamento": obj.id})            

            planejamento_avaliacao_postural = await Promise.all(planejamento_avaliacao_postural)

            obj.planningPosturalEvaluations = planejamento_avaliacao_postural[0]

            //#endregion

            //#region planejamento_historico_familiar
            planejamento_historico_familiar = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "cardiopata as cardiopata",
                                                "hipertensivo as hipertensivo",
                                                "diabetico as diabetico"
                                              )
                                      .table("planejamento_historico_familiar")
                                      .where({"id_planejamento": obj.id})            

            planejamento_historico_familiar = await Promise.all(planejamento_historico_familiar)

            obj.planningFamilyHistories = planejamento_historico_familiar[0]

            //#endregion

            //#region planejamento_fracionamento_corporal
            planejamento_fracionamento_corporal = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "estatura as estatura",
                                                    "peso as peso",
                                                    "triceps as triceps",
                                                    "escapular as escapular",
                                                    "peitoral as peitoral",
                                                    "suprailiaca as suprailiaca",
                                                    "abdominal as abdominal",
                                                    "coxa_media as coxaMedia",
                                                    "axilar_media as axilarMedia",
                                                    "panturilha_direita as panturilhaDireita",
                                                    "panturilha_esquerda as panturilhaEsquerda",
                                                    "coxa_media_direita as coxaMediaDireita",
                                                    "coxa_media_esquerda as coxaMediaEsquerda",
                                                    "quadril as quadril",
                                                    "cintura as cintura",
                                                    "circunferencia_abdominal as circunferenciaAbdominal",
                                                    "biceps_relaxado_direito as bicepsRelaxadoDireito",
                                                    "biceps_relaxado_esquerdo as bicepsRelaxadoEsquerdo",
                                                    "biceps_contraido_direito as bicepsContraidoDireito",
                                                    "biceps_contraido_esquerdo as bicepsContraidoEsquerdo",
                                                    "torax_relaxado as toraxRelaxado"
                                              )
                                      .table("planejamento_fracionamento_corporal")
                                      .where({"id_planejamento": obj.id})            

            planejamento_fracionamento_corporal = await Promise.all(planejamento_fracionamento_corporal)

            obj.planningBodyFractionations = planejamento_fracionamento_corporal[0]

            //#endregion

            //#region planejamento_cronograma
            planejamento_cronograma = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "horario as hour",
                                                "segunda as monday",
                                                "terca as tuesday",
                                                "quarta as wednesday",
                                                "quinta as thursday",
                                                "sexta as friday",
                                                "sabado as saturday",
                                                "domingo as sunday"
                                              )
                                      .table("planejamento_cronograma")
                                      .where({"id_planejamento": obj.id})            

            planejamento_cronograma = await Promise.all(planejamento_cronograma)

            obj.planningTimelines = planejamento_cronograma

            //#endregion

            //#region planejamento_controle_diario
            planejamento_controle_diario = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "numero_aula as classNumber",
                                                "fc_inicial as fcInicial",
                                                "fc_treino as fcTreino",
                                                "fc_recuperacao as fcRecuperacao",
                                                "borg as borg",
                                                "peso_inicial as pesoInicial",
                                                "peso_final as pesoFinal",
                                                "duracao as duracao",
                                                "sono as sono",
                                                "qualidade_sono as qualidadeSono",
                                                "recuperacao as recuperacao",
                                                "menstruada as menstruada",
                                                "motivacao as motivacao",
                                                "data as data"
                                              )
                                      .table("planejamento_controle_diario")
                                      .where({"id_planejamento": obj.id})            

            planejamento_controle_diario = await Promise.all(planejamento_controle_diario)

            obj.planningDailyControls = planejamento_controle_diario

            //#endregion

            //#region planejamento_macrociclo
            planejamento_macrociclo = await database.select("id",
                                            "objetivo_principal as mainObjective",
                                            "objetivo_secundario as secondaryObjective",
                                            "objetivo_secundario_2 as secondaryObjective2",
                                            "obs_avaliador as obsEvaluator")
                                      .table("planejamento_macrociclo")
                                      .where({"id_planejamento": obj.id})

            var results2Promise = planejamento_macrociclo.map(async (obj2) => {
                planejamento_macrociclo_mes = await database.select("id",
                                                    "id_planejamento_macrociclo as idPlanningMacrocycle",
                                                    "mes as month",
                                                    "meta_mensal as metaMonthly",
                                                    "atividades_extras as extraActivities")
                                            .table("planejamento_macrociclo_mes")
                                            .where({"id_planejamento_macrociclo": obj2.id})

                planejamento_macrociclo_mes = planejamento_macrociclo_mes.map(async (obj3) => {
                    planejamento_macrociclo_mes_dados = await database.select("id",
                                                        "id_planejamento_macrociclo_mes as idPlanningMacrocycleMonth",
                                                        "semana as week",
                                                        "mesociclo as mesocycle",
                                                        "microciclo as microcycle",
                                                        "meta_semanal as metaWeekly")
                                                .table("planejamento_macrociclo_mes_dados")
                                                .where({"id_planejamento_macrociclo_mes": obj3.id})
    
                    planejamento_macrociclo_mes_dados = planejamento_macrociclo_mes_dados.map(async (obj4) => {
                        planejamento_macrociclo_mes_dados_caracateristicas = await database.select("id",
                                                            "id_planejamento_macrociclo_mes_dados as idPlanningMacrocycleMonthDatas",
                                                            "valencia as valency",
                                                            "intensidade as intensity",
                                                            "enfase as emphasis",
                                                            "obs as obs")
                                                    .table("planejamento_macrociclo_mes_dados_caracateristicas")
                                                    .where({"id_planejamento_macrociclo_mes_dados": obj4.id})
        
                        
        
                        obj4.planningMacrocycleMonthDatasCharacteristics = await Promise.all(planejamento_macrociclo_mes_dados_caracateristicas)
        
                        return obj4
                    })
                    
    
                    obj3.planningMacrocycleMonthDatas = await Promise.all(planejamento_macrociclo_mes_dados)
    
                    return obj3
                })
                

                obj2.planningMacrocycleMonths = await Promise.all(planejamento_macrociclo_mes)

                return obj2
            })

            planejamento_macrociclo = await Promise.all(results2Promise)

            obj.planningMacrocycles = planejamento_macrociclo[0]

            //#endregion

            return obj
        })

        response.json(await Promise.all(resultsPromise));   
    }

    async New(request,response){
        const {
            studentId,
            month1,
            month2,
            month3,
            profile
          } = request.body; 
console.log(studentId,
    month1,
    month2,
    month3,
    profile)
        await database.raw('CALL stp_cdpd_planejamento_criacao (?,?,?,?,?)',[studentId,month1,month2,month3,profile])
        .then(async data => {
            var planejamento, 
                planejamento_anamnese, 
                planejamento_historico_patologico,
                planejamento_avaliacao_funcional,
                planejamento_avaliacao_postural,
                planejamento_historico_familiar,
                planejamento_fracionamento_corporal,
                planejamento_cronograma,
                planejamento_controle_diario,
                planejamento_macrociclo,
                planejamento_macrociclo_mes,
                planejamento_macrociclo_mes_dados,
                planejamento_macrociclo_mes_dados_caracateristicas 
            planejamento = await database.where({"id": data[1].id_planejamento}).select("id",
                                                "descricao as description" ,
                                                "ano as year" ,
                                                "numero as number" ,
                                                "id_aluno as idStudent" ,
                                                "data_cadastro as registrationDate" ,
                                                "id_professor as idTeacher" ,
                                                "observacao as obs" ,
                                                "numero_substituicao as numberSubstitution" ,
                                                "id_perfil as idProfile" ,
                                                "chave_externa as externalKey")
                                        .table("planejamento")
                                        

            var resultsPromise = planejamento.map(async (obj) => {

                //#region planejamento_anamnese
                planejamento_anamnese = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "pressao_arterial as bloodPressure",
                                                "frequencia_cardiaca as cardiacFrequency")
                                        .table("planejamento_anamnese")
                                        .where({"id_planejamento": obj.id})            

                planejamento_anamnese = await Promise.all(planejamento_anamnese)

                obj.planningAnamneses = planejamento_anamnese[0]
                //#endregion
                
                //#region planejamento_historico_patologico
                planejamento_historico_patologico = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "submetido_cirurgia as submetidoCirurgia",
                                                "submetido_cirurgia_qual as submetidoCirurgiaQual",
                                                "uso_medicamentos as usoMedicamentos",
                                                "uso_medicamentos_qual as usoMedicamentosQual",
                                                "apresenta_lesao as apresentaLesao",
                                                "apresenta_lesao_qual as apresentaLesaoQual",
                                                "apresenta_alergia as apresentaAlergia",
                                                "apresenta_alergia_qual as apresentaAlergiaQual",
                                                "apresenta_doenca_ou_sintoma as apresentaDoencaOuSintoma",
                                                "apresenta_doenca_ou_sintoma_qual as apresentaDoencaOuSintomaQual",
                                                "tpm as tpm",
                                                "tpm_outras_manifestacoes as tpmOutrasManifestacoes",
                                                "usa_psicotropicos as usaPsicotropicos",
                                                "eh_fumante as ehFumante",
                                                "cigarros_por_dia as cigarrosPorDia",
                                                "fumante_a_quanto_tempo as fumanteAQuantoTempo",
                                                "usa_bebida_alcolicas as usaBebidaAlcolicas",
                                                "usa_bebida_alcolicas_com_que_frequencia as usaBebidaAlcolicasComQueFrequencia",
                                                "faz_dieta_para_que as fazDietaParaQue",
                                                "faz_dieta_quanto_tempo as fazDietaQuantoTempo",
                                                "dieta_consumo_diario_calorias as dietaConsumoDiarioCalorias",
                                                )
                                        .table("planejamento_historico_patologico")
                                        .where({"id_planejamento": obj.id})            

                planejamento_historico_patologico = await Promise.all(planejamento_historico_patologico)

                obj.planningPathologicalHistories = planejamento_historico_patologico[0]

                //#endregion

                //#region planejamento_avaliacao_funcional
                planejamento_avaliacao_funcional = await database.select("id",
                                                "id_planejamento as idPlanning",
                                                "agachamento_ombro as agachamentoOmbro",
                                                "agachamento_toracica as agachamentoToracica",
                                                "agachamento_quadril as agachamentoQuadril",
                                                "agachamento_joelho as agachamentoJoelho",
                                                "agachamento_tornozelo as agachamentoTornozelo",
                                                "ombro_esquerdo as ombroEsquerdo",
                                                "ombro_direito as ombroDireito",
                                                "rotacao_tronco_esquerdo as rotacaoTroncoEsquerdo",
                                                "rotacao_tronco_direto as rotacaoTroncoDireito"
                                                )
                                        .table("planejamento_avaliacao_funcional")
                                        .where({"id_planejamento": obj.id})            

                planejamento_avaliacao_funcional = await Promise.all(planejamento_avaliacao_funcional)

                obj.planningFuncionalEvaluations = planejamento_avaliacao_funcional[0]

                //#endregion

                //#region planejamento_avaliacao_postural
                planejamento_avaliacao_postural = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "pe as pe",
                                                    "joelho as joelho",
                                                    "linha_poplitea as linhaPoplitea",
                                                    "coxa as coxa",
                                                    "quadril as quadril",
                                                    "triangulo_de_tales as trianguloDeTales",
                                                    "ombro as ombro",
                                                    "escapula as escapula",
                                                    "lordose as lordose",
                                                    "escoliose as escoliose",
                                                    "cifose as cifose",
                                                    "cabeca as cabeca"
                                                )
                                        .table("planejamento_avaliacao_postural")
                                        .where({"id_planejamento": obj.id})            

                planejamento_avaliacao_postural = await Promise.all(planejamento_avaliacao_postural)

                obj.planningPosturalEvaluations = planejamento_avaliacao_postural[0]

                //#endregion

                //#region planejamento_historico_familiar
                planejamento_historico_familiar = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "cardiopata as cardiopata",
                                                    "hipertensivo as hipertensivo",
                                                    "diabetico as diabetico"
                                                )
                                        .table("planejamento_historico_familiar")
                                        .where({"id_planejamento": obj.id})            

                planejamento_historico_familiar = await Promise.all(planejamento_historico_familiar)

                obj.planningFamilyHistories = planejamento_historico_familiar[0]

                //#endregion

                //#region planejamento_fracionamento_corporal
                planejamento_fracionamento_corporal = await database.select("id",
                                                        "id_planejamento as idPlanning",
                                                        "estatura as estatura",
                                                        "peso as peso",
                                                        "triceps as triceps",
                                                        "escapular as escapular",
                                                        "peitoral as peitoral",
                                                        "suprailiaca as suprailiaca",
                                                        "abdominal as abdominal",
                                                        "coxa_media as coxaMedia",
                                                        "axilar_media as axilarMedia",
                                                        "panturilha_direita as panturilhaDireita",
                                                        "panturilha_esquerda as panturilhaEsquerda",
                                                        "coxa_media_direita as coxaMediaDireita",
                                                        "coxa_media_esquerda as CoxaMediaEsquerda",
                                                        "quadril as quadril",
                                                        "cintura as cintura",
                                                        "circunferencia_abdominal as circunferenciaAbdominal",
                                                        "biceps_relaxado_direito as bicepsRelaxadoDireito",
                                                        "biceps_relaxado_esquerdo as bicepsRelaxadoEsquerdo",
                                                        "biceps_contraido_direito as bicepsContraidoDireito",
                                                        "biceps_contraido_esquerdo as bicepsContraidoEsquerdo",
                                                        "torax_relaxado as toraxRelaxado"
                                                )
                                        .table("planejamento_fracionamento_corporal")
                                        .where({"id_planejamento": obj.id})            

                planejamento_fracionamento_corporal = await Promise.all(planejamento_fracionamento_corporal)

                obj.planningBodyFractionations = planejamento_fracionamento_corporal[0]

                //#endregion

                //#region planejamento_cronograma
                planejamento_cronograma = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "horario as hour",
                                                    "segunda as monday",
                                                    "terca as tuesday",
                                                    "quarta as wednesday",
                                                    "quinta as thursday",
                                                    "sexta as friday",
                                                    "sabado as saturday",
                                                    "domingo as sunday"
                                                )
                                        .table("planejamento_cronograma")
                                        .where({"id_planejamento": obj.id})            

                planejamento_cronograma = await Promise.all(planejamento_cronograma)

                obj.planningTimelines = planejamento_cronograma

                //#endregion

                //#region planejamento_controle_diario
                planejamento_controle_diario = await database.select("id",
                                                    "id_planejamento as idPlanning",
                                                    "numero_aula as classNumber",
                                                    "fc_inicial as fcInicial",
                                                    "fc_treino as fcTreino",
                                                    "fc_recuperacao as fcRecuperacao",
                                                    "borg as borg",
                                                    "peso_inicial as pesoInicial",
                                                    "peso_final as pesoFinal",
                                                    "duracao as duracao",
                                                    "sono as sono",
                                                    "qualidade_sono as qualidadeSono",
                                                    "recuperacao as recuperacao",
                                                    "menstruada as menstruada",
                                                    "motivacao as motivacao",
                                                    "data as data"
                                                )
                                        .table("planejamento_controle_diario")
                                        .where({"id_planejamento": obj.id})            

                planejamento_controle_diario = await Promise.all(planejamento_controle_diario)

                obj.planningDailyControls = planejamento_controle_diario

                //#endregion

                //#region planejamento_macrociclo
                planejamento_macrociclo = await database.select("id",
                                                "objetivo_principal as mainObjective",
                                                "objetivo_secundario as secondaryObjective",
                                                "objetivo_secundario_2 as secondaryObjective2",
                                                "obs_avaliador as obsEvaluator")
                                        .table("planejamento_macrociclo")
                                        .where({"id_planejamento": obj.id})

                var results2Promise = planejamento_macrociclo.map(async (obj2) => {
                    planejamento_macrociclo_mes = await database.select("id",
                                                        "id_planejamento_macrociclo as idPlanningMacrocycle",
                                                        "mes as month",
                                                        "meta_mensal as metaMonthly",
                                                        "atividades_extras as extraActivities")
                                                .table("planejamento_macrociclo_mes")
                                                .where({"id_planejamento_macrociclo": obj2.id})

                    planejamento_macrociclo_mes = planejamento_macrociclo_mes.map(async (obj3) => {
                        planejamento_macrociclo_mes_dados = await database.select("id",
                                                            "id_planejamento_macrociclo_mes as idPlanningMacrocycleMonth",
                                                            "semana as week",
                                                            "mesociclo as mesocycle",
                                                            "microciclo as microcycle",
                                                            "meta_semanal as metaWeekly")
                                                    .table("planejamento_macrociclo_mes_dados")
                                                    .where({"id_planejamento_macrociclo_mes": obj3.id})
        
                        planejamento_macrociclo_mes_dados = planejamento_macrociclo_mes_dados.map(async (obj4) => {
                            planejamento_macrociclo_mes_dados_caracateristicas = await database.select("id",
                                                                "id_planejamento_macrociclo_mes_dados as idPlanningMacrocycleMonthDatas",
                                                                "valencia as valency",
                                                                "intensidade as intensity",
                                                                "enfase as emphasis",
                                                                "obs as obs")
                                                        .table("planejamento_macrociclo_mes_dados_caracateristicas")
                                                        .where({"id_planejamento_macrociclo_mes_dados": obj4.id})
            
                            
            
                            obj4.planningMacrocycleMonthDatasCharacteristics = await Promise.all(planejamento_macrociclo_mes_dados_caracateristicas)
            
                            return obj4
                        })
                        
        
                        obj3.planningMacrocycleMonthDatas = await Promise.all(planejamento_macrociclo_mes_dados)
        
                        return obj3
                    })
                    

                    obj2.planningMacrocycleMonths = await Promise.all(planejamento_macrociclo_mes)

                    return obj2
                })

                planejamento_macrociclo = await Promise.all(results2Promise)

                obj.planningMacrocycles = planejamento_macrociclo[0]

                //#endregion

                return obj
            })

            response.json(await Promise.all(resultsPromise));   
        }).catch(error => {
            console.log(error);
        })
    }

    async put(request,response){

        const {
            id,
            description,
            year,
            number,
            idStudent,
            registrationDate,
            idTeacher,
            obs,
            numberSubstitution,
            idProfile,
            externalKey,
            planningAnamneses,
            planningPathologicalHistories,        
            planningPosturalEvaluations,            
            planningFuncionalEvaluations,            
            planningMacrocycles,            
            planningFamilyHistories,            
            planningBodyFractionations,  
            planningTimelines,     
            planningDailyControls
          } = request.body;
        

        await database.where({id: id})
                      .update({
                            "descricao": description,
                            "ano": year ,
                            "numero": number,
                            "id_aluno": idStudent,
                            "data_cadastro": registrationDate,
                            "id_professor": idTeacher,
                            "observacao": obs,
                            "numero_substituicao": numberSubstitution,
                            "id_perfil": idProfile,
                            "chave_externa": externalKey
                      })
                      .table("planejamento");

        if(Object.keys(planningAnamneses).length !== 0)
        await database.where({id_planejamento: id})
                      .update({
                            "pressao_arterial": planningAnamneses.bloodPressure,
                            "frequencia_cardiaca": planningAnamneses.cardiacFrequency
                      })
                      .table("planejamento_anamnese");

        if(Object.keys(planningPathologicalHistories).length !== 0)                      
        await database.where({id_planejamento: id})
                      .update({
                            "submetido_cirurgia": planningPathologicalHistories.submetidoCirurgia,
                            "submetido_cirurgia_qual": planningPathologicalHistories.submetidoCirurgiaQual,
                            "uso_medicamentos": planningPathologicalHistories.usoMedicamentos,
                            "uso_medicamentos_qual": planningPathologicalHistories.usoMedicamentosQual,
                            "apresenta_lesao": planningPathologicalHistories.apresentaLesao,
                            "apresenta_lesao_qual": planningPathologicalHistories.apresentaLesaoQual,
                            "apresenta_alergia": planningPathologicalHistories.apresentaAlergia,
                            "apresenta_alergia_qual": planningPathologicalHistories.apresentaAlergiaQual,
                            "apresenta_doenca_ou_sintoma": planningPathologicalHistories.apresentaDoencaOuSintoma,
                            "apresenta_doenca_ou_sintoma_qual": planningPathologicalHistories.apresentaDoencaOuSintomaQual,
                            "tpm": planningPathologicalHistories.tpm,
                            "tpm_outras_manifestacoes": planningPathologicalHistories.tpmOutrasManifestacoes,
                            "usa_psicotropicos": planningPathologicalHistories.usaPsicotropicos,
                            "eh_fumante": planningPathologicalHistories.ehFumante,
                            "cigarros_por_dia": planningPathologicalHistories.cigarrosPorDia,
                            "fumante_a_quanto_tempo": planningPathologicalHistories.fumanteAQuantoTempo,
                            "usa_bebida_alcolicas": planningPathologicalHistories.usaBebidaAlcolicas,
                            "usa_bebida_alcolicas_com_que_frequencia": planningPathologicalHistories.usaBebidaAlcolicasComQueFrequencia,
                            "faz_dieta_para_que": planningPathologicalHistories.fazDietaParaQue,
                            "faz_dieta_quanto_tempo": planningPathologicalHistories.fazDietaQuantoTempo,
                            "dieta_consumo_diario_calorias": planningPathologicalHistories.dietaConsumoDiarioCalorias
                      })
                      .table("planejamento_historico_patologico");                                    
                      console.log(request.body)

        if(Object.keys(planningFuncionalEvaluations).length !== 0)                                            
        await database.where({id_planejamento: id})
                      .update({
                        "agachamento_ombro": planningFuncionalEvaluations.agachamentoOmbro,
                        "agachamento_toracica": planningFuncionalEvaluations.agachamentoToracica,
                        "agachamento_quadril": planningFuncionalEvaluations.agachamentoQuadril,
                        "agachamento_joelho": planningFuncionalEvaluations.agachamentoJoelho,
                        "agachamento_tornozelo": planningFuncionalEvaluations.agachamentoTornozelo,
                        "ombro_esquerdo": planningFuncionalEvaluations.ombroEsquerdo,
                        "ombro_direito": planningFuncionalEvaluations.ombroDireito,
                        "rotacao_tronco_esquerdo": planningFuncionalEvaluations.rotacaoTroncoEsquerdo,
                        "rotacao_tronco_direto": planningFuncionalEvaluations.rotacaoTroncoDireito
                      })
                      .table("planejamento_avaliacao_funcional");

        if(Object.keys(planningPosturalEvaluations).length !== 0) 
        await database.where({id_planejamento: id})
                      .update({
                        "pe": planningPosturalEvaluations.pe,
                        "joelho": planningPosturalEvaluations.joelho,
                        "linha_poplitea": planningPosturalEvaluations.linhaPoplitea,
                        "coxa": planningPosturalEvaluations.coxa,
                        "quadril": planningPosturalEvaluations.quadril,
                        "triangulo_de_tales": planningPosturalEvaluations.trianguloDeTales,
                        "ombro": planningPosturalEvaluations.ombro,
                        "escapula": planningPosturalEvaluations.escapula,
                        "lordose": planningPosturalEvaluations.lordose,
                        "escoliose": planningPosturalEvaluations.escoliose,
                        "cifose": planningPosturalEvaluations.cifose,
                        "cabeca": planningPosturalEvaluations.cabeca
                      })
                      .table("planejamento_avaliacao_postural");
        
        if(Object.keys(planningFamilyHistories).length !== 0)                       
        await database.where({id_planejamento: id})
                      .update({
                        "cardiopata": planningFamilyHistories.cardiopata,
                        "hipertensivo": planningFamilyHistories.hipertensivo,
                        "diabetico": planningFamilyHistories.diabetico
                      })
                      .table("planejamento_historico_familiar");                      

        if(Object.keys(planningBodyFractionations).length !== 0)                                             
        await database.where({id_planejamento: id})
                      .update({
                        "id_planejamento": planningBodyFractionations.idPlanning,
                        "estatura": planningBodyFractionations.estatura,
                        "peso": planningBodyFractionations.peso,
                        "triceps": planningBodyFractionations.triceps,
                        "escapular": planningBodyFractionations.escapular,
                        "peitoral": planningBodyFractionations.peitoral,
                        "suprailiaca": planningBodyFractionations.suprailiaca,
                        "abdominal": planningBodyFractionations.abdominal,
                        "coxa_media": planningBodyFractionations.coxaMedia,
                        "axilar_media": planningBodyFractionations.axilarMedia,
                        "panturilha_direita": planningBodyFractionations.panturilhaDireita,
                        "panturilha_esquerda": planningBodyFractionations.panturilhaEsquerda,
                        "coxa_media_direita": planningBodyFractionations.coxaMediaDireita,
                        "coxa_media_esquerda": planningBodyFractionations.coxaMediaEsquerda,
                        "quadril": planningBodyFractionations.quadril,
                        "cintura": planningBodyFractionations.cintura,
                        "circunferencia_abdominal": planningBodyFractionations.circunferenciaAbdominal,
                        "biceps_relaxado_direito": planningBodyFractionations.bicepsRelaxadoDireito,
                        "biceps_relaxado_esquerdo": planningBodyFractionations.bicepsRelaxadoEsquerdo,
                        "biceps_contraido_direito": planningBodyFractionations.bicepsContraidoDireito,
                        "biceps_contraido_esquerdo": planningBodyFractionations.bicepsContraidoEsquerdo,
                        "torax_relaxado": planningBodyFractionations.toraxRelaxado
                      })
                      .table("planejamento_fracionamento_corporal");  

        if(Object.keys(planningTimelines).length !== 0)               
        planningTimelines.map(async (pmc) => {

            await database.where({id: pmc.id})
                    .update({
                        "horario": pmc.hour,
                        "segunda": pmc.monday,
                        "terca": pmc.tuesday,
                        "quarta": pmc.wednesday,
                        "quinta": pmc.thursday,
                        "sexta": pmc.friday,
                        "sabado": pmc.saturday,
                        "domingo": pmc.sunday
                    })
                    .table("planejamento_cronograma");
        })

        if(Object.keys(planningDailyControls).length !== 0)        
        planningDailyControls.map(async (pmc) => {

            await database.where({id: pmc.id})
                    .update({
                        "numero_aula": pmc.classNumber,
                        "fc_inicial": pmc.fcInicial,
                        "fc_treino": pmc.fcTreino,
                        "fc_recuperacao": pmc.fcRecuperacao,
                        "borg": pmc.borg,
                        "peso_inicial": pmc.pesoInicial,
                        "peso_final": pmc.pesoFinal,
                        "duracao": pmc.duracao,
                        "sono": pmc.sono,
                        "qualidade_sono": pmc.qualidadeSono,
                        "recuperacao": pmc.recuperacao,
                        "menstruada": pmc.menstruada,
                        "motivacao": pmc.motivacao,
                        "data": pmc.data
                    })
                    .table("planejamento_controle_diario");
        })

        console.log(planningMacrocycles)
        if(Object.keys(planningMacrocycles).length !== 0)        
        await database.where({id_planejamento: id})
                      .update({
                        "objetivo_principal": planningMacrocycles.mainObjective,
                        "objetivo_secundario": planningMacrocycles.secondaryObjective,
                        "objetivo_secundario_2": planningMacrocycles.secondaryObjective2,
                        "obs_avaliador": planningMacrocycles.obsEvaluator
                      })
                      .table("planejamento_macrociclo");

        if(Object.keys(planningMacrocycles.planningMacrocycleMonths).length !== 0)                              
        planningMacrocycles.planningMacrocycleMonths.map(async (pmm) => {

            await database.where({id: pmm.id})
                    .update({
                        "id_planejamento_macrociclo": pmm.idPlanningMacrocycle,
                        "mes": pmm.month,
                        "meta_mensal": pmm.metaMonthly,
                        "atividades_extras": pmm.extraActivities
                    })
                    .table("planejamento_macrociclo_mes");

            pmm.planningMacrocycleMonthDatas.map(async (pmmd) => {

                await database.where({id: pmmd.id})
                        .update({
                            "id_planejamento_macrociclo_mes": pmmd.idPlanningMacrocycleMonth,
                            "semana": pmmd.week,
                            "mesociclo": pmmd.mesocycle,
                            "microciclo": pmmd.microcycle,
                            "meta_semanal": pmmd.metaWeekly
                        })
                        .table("planejamento_macrociclo_mes_dados");
                
                pmmd.planningMacrocycleMonthDatasCharacteristics.map(async (pmmdc) => {

                    await database.where({id: pmmdc.id})
                            .update({
                                "id_planejamento_macrociclo_mes_dados": pmmdc.idPlanningMacrocycleMonthDatas,
                                "valencia": pmmdc.valency,
                                "intensidade": pmmdc.intensity,
                                "enfase": pmmdc.emphasis,
                                "obs": pmmdc.obs
                            })
                            .table("planejamento_macrociclo_mes_dados_caracateristicas");
        
                    
                })
                
            })
        })
        
        response.json({message: "Planejamento atualizada com sucesso!"})    
    }
}

module.exports = new PlanningController();