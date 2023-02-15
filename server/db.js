const Pool = require("pg").Pool;

const pool = new Pool({
  user: "andreilee",
  host: "localhost",
  port: 5432,
  database: "slushdb",
});

module.exports = pool;
