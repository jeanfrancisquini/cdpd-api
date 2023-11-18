const database = require('../database/connection')

class ProfileController{
    
    async get(request,response){

        var atributo1, atributo2, atributo3

        atributo1 = await database.select("id",
                                          "descricao as description")
                                  .table("perfil")

        var resultsPromise = atributo1.map(async (obj) => {
            atributo2 = await database.select("id",
                                              "id_perfil as IdPerfil",
                                              "numero_macrociclo as numberMacrociclo",
                                              "mesociclo as mesociclo",
                                              "microciclo as microciclo")
                                      .table("perfil_mes")
                                      .where({"id_perfil": obj.id})

            var results2Promise = atributo2.map(async (obj2) => {
                atributo3 = await database.select("id",
                                                    "id_perfil_mes as IdPerfilMonth",
                                                    "enfase as enfase",
                                                    "intensidade as intensidade",
                                                    "valencia as valencia")
                                            .table("perfil_mes_caracteristicas")
                                            .where({"id_perfil_mes": obj2.id})

                

                obj2.profileMonthCharacteristics = atributo3

                return obj2
            })

            atributo2 = await Promise.all(results2Promise)

            obj.profileMonths = atributo2

            return obj
        })

        response.json(await Promise.all(resultsPromise));   
    }

    async post(request,response){

        try {
            const {
                description ,
                profileMonths 
              } = request.body;


            //console.log(profileMonths)

            const perfilInserted = await database.insert({
                        "descricao": description ,
                    })
                    .table("perfil")
                    .returning('id');

            profileMonths.map(async (pm) => {
                const {
                    numberMacrociclo,
                    mesociclo,
                    microciclo,
                    profileMonthCharacteristics
                } = pm;

                const perfil_mesInserted = await database.insert({
                                                        "id_perfil": perfilInserted[0].id ,
                                                        "numero_macrociclo": numberMacrociclo,
                                                        "mesociclo": mesociclo,
                                                        "microciclo": microciclo
                                                    })
                                                    .table("perfil_mes")
                                                    .returning('id');
                
                profileMonthCharacteristics.map(async (pmc) => {
                    const {
                        enfase,
                        intensidade,
                        valencia,
                    } = pmc;
        
                    const perfil_mes_caracteristicasInserted = await database.insert({
                                                            "id_perfil_mes": perfil_mesInserted[0].id ,
                                                            "enfase": enfase,
                                                            "intensidade": intensidade,
                                                            "valencia": valencia
                                                        })
                                                        .table("perfil_mes_caracteristicas")
                                                        .returning('id');
                })

            })

            response.json({message: "Perfil criado com sucesso!"})    


        } catch (error) {
            console.log(error);
        }
        
    }

    async put(request,response){

        try {
            const {
                id,
                description ,
                profileMonths 
              } = request.body;


            //console.log(profileMonths)

            await database.where({id: id})
                          .update({
                                "descricao": description ,
                            })
                            .table("perfil");

            profileMonths.map(async (pm) => {
                const {
                    id,
                    IdPerfil,
                    numberMacrociclo,
                    mesociclo,
                    microciclo,
                    profileMonthCharacteristics
                } = pm;

                await database.where({id: id})
                          .update({
                                "id_perfil": IdPerfil,
                                "numero_macrociclo": numberMacrociclo,
                                "mesociclo": mesociclo,
                                "microciclo": microciclo
                            })
                            .table("perfil_mes");
                
                profileMonthCharacteristics.map(async (pmc) => {
                    const {
                        id,
                        IdPerfilMonth,
                        enfase,
                        intensidade,
                        valencia,
                    } = pmc;
        
                    await database.where({id: id})
                          .update({
                                "id_perfil_mes": IdPerfilMonth,
                                "enfase": enfase,
                                "intensidade": intensidade,
                                "valencia": valencia
                            })
                            .table("perfil_mes_caracteristicas");
                })

            })

            response.json({message: "Perfil atualizada com sucesso!"})    


        } catch (error) {
            console.log(error);
        }

    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("perfil")
                .then(data => {
                    console.log(data)
                    response.json({message: "Perfil deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

}

module.exports = new ProfileController();