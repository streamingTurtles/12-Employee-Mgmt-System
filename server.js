// get modules
const inquirer = require('inquirer');
const mysql = require('mysql');

// db connection settings for localhost
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysqlforme2912PAC!',
    database: 'employee_db',
});

// check db connection
connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.end();
  });
