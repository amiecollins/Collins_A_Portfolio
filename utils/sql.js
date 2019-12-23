const config = require("../config");
const mysql = require("mysql");

var connect = mysql.createPool({
    connectionLimit : 10,
    queueLimit      : 100,
    waitForConnections: true,
    host            : config.host,
    port            : config.port,
    user            : config.uname,
    password        : config.upass,
    database        : config.db
});

module.exports = connect;