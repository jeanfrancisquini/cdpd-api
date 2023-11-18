const database = require('../../database/connection')

class DefStatusPlanController{
    
    post(request,response){
        const {description,discount} = request.body;

        database.insert({
                    "descricao":description,
                    "desconto":discount
                })
                .table("def_status_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Status do Plano criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description",
                        "desconto as discount")
                .table("def_status_plano").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description,discount} = request.body;

        database.where({id: id})
                .update({
                    "descricao": description,
                    "desconto":discount
                })
                .table("def_status_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Status do Plano atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query
        
        database.where({id: id})
                .del()
                .table("def_status_plano")
                .then(data => {
                    console.log(data)
                    response.json({message: "Status do Plano deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
}

module.exports = new DefStatusPlanController();