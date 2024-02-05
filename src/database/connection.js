
const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: "cdpd-db.c1qhsihaqmhn.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "x5Cjy4fPe5IL5fh",
    database: "cdpd-database"    
  }
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

module.exports = knex