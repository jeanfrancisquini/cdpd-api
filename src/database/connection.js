
const knex = require('knex')({
  client: 'mssql',
  connection: {
    host: "cdpd-db.c1qhsihaqmhn.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "x5Cjy4fPe5IL5fh",
    database: "cdpd-database",
    /*options: {
      mapBinding: value => {
        // bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.VarChar,
            value: value
          };
        }

        // allow devs to pass tedious type at query time
        if (value != null && value.type) {
          return {
            type: value.type,
            value: value.value
          };
        }

        // undefined is returned; falling back to default mapping function
      }
    }*/
  }
});

module.exports = knex