const database = require("../../database/connection");
const moment = require("moment");
class UserController {
  post(request, response) {
    const {
      name,
      email,
      userName,
      password,
      bornDate,
      userTypeId,
      telephone,
      registrationDate,
      exitDate,
      obs,
      sex,
      externalKey,
    } = request.body;

    database
      .insert({
        nome: name,
        email: email,
        usuario: userName,
        senha: password,
        data_nascimento: bornDate,
        id_tipo_usuario: userTypeId,
        telefone: telephone,
        data_cadastro: registrationDate,
        data_saida: exitDate,
        obs: obs,
        sexo: sex,
        chave_externa: externalKey,
      })
      .table("usuario")
      .returning("id")
      .then((data) => {
        console.log(data);
        response.json({
          id: data[0].id,
          message: "Usuário criado com sucesso!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async get(request, response) {
    var atributo1, atributo2, atributo3, atributo4;

    atributo1 = await database
      .select(
        "id",
        "nome as name",
        "email as email",
        "usuario as userName",
        "senha as password",
        "data_nascimento as bornDate",
        "id_tipo_usuario as userTypeId",
        "telefone as telephone",
        "data_cadastro as registrationDate",
        "data_saida as exitDate",
        "obs as obs",
        "sexo as sex",
        "chave_externa as externalKey"
      )
      .table("usuario")
      .whereNotIn("id_tipo_usuario", [6, 7]);

    var resultsPromise = atributo1.map(async (obj) => {
      atributo2 = await database
        .select(
          "id",
          "id_plano as idPlan",
          "id_usuario as idUser",
          "id_status_plano as idStatusPlan",
          "segunda as segunda",
          "terca as terca",
          "quarta as quarta",
          "quinta as quinta",
          "sexta as sexta"
        )
        .table("usuario_plano")
        .where({ id_usuario: obj.id });

      var results2Promise = atributo2.map(async (obj2) => {
        atributo3 = await database
          .select(
            "id",
            "descricao as description",
            "frequencia as frequency",
            "id_tipo_pagamento as idTypePayment",
            "preco as price",
            "id_atividade as idActivity",
            "id_periodo as idPeriod",
            "valor_proporcional as valorProporcional"
          )
          .table("def_plano")
          .where({ id: obj2.idPlan });

        obj2.defPlans = atributo3[0];

        atributo4 = await database
          .select("id", "descricao as description", "desconto as discount")
          .table("def_status_plano")
          .where({ id: obj2.idStatusPlan });

        obj2.defStatusPlans = atributo4[0];

        return obj2;
      });

      atributo2 = await Promise.all(results2Promise);

      obj.userPlans = atributo2;

      return obj;
    });

    response.json(await Promise.all(resultsPromise));
  }

  put(request, response) {
    //const {id} = request.query
    const {
      id,
      name,
      email,
      userName,
      password,
      bornDate,
      userTypeId,
      telephone,
      registrationDate,
      exitDate,
      obs,
      sex,
      externalKey,
    } = request.body;

    console.log(id);

    database
      .where({ id: id })
      .update({
        nome: name,
        email: email,
        usuario: userName,
        senha: password,
        data_nascimento: bornDate,
        id_tipo_usuario: userTypeId,
        telefone: telephone,
        data_cadastro: registrationDate,
        data_saida: exitDate,
        obs: obs,
        sexo: sex,
        chave_externa: externalKey,
      })
      .table("usuario")
      .then((data) => {
        console.log(data);
        response.json({ message: "Usuário atualizado com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delete(request, response) {
    const { id } = request.query;

    console.log(id);

    database
      .where({ id: id })
      .del()
      .table("usuario")
      .then((data) => {
        console.log(data);
        response.json({ message: "Usuário deletado com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getLogin(request, response) {
    database
      .raw("exec stp_job_checkout_automatico_depois_90", [])
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    database
      .raw("exec stp_job_controle_diario_nao_preenchido", [])
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    const { usuario, senha } = request.body;
    database
      .select(
        "id",
        "nome as name",
        "email as email",
        "usuario as userName",
        "senha as password",
        "data_nascimento as bornDate",
        "id_tipo_usuario as userTypeId",
        "telefone as telephone",
        "data_cadastro as registrationDate",
        "data_saida as exitDate",
        "obs as obs",
        "sexo as sex",
        "chave_externa as externalKey"
      )
      .table("usuario")
      .where({ usuario: usuario, senha: senha })
      .then((data) => {
        console.log(data);

        if (data && data.length > 0) {
          response.json(data[0]);
        } else {
          response.status(500).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getUser(request, response) {
    const { id } = request.query;

    var atributo1, atributo2, atributo3, atributo4;

    atributo1 = await database
      .select(
        "id",
        "nome as name",
        "email as email",
        "usuario as userName",
        "senha as password",
        "data_nascimento as bornDate",
        "id_tipo_usuario as userTypeId",
        "telefone as telephone",
        "data_cadastro as registrationDate",
        "data_saida as exitDate",
        "obs as obs",
        "sexo as sex",
        "chave_externa as externalKey"
      )
      .table("usuario")
      .where({ id: id })
      .whereNotIn("id_tipo_usuario", [6, 7]);

    var resultsPromise = atributo1.map(async (obj) => {
      atributo2 = await database
        .select(
          "id",
          "id_plano as idPlan",
          "id_usuario as idUser",
          "id_status_plano as idStatusPlan",
          "segunda as segunda",
          "terca as terca",
          "quarta as quarta",
          "quinta as quinta",
          "sexta as sexta"
        )
        .table("usuario_plano")
        .where({ id_usuario: obj.id });

      var results2Promise = atributo2.map(async (obj2) => {
        atributo3 = await database
          .select(
            "id",
            "descricao as description",
            "frequencia as frequency",
            "id_tipo_pagamento as idTypePayment",
            "preco as price",
            "id_atividade as idActivity",
            "id_periodo as idPeriod",
            "valor_proporcional as valorProporcional"
          )
          .table("def_plano")
          .where({ id: obj2.idPlan });

        obj2.defPlans = atributo3[0];

        atributo4 = await database
          .select("id", "descricao as description", "desconto as discount")
          .table("def_status_plano")
          .where({ id: obj2.idStatusPlan });

        obj2.defStatusPlans = atributo4[0];

        return obj2;
      });

      atributo2 = await Promise.all(results2Promise);

      obj.userPlans = atributo2;

      return obj;
    });

    response.json((await Promise.all(resultsPromise))[0]);
  }

  UserDelete(request, response) {
    const { id } = request.query;

    database
      .raw("exec stp_cdpd_delete_usuario ?", [id])
      .then((data) => {
        console.log(data);
        response.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GetDashboard(request, response) {
    const { id } = request.query;

    database
      .raw("exec stp_dashboard ?", [id])
      .then((data) => {
        console.log(data);
        var teste = data[0];
        teste.horario = moment(teste.horario).format("HH:mm:ss");
        response.json(teste);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GetDashboardRemoto(request, response) {
    const { id } = request.query;

    database
      .raw("exec stp_dashboard_remoto ?", [id])
      .then((data) => {
        response.json(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ResetPassword(request, response) {
    //const {id} = request.query
    const { userName, bornDate, newPassword } = request.body;

    database
      .select("id")
      .table("usuario")
      .where({ usuario: userName, data_nascimento: bornDate })
      .then((data) => {
        database
          .where({ id: data.id })
          .update({
            senha: newPassword,
          })
          .table("usuario")
          .then((data) => {
            console.log(data);
            response.json({ message: "Usuário atualizado com sucesso!" });
          })
          .catch((error) => {
            console.log(error);
          });
        response.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new UserController();
