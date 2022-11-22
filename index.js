//Importing inquirer from 'inquirer'//
const inquirer = require("inquirer");
const fs = require('fs');
const createTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'ABCD1234',
        database: 'employees'
    },
    console.log(`Connected to the staff_db database.`)
);

// Create a Table
function createEmployee(employee) {
    const sql = `INSERT INTO employee SET ?`;

    db.query(sql, employee, (err, result) => {
        if (err) {
            console.error(err)
            return;
        }
    });
}

function queryRole() {
    const sql = `INSERT INTO  (role_id)
    VALUES (?)`;
    const params = [body.role_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success! Profile Updated.',
            data: body
        });
    });
}

function queryDepartment() {
    const sql = `INSERT INTO  (department_name)
    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success! Profile Updated.',
            data: body
        });
    });
}
// review actvity 5-12 in detail
// 1.setup your schema  - Done but need to check. 
//  a. setup foreign keys on employee for role_id and manager id, (look at activity 19 week 12) 
//  b. execute your schema in mysql console (mysql -u root -p)

// 2. setup your seeds - Done

// 3. test by doing a select * from employee; in mysql to check that your seeds are working - Done

// 4. create db connection (look at activity 11 week 12) add to top of index.js  - Done 

// 5. implement view employees
//    a. use activity 11 to use the db connection to make a query to get all employees
//    b. console log just as test, if you see all employees, remove the console log
//    c. read the documentation of console.table to render the resutls as a table.

//This would be similar to extract schema for 'Manager' Id & 'Add Employee'.

const showMenuPrompts = () => {
    //List of Questions for functionality. (Running server via Integrated Terminal: node index.js)
    //ACT 11 & ACT 28 (WK12 SQL Material)
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'purpose',
                message: 'Welcome! What would you like to do today?',
                choices: [
                    {
                        name: "View all Employees",
                        value: "view_all_employees"
                    },
                    {
                        name: "View all Roles",
                        value: "view_all_roles"
                    },
                    {
                        name: "Add new Employee",
                        value: "add_employee"
                    },



                    {
                        name: "View all Department",
                        value: "choiceC"
                    },
                    {//Seperator required
                        name: "Update Employee Role",
                        value: "choiceD"
                    },
                    {//Seperator required
                        name: "Add new Employee",
                        value: "choiceE"
                    },
                    {//Seperator required
                        name: "Add new Department",
                        value: "choiceF"
                    },
                    {//Seperator required
                        name: "Add Role",
                        value: "choiceG"
                    },
                    {
                        name: "Quit",
                        value: "quit"
                    },
                ]
                //Go through to check again to ensure that not all choices require a separator. 
                //Ensure that awaiting promise functions are aligned. 
            }
        ])
        .then(response => {
            // console.log(response)
            // console.log(response.purpose) - Shows the value of available choices (ChoicesA - ChoicesH) from the Main question. 
            switch (response.purpose) {
                case "view_all_employees":
                    viewEmployees();
                    break;
                case "view_all_roles":
                    viewRoles();
                    break;
                case "add_employee":
                    addEmployee();
                    break;

                case "choiceD":
                    updateEmployee();
                    break;

                case "choiceF":
                    addDepartment();
                    break;
                case "choiceG":
                    addRole();
                    break;
                case "quit":
                    quit();
                    break;

                default:
                    break;
            }
        });
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error(err)
            return;
        }
        console.table(results);
        showMenuPrompts();
    });
}

const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.error(err)
            return;
        }
        console.table(results);
        showMenuPrompts();
    });
}

const viewRoles = () => { //TO DO!! View roles 
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.error(err)
            return;
        }
        console.table(results);
    });
}

const updateEmployee = () => {//Updating employee prompt quesitons. Refer to Prompt inquirer. 
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employees Role do you want to update?',
                choices: ['John Doe', 'Mike Chan', 'Ashely Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
            },
            // Still need to update newly added staff into this choice with functions 
            // Note TO: Also needs to find the relevant syntax to store data from the questionares from the activities. 
            {
                type: 'list',
                name: 'updateRole',
                message: 'Which Role do you want to assign to the selected employee?',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
            }
        ]).then(() => {
            showMenuPrompts()
        })
}

const addEmployee = () => { //Adding new employee prompt quesitons.
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees First name?'
            },

            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees Last name?'
            }
        ])
        .then((results) => {
            const { first_name, last_name } = results;
            db.query('SELECT * FROM role', function (err, roles) {
                if (err) {
                    console.error(err)
                    return;
                }

                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'role_id',
                            message: "What is the employee's role?",
                            choices: roleChoices
                        }
                    ])
                    .then((result) => {
                        const { role_id } = result;
                        // for manager, query all employees 
                        // construct manageChoices
                        // ask a promp
                        const employee = {
                            first_name,
                            last_name,
                            role_id,
                            manager_id: true
                        };
                        createEmployee(employee);
                        showMenuPrompts();
                    });
            });
        })
}// * Note: Also needs to find the relevant syntax to store data from the questionares from the activities for add & update employee. 

const addManager = () => { //Need to Double check. 
        // TODO:
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: "What is the employer's name?",
                choices: managerChoices
            }
        ])
        .then(result => {
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "What is the manager's name?",
                    choices: managerChoices
                }
            ])
            .then((result) => {
                const { manager_id } = result;
                const manager = {
                    first_name,
                    last_name,
                    role_id,
                    manager_id: true   
                };
                createManager(manager);
                showMenuPrompts();
            })
        })
}

const addDepartment = () => { //Add new Department prompt quesitons.
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'promptfunction',
                message: 'What would you like to do?'
            },

            {
                type: 'input',
                name: 'DepartmentName',
                message: 'What is the name of the Department?'
            },
        ])
        .then(() => {
            showMenuPrompts()
        })
}// * Note: Also needs to find the relevant syntax to store data from the questionares from the activities for addDepartment. 

const addRole = () => { //Add new role prompt quesitons.
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'promptfunction',
                message: 'What would you like to do?'
            },

            {
                type: 'input',
                name: 'NamingRole',
                message: 'What is the name of the Role?'
            },

            {
                type: 'input',
                name: 'Salary',
                message: 'What is the Salary of the Role?'
            },

            {
                type: 'list',
                name: 'DepartmentType',
                message: 'Which Department does the Role belongs to?',
                choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service', 'Customer Service']
            }
        ])
        .then(() => {
            showMenuPrompts()
        })
}

const quitMenu = () => { //Occurs when Quiting Portal. 
    inquirer
        .prompt([
            {
                type: 'List',
                name: 'selectingQuit',
                message: 'Are you sure you want to quit?',
                choices: ['Yes', 'No']
            }
        ])
        .then(({ selectingQuit }) => {
            if (selectingQuit === 'Yes') {
                process.exit();

            } else {
                showMenuPrompts();
            }
        })
}
//Attempting to create an Async/Await function to ensure that the data will be rendered together. 
// async function sequalizeshowMenuPrompts() {
//     const showMenuPrompts = await fetchshowMenuPrompts("ABCD1234");
//     const updateEmployee = await fetchupdateEmployee("ABCD1234");
//     const addEmployee = await fectchaddEmployee("ABCD1234");
//     const addDepartment = await fetchaddDepartment("ABCD1234");
//     const addRole = await fetchaddRole("ABCD1234");
//     renderProfile(showMenuPrompts, updateEmployee, addEmployee, addDepartment, addRole);
// }

showMenuPrompts();