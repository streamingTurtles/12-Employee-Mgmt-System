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
    // console.log('connected as id ' + connection.threadId); // testing code
    // connection.end();  // testing code
    query_employee_db();  // inquirer function, Prompting questions in the console
});


// Prompt the user "what they want to do" when program starts
const query_employee_db = () => inquirer.prompt
    (
        [
            {
                type: 'list',
                name: 'action',
                message: 'Select what you would like to do:',
                choices: 
                [
                    'Add New Company Department',
                    'Add New Company Role',
                    'Add New Employee',
                    'View Company Departments',
                    'View Company Roles',
                    'View Company Employees',
                    'Update an Employees Role',
                    // Bonus questions to query
                    'Update an Employees Manager',
                    'View Employees by their Managers',
                    'Delete a Company Department', 
                    'Delete a Company Role', 
                    'Delete an Employee',
                    'EXIT the APPLICATION',    
                ],
            },
        ]
    ).then(answer => 
        {
            switch(answer.action)
            {
                case 'Add New Company Department': sqlQuery_1(); break; // ok, confirmed working
                case 'Add New Company Role': sqlQuery_2(); break;
                case 'Add New Employee': sqlQuery_3(); break;
                case 'View Company Departments': sqlQuery_4(); break;   // ok, confirmed working
                case 'View Company Roles': sqlQuery_5(); break; //  ok, confirmed working
                case 'View Company Employees': sqlQuery_6(); break; // ok, confirmed working
                case 'Update an Employees Role': sqlQuery_7(); break;
                // Bonus questions to query 
                case 'Update an Employees Manager': sqlQuery_8(); break;
                case 'View Employees by their Managers': sqlQuery_9(); break;
                case 'Delete a Company Department': sqlQuery_10(); break;
                case 'Delete a Company Role': sqlQuery_11(); break; // ok, confirmed working
                case 'Delete an Employee': sqlQuery_12(); break;
                case 'EXIT the APPLICATION': connection.end(); break;
            }
        }
);





// Add New Company Department
const sqlQuery_1 = () => {
    inquirer.prompt([
        {    
         type: 'input',
         name: 'companyDepartment',
         message: 'Please add a New Department to the Company'
        },
    ])
    .then(answer => 
        {
            connection.query(
                    `INSERT INTO department (name) VALUES (?)`,
                    answer.companyDepartment,
                    function(err, res)
                    {
                        if (err) throw err;
                        console.log(`You just added the following new Compnay Department ${answer.companyDepartment}`);
                        query_employee_db()
                    }
            );
        }
    );
};  






// View Company Departments
const sqlQuery_4 = () => {
    connection.query(`SELECT name FROM department`, function(err, res){       
    console.table(res);
    query_employee_db();
    });
};


// View Company Roles
const sqlQuery_5 = () => {
    connection.query(`SELECT title FROM role`, function(err, res){
    console.table(res);
    query_employee_db();
    });
};


// View Company Employees
const sqlQuery_6 = () => {
    connection.query(`SELECT first_name, last_name FROM employee`, function(err, res){
        console.table(res);
        query_employee_db();
    });
};







// Delete a Company Department
// const sqlQuery_1 = () => {
//     inquirer.prompt([
//         {    
//          type: 'input',
//          name: 'companyDepartment',
//          message: 'Please add a New Department to the Company'
//         },
//     ])
//     .then(answer => 
//         {
//             connection.query(
//                     `INSERT INTO department (name) VALUES (?)`,
//                     answer.companyDepartment,
//                     function(err, res)
//                     {
//                         if (err) throw err;
//                         console.log(`You just added the following new Compnay Department ${answer.companyDepartment}`);
//                         query_employee_db()
//                     }
//             );
//         }
//     );
// }; 