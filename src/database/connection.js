
const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: "cdpd-db.c1qhsihaqmhn.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "x5Cjy4fPe5IL5fh",
    database: "cdpd-database"    
  }
});

module.exports = knex