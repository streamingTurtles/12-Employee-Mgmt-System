// get modules
const inquirer = require('inquirer');
const mysql = require('mysql');
const appName = require('asciiart-logo');
require('console.table');
const dotenv = require('dotenv').config();


// db connection settings for localhost
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // password: 'xxxx',  // removed my password, in the .env living in gitignore
    password: process.env.PASSWORD,   
    database: 'employee_db',    
});



// check db connection
connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId); // testing the connection
    // connection.end();  // testing code
    query_employee_db();  // inquirer function, Prompting questions in the console
});



// Diplays Title of the application
function init(){
    const appTitle = appName({ name: "HW 12: Employee Management System" }).render();  
    console.log(appTitle);      
  }
init();






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
                    'View Employee Role_id & Manager_id',
                    'Update an Employees Role ID#',
                    // Bonus questions to query
                    // 'Update an Employees Manager',  // not implemented - future
                    // 'View Employees by their Managers',  // not implemented - future
                    'Delete a Company Department', 
                    'Delete a Company Role', 
                    // 'Delete an Employee',  // not implemented - future
                    'EXIT the APPLICATION',    
                ],
            },
        ]
    ).then(answer => 
        {
            switch(answer.action)
            {
                case 'Add New Company Department': sqlQuery_1(); break; // ok, confirmed working
                case 'Add New Company Role': sqlQuery_2(); break; // ok, confirmed working
                case 'Add New Employee': sqlQuery_3(); break; // ok, confirmed working
                case 'View Company Departments': sqlQuery_4(); break;   // ok, confirmed working
                case 'View Company Roles': sqlQuery_5(); break; //  ok, confirmed working
                case 'View Company Employees': sqlQuery_6(); break; // ok, confirmed working
                case 'View Employee Role_id & Manager_id': sqlQuery_61(); break; // ok, confirmed working - BONUS addition, shows employees by managers
                case 'Update an Employees Role ID#': sqlQuery_7(); break; // ok, confirmed working
                // Bonus questions to query 
                case 'Update an Employees Manager': sqlQuery_8(); break;
                case 'View Employees by their Managers': sqlQuery_9(); break;
                case 'Delete a Company Department': sqlQuery_10(); break; // ok, confirmed working - BONUS
                case 'Delete a Company Role': sqlQuery_11(); break; // ok, confirmed working - BONUS 
                case 'Delete an Employee': sqlQuery_12(); break;
                case 'EXIT the APPLICATION': connection.end(); break; // ok, confirmed working - BONUS
            }
        }
);






// *********************************************************************** //
// *********************************************************************** //
// ADDING - To the employee_db CONTENTS:
// *********************************************************************** //
// *********************************************************************** //
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
// Add New Company Role
const sqlQuery_2 = () => {
    inquirer.prompt([
        {    
         type: 'input',
         name: 'NewCompanyRole',
         message: 'Please add a New ROLE to the Company'
        },
    ])
    .then(answer => 
        {
            connection.query(
                    `INSERT INTO role (title) VALUES (?)`,
                    answer.NewCompanyRole,
                    function(err, res)
                    {
                        if (err) throw err;
                        console.log(`You just added the following new Compnay ROLE ${answer.NewCompanyRole}`);
                        query_employee_db()
                    }
            );
        }
    );
};
// Add a New Employee, their role and reporting Manager ID
const sqlQuery_3 = () => {
    inquirer
    .prompt([
      {
        message: 'Please enter employee\'s First Name:',
        type: 'input',
        name: 'first_name',
      },
      {
        message: 'Please enter employee\'s Lase Name:',
        type: 'input',
        name: 'last_name',
      },
      {
        message: 'Please enter employe\'s role ID, enter a number:',
        type: 'input',
        name: 'role_id',
      },
      {
        message: 'Please enter the employe\'s title:',
        type: 'input',
        name: 'title',
      },
      {
        message: 'Please enter employe\'s Manager\'s ID number:',
        type: 'input',
        name: 'manager_id',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function(err, res) {
          if (err) throw err;
          console.log(
            `You have added to the database a new employee:\n ${answer.first_name} ${answer.last_name}\n Role ID #: ${answer.role_id}\n Reports to Manager ID #: ${answer.manager_id}`
          );
          query_employee_db()
        }
      );
    });
}    
// *********************************************************************** //
// *********************************************************************** //











// *********************************************************************** //
// *********************************************************************** //
// VIEWING - the employee_db CONTENTS:
// *********************************************************************** //
// *********************************************************************** //
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

// View Employees Role_id & Manager_id
const sqlQuery_61 = () => { 
    connection.query(`SELECT * FROM employee`, function(err, res){             
    console.table(res);
    query_employee_db();
    });
};
// *********************************************************************** //
// *********************************************************************** //















// *********************************************************************** //
// *********************************************************************** //
// DELETING - from employee_db CONTENTS:
// *********************************************************************** //
// *********************************************************************** //
// Current Array contents of the Company table, Department 
// query the current Department & put in an array
// used to select from to Delete a Department in the company
// needs to go here to address asynchronous connecton.query method
// actual delete from the Department table is in the next function
const depts = () =>  {
    const currentDeptList = [];
    return new Promise (function(resolve,reject){
        
        connection.query(
            `SELECT CONCAT (department.name) as department FROM employee_db.department`,
             (err, res) =>{
                 if (err) reject (err);

                 for (let i=0; i < res.length; i++){
                     currentDeptList.push(res[i].department)
                    //  console.log('currentDepList contains: ', currentDeptList);
                 }
                 resolve(currentDeptList);
                //  console.log('currentDepList contains: ', currentDeptList);
                //  console.table(currentDeptList);
             }   
        )
    })  
}
// Delete a Company department
const sqlQuery_10 = async () => {
    const currentDeptList = await depts();
    inquirer.prompt([
        {    
         type: 'list',
         name: 'companyDepartment',
         message: 'Please Select the Department you will be deleting',
        //  choices: function(name){ return currentDeptList},
        choices: currentDeptList,
        },
    ])
    .then(answer => 
        {
            connection.query(
                    `DELETE FROM department WHERE (name) = (?)`,
                    answer.companyDepartment,
                    function(err, res)
                    {
                        if (err) throw err;
                        console.log(`You just DELETED the following new Compnay Department ${answer.companyDepartment}`);
                        query_employee_db()
                    }
            );
        }
    );    
}; 
//
// Current Array contents of the Company table, role 
// query the current Role & put in an array
// used to select from to Delete a role in the company
// needs to go here to address asynchronous connecton.query method
// actual delete from the role table is in the next function
const roles = () =>  {
    const currentRoleList = [];
    return new Promise (function(resolve,reject){
        
        connection.query(
            `SELECT CONCAT (role.title) as role FROM employee_db.role`,
             (err, res) =>{
                 if (err) reject (err);
                 for (let i=0; i < res.length; i++){
                     currentRoleList.push(res[i].role)
                 }
                 resolve(currentRoleList);
                //  console.log(currentRoleList); // testing
             }   
        )
    })
  
}
// Delete a Company Role
const sqlQuery_11 = async () => {
    const currentRoleList = await roles();
    inquirer.prompt([
        {    
         type: 'list',
         name: 'companyRole',
         message: 'Please Select the Department you will be deleting',
         choices: currentRoleList,
        },
    ])
    .then(answer => 
        {
            connection.query(
                    `DELETE FROM role WHERE (title) = (?)`,
                    answer.companyRole,
                    function(err, res)
                    {
                        if (err) throw err;
                        console.log(`You just DELETED the following new Compnay Department ${answer.companyRole}`);
                        query_employee_db()
                    }
            );
        }
    );    
}; 
// *********************************************************************** //
// *********************************************************************** //












// *********************************************************************** //
// *********************************************************************** //
// UPDATES - to employee_db CONTENTS:
// *********************************************************************** //
// *********************************************************************** //
// 1st create array of current employee's for use to present as the list of employees
// from which to select to update their role_id
// This array is used to select the employee who's role_id is being updated.
// We need to concantenate the first & last name to uniquely identify the employee.
// We need to return the resulting array as a promise to address the asynchronous
// behavior of when prompting the question in the inqirer.prompt() function.
const roleIDNumber = () =>  {
    const currentEMP = [];
    return new Promise (function(resolve,reject){        
        connection.query(
            `SELECT CONCAT (employee.first_name, ' ', employee.last_name) AS first_last_name FROM employee_db.employee`,
             (err, res) =>{
                 if (err) reject (err);
                 for (let i=0; i < res.length; i++){
                     currentEMP.push(res[i].first_last_name)
                 }
                 resolve(currentEMP);
                //  console.log(currentEMP);  // I get the array, 
             }   
        )
    })
  
}
// Select from the employee list created above to update their role_id & title
const sqlQuery_7 = async () => {
    const currentEMP = await roleIDNumber();
    inquirer.prompt([
        {    
         type: 'list',
         name: 'employee_full_Name', // this is the array from the await
         message: 'Please Select the Employee you want to update their Role ID #',
         choices:  currentEMP,  
        },
        {
         type: 'input',
         name: 'role_id',  
         message: "Note: after you have entered an ID, You can view the update by selecting the: \n \"View Employee Role_id & Manager_id\"  \n Now enter a number beween 1-100 to UPDATE the Employee role_id"   
        },
    ])
    .then(answer => 
        {  
            // console.log(answer.employee_full_Name); // testing
            const pass = answer.employee_full_Name;
            // console.log(pass); // testing 
            const arr2 = pass.split(" ")
            // console.log(arr2);  // testing to confirm the split
            // const nameSplit = answer.employee_full_name.split(' '); // split so I can identify in the query
            // console.log(nameSplit);
            // console.log(nameSplit); // testing
            connection.query(
                    `UPDATE employee SET role_id = '${answer.role_id}' WHERE first_name= '${arr2[0]}' AND last_name= '${arr2[1]}';`, 
                    // `UPDATE employee SET role_id = 919 WHERE first_name='EMPTY' AND last_name='Suit';`,
                    function(err, res)
                    {
                        if (err) throw err;
                        // console.log(`You just updated ${xyz} Role_ID # to: ${n}`);
                        query_employee_db()
                    }
            );
        }
    );    
    // console.log('hi there') // testing
}; 

// *********************************************************************** //
// *********************************************************************** //