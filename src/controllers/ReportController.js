const database = require('../database/connection')

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

}

module.exports = new ReportController();