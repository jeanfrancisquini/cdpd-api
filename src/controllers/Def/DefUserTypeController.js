const database = require('../../database/connection')

class DefUserTypeController{
    
    post(request,response){
        const {description} = request.body;

        database.insert({
                    "descricao":description
                })
                .table("def_tipo_usuario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Tipo de usuário criado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    get(request,response){
        database.select("id",
                        "descricao as description")
                .table("def_tipo_usuario").then(data => {
                    console.log(data);
                    response.json(data);
                }).catch(error => {
                    console.log(error);
                })
    }

    put(request,response){
        const {id} = request.query
        const {description} = request.body;

        console.log(id);

        database.where({id: id})
                .update({
                    "descricao": description
                })
                .table("def_tipo_usuario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Tipo de usuário atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    delete(request,response){
        const {id} = request.query

        console.log(id);

        database.where({id: id})
                .del()
                .table("def_tipo_usuario")
                .then(data => {
                    console.log(data)
                    response.json({message: "Tipo de usuário deletado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }
    
    async spTeste(request,response){
        database.raw('exec stp_teste ?,?',[1,null])
        .then(data => {
            console.log(data);
            response.json(data);
        }).catch(error => {
            console.log(error);
        })
    }
}

module.exports = new DefUserTypeController();