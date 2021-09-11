var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: 'xxx',
    database: 'datawarehouse'
})

module.exports = connection;