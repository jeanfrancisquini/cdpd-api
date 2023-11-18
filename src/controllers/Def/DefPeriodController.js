const database = require('../../database/connection')

class DefPeriodController{
    
    post(request,response){
        const {description,recurrence} = request.body;

        database.insert({
                    "descricao":description,
                    "recorrencia":recurrence
                })
                .table("def_periodo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Periodo criada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description",
                        "recorrencia as recurrence")
                .table("def_periodo").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description,recurrence} = request.body;

        database.where({id: id})
                .update({
                    "descricao": description,
                    "recorrencia":recurrence
                })
                .table("def_periodo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Periodo atualizada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query
        
        database.where({id: id})
                .del()
                .table("def_periodo")
                .then(data => {
                    console.log(data)
                    response.json({message: "Periodo deletada com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new DefPeriodController();