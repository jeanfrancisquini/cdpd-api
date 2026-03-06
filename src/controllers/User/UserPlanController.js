const database = require("../../database/connection");

class UserPlanController {
  post(request, response) {
    const {
      idPlan,
      idUser,
      idStatusPlan,
      segunda,
      terca,
      quarta,
      quinta,
      sexta,
      sabado,
    } = request.body;

    console.log(request.body);

    database
      .insert({
        id_plano: idPlan,
        id_usuario: idUser,
        id_status_plano: idStatusPlan,
        segunda: segunda,
        terca: terca,
        quarta: quarta,
        quinta: quinta,
        sexta: sexta,
        sabado: sabado,
      })
      .table("usuario_plano")
      .then((data) => {
        console.log(data);
        response.json({ message: "Plano de usuário criado com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  get(request, response) {
    database
      .select(
        "id",
        "id_plano as idPlan",
        "id_usuario as idUser",
        "id_status_plano as idStatusPlan",
        "segunda as segunda",
        "terca as terca",
        "quarta as quarta",
        "quinta as quinta",
        "sexta as sexta",
        "sabado as sabado",
      )
      .table("usuario_plano")
      .then((data) => {
        console.log(data);
        response.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  put(request, response) {
    const userPlan = request.body;

    console.log(userPlan);
    if (Object.keys(userPlan).length !== 0)
      userPlan.map((obj) => {
        console.log("Aqui", obj);
        const {
          id,
          idPlan,
          idUser,
          idStatusPlan,
          segunda,
          terca,
          quarta,
          quinta,
          sexta,
          sabado,
        } = obj;

        database
          .where({ id_usuario: idUser ?? 0 })
          .del()
          .table("usuario_plano")
          .then((data) => {
            database
              .insert({
                id_plano: idPlan,
                id_usuario: idUser,
                id_status_plano: idStatusPlan,
                segunda: segunda,
                terca: terca,
                quarta: quarta,
                quinta: quinta,
                sexta: sexta,
                sabado: sabado,
              })
              .table("usuario_plano")
              .then((dt) => {
                //console.log("Insert",idPlan)
                //response.json({message: "Plano de usuário criado com sucesso!"})
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });

    response.json({ message: "Plano de usuário atualizado com sucesso!" });
  }

  delete(request, response) {
    const { id } = request.query;

    console.log(id);

    database
      .where({ id: id })
      .del()
      .table("usuario_plano")
      .then((data) => {
        console.log(data);
        response.json({ message: "Plano de usuário deletado com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new UserPlanController();
