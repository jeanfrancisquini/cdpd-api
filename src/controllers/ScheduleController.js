const database = require('../database/connection')
const moment = require('moment');

class ScheduleController{
    async post(request,response){
        const {
                idStudent ,
                idService ,
                idActivity ,
                idTeacher ,        
                idScheduler ,
                date ,
                time ,
                idPosting ,
                checking ,
                checkout
              } = request.body;

        database.insert({
                    "id_aluno": idStudent ,
                    "id_servico": idService ,
                    "id_atividade": idActivity ,
                    "id_professor": idTeacher ,        
                    "id_agendador": idScheduler ,
                    "data": date ,
                    "horario": time ,
                    "id_lancamento": idPosting ,
                    "checking": checking ,
                    "checkout": checkout
                })
                .table("agendamento")
                .returning(["id as id","id_aluno as idStudent" ,
                            "id_servico as idService" ,
                            "id_atividade as idActivity" ,
                            "id_professor as idTeacher" ,        
                            "id_agendador as idScheduler" ,
                            "data as date" ,
                            "horario as time" ,
                            "id_lancamento as idPosting" ,
                            "checking as checking" ,
                            "checkout as checkout"])
                .then(async data => {
                    var resultsPromise = data.map(async (obj) => {

                        obj.time = moment(obj.time).format('HH:mm:ss')
                        return obj
                    })

                    var teste = await Promise.all(resultsPromise);
                    console.log(teste);
                    response.json(teste[0]); 
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "id_aluno as idStudent" ,
                        "id_servico as idService" ,
                        "id_atividade as idActivity" ,
                        "id_professor as idTeacher" ,        
                        "id_agendador as idScheduler" ,
                        "data as date" ,
                        "horario as time" ,
                        "id_lancamento as idPosting",
                        "checking as checking" ,
                        "checkout as checkout")
                .table("agendamento").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        //const {id} = request.query
        const {
            id,
            idStudent ,
            idService ,
            idActivity ,
            idTeacher ,        
            idScheduler ,
            date ,
            time ,
            idPosting ,
            checking ,
            checkout
          } = request.body;

        console.log(request.body);

        database.where({id: id})
                .update({
                    "id_aluno": idStudent ,
                    "id_servico": idService ,
                    "id_atividade": idActivity ,
                    "id_professor": idTeacher ,        
                    "id_agendador": idScheduler ,
                    "data": date ,
                    "horario": time ,
                    "id_lancamento": idPosting ,
                    "checking": checking ,
                    "checkout": checkout
                })
                .table("agendamento")                
                .then(data => {
                    console.log(data)
                    response.json({message: "Agendamento atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.body

        console.log(id);

        database.where({id: id})
                .del()
                .table("agendamento")
                .then(data => {
                    console.log(data)
                    response.json({message: "Agendamento deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }


    async getSchedule(request,response){
        const {
            userId ,
            activityId ,
            date ,
            time ,
          } = request.body;



        database.raw('exec stp_busca_agendamento ?,?,?,?',[userId ?? null,activityId?? null,date?? null,time?? null])
          .then(async data => {
                var resultsPromise = data.map(async (obj) => {

                    obj.time = moment(obj.time).format('HH:mm:ss')
                    return obj
                })

                response.json(await Promise.all(resultsPromise)); 
          }).catch(error => {
              console.log(error);
          })
        
    }

    scheduleBulkAdd(request,response){
        const {
                UserId,
                ActivityId,
                DataInicio,
                DataFim,
                Segunda,
                Terca,
                Quarta,
                Quinta,
                Sexta
              } = request.body;

        database.raw('exec stp_agendamento_em_massa ?,?,?,?,?,?,?,?,?',[UserId ?? null,ActivityId?? null,DataInicio?? null,DataFim?? null,Segunda?? null,Terca?? null,Quarta?? null,Quinta?? null,Sexta?? null])
        .then(data => {
            console.log(data);
            response.json(data);
        }).catch(error => {
            console.log(error);
        })
    }

    GetById(request,response){
        const {
            userId,
          } = request.query;

        database.select("id",
                        "id_aluno as idStudent" ,
                        "id_servico as idService" ,
                        "id_atividade as idActivity" ,
                        "id_professor as idTeacher" ,        
                        "id_agendador as idScheduler" ,
                        "data as date" ,
                        "horario as time" ,
                        "id_lancamento as idPosting",
                        "checking as checking" ,
                        "checkout as checkout")
                .table("agendamento")
                .where({"id": userId})
                .then(data => {
                    console.log(data);
                    response.json(data[0]);
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new ScheduleController();