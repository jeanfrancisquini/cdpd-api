const knex = require("knex")({
  client: "mssql",
  connection: {
    server: "cdpd-db-prod.c1qhsihaqmhn.us-east-2.rds.amazonaws.com,1433",
    user: "admin",
    password: "x5Cjy4fPe5IL5fh",
    database: "cdpd-database",
  },
  acquireConnectionTimeout: 60000, // 60 segundos, por exemplo
});

// const knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: "br1122.hostgator.com.br",
//     port: 3306,
//     user: "digi7412_jean",
//     password: "AliciaMiguel@@11282526",
//     database: "digi7412_cdpdDB"
//   }
// });

module.exports = knex;
