const database = require('../database/connection')

class NotificationController{
    
    get(request,response){

        const {userId} = request.query

        var notificationGetAllDTO = {
            Notifications: {},
            TotalNotificationNotRead: 0
        }

        database.select("id as id" ,
                        "id_usuario as userId" ,
                        "mensagem as message" ,
                        "lido as read" ,
                        "data as date" ,
                        "excluido as deleted" ,
                        "id_relacionado as relatedId")
                .table("notificacao")
                .where({id_usuario: userId,excluido: false})
                .then(data => {
                    console.log(data);
                    notificationGetAllDTO.Notifications = (data);
                    notificationGetAllDTO.TotalNotificationNotRead = data.length;
                    response.json(notificationGetAllDTO);
                }).catch(error => {
                    console.log(error);
                })
    }

    read(request,response){
        const { id } = request.body;

        database.where({id: id})
                .update({
                    "lido": new Date()
                })
                .table("notificacao")
                .then(data => {
                    console.log(data)
                    response.json({message: "Notificação atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

    deleted(request,response){
        const { id } = request.body;

        database.where({id: id})
                .update({
                    "excluido": true
                })
                .table("notificacao")
                .then(data => {
                    console.log(data)
                    response.json({message: "Notificação atualizado com sucesso!"})
                }).catch(error => {
                    console.log(error);
                })
    }

}

module.exports = new NotificationController();