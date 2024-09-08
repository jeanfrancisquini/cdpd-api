const database = require('../database/connection')
const moment = require('moment');

class ReportController{

    async get(request,response){

        //const {id} = request.query
        const {time,day} = request.body;
        var dayFormated = day;
        console.log(new Date(day))
        if(new Date(day) == 'Invalid Date')
            dayFormated = null
        database.raw("exec stp_relatorio_caracteristicas ?,?",[time?? null,dayFormated?? null])
        .then(data => {
            console.log(data);
            response.json(data);
        }).catch(error => {
            console.log(error);
        })
    }

    async getReportSchedule(request,response){
        
        const {data} = request.body;
        console.log(data)

        database.raw("exec stp_relatorio_horarios ?",[data ?? null])
        .then(async data => {
            var resultsPromise = data.map(async (obj) => {

                obj.horario = moment(obj.horario).format('HH:mm:ss')
                return obj
            })

            response.json(await Promise.all(resultsPromise)); 
        }).catch(error => {
            console.log(error);
        })
    }

    async getReportNextPlanning(request,response){
        
        const {data} = request.body;
        console.log(data)

        database.raw("exec stp_relatorio_proximo_planejamento",[])
        .then(async data => {
            response.json(data); 
        }).catch(error => {
            console.log(error);
        })
    }

}

module.exports = new ReportController();