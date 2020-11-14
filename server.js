const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');
require("dotenv").config();

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employeeDB"
})

connection.connect(function (error) {
    if (error) console.log(`${logSymbols.error} ${error}`);
    console.log(`\n${logSymbols.success} Connected to employeeDB.`);
    console.log('  Starting program...\n');
    console.log(`8888                8                          `);
    console.log(`8www 8d8b.d8b. 88b. 8 .d8b. Yb  dP .d88b .d88b `);
    console.log(`8    8P Y8P Y8 8  8 8 8' .8  YbdP  8.dP' 8.dP' `);
    console.log(`8888 8   8   8 88P' 8 'Y8P'   dP   'Y88P 'Y88P `);
    console.log(`               8             dP                `);
    console.log(`   88888                8                      `);
    console.log(`     8   8d8b .d88 .d8b 8.dP .d88b 8d8b        `);
    console.log(`     8   8P   8  8 8    88b  8.dP' 8P          `);
    console.log(`     8   8    'Y88 'Y8P 8 Yb 'Y88P 8           `);
    mainMenu();
})

// Start Program
const mainMenu = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Please choose an ACTION to perform:",
            name: "action",
            choices: ["ADD", "VIEW", "UPDATE", "DELETE", "EXIT PROGRAM"]
        }])
        .then(function (response) {

            switch (response.action) {
                case "ADD":
                    add();
                    break;

                case "VIEW":
                    view();
                    break;

                case "UPDATE":
                    update();
                    break;

                case "DELETE":
                    remove();
                    break;

                case "EXIT PROGRAM":
                    process.exit();
            }
        });
}

// Add
const add = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to ADD?",
            name: "add",
            choices: ["EMPLOYEES", "ROLES", "DEPARTMENT", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch (response.add) {
                case "EMPLOYEES":
                    addEmployee();
                    break;

                case "ROLES":
                    addRole();
                    break;

                case "DEPARTMENT":
                    addDepartment();
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;
            }
        });
}

// Add Department
const addDepartment = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "input",
            message: "Which DEPARTMENT do you want to ADD?",
            name: "addDepartment",
            validate: value => value != "" ? true : logSymbols.warning + " Please enter a DEPARTMENT name!"
        }])
        .then(function (response) {
            let tempDepartment = response.addDepartment;
            let query = connection.query("INSERT INTO department (name) VALUES (?)", [tempDepartment], function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added department ${tempDepartment}`)
                mainMenu();
            });
        });
}

const addRole = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "input",
            message: "What ROLE TITLE you like to ADD?",
            name: "role",
            validate: value => value != "" ? true : logSymbols.warning + " Please enter a ROLE TITLE!"
        },
        {
            type: "input",
            message: "What is the ROLE SALARY?",
            name: "salary",
            validate: value => !isNaN(value) ? true : logSymbols.warning + " Please enter a valid ROLE SALARY!"
        },
        {
            type: "list",
            message: "What is the ROLE's DEPARTMENT?",
            name: "department",
            choices: await getDepartments(false)
        }])
        .then(function (response) {

            let tempTitle = response.role;
            let tempSalary = response.salary;
            let tempDepartment = response.department;

            let query = connection.query("INSERT INTO role SET ?", { title: tempTitle, salary: response.salary, department_id: response.department }, function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added role ${tempTitle}, salary ${tempSalary}, department_id ${tempDepartment}`)
                mainMenu();
            });
        });
}

const addEmployee = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "input",
            message: "What is your EMPLOYEE's FIRST NAME?",
            name: "first",
            validate: value => value != "" ? true : logSymbols.warning + " Please enter a FIRST NAME!"
        },
        {
            type: "input",
            message: "What is your EMPLOYEE's LAST NAME?",
            name: "last",
            validate: value => value != "" ? true : logSymbols.warning + " Please enter a LAST NAME!"
        },
        {
            type: "list",
            message: "What is the EMPLOYEE's ROLE?",
            name: "role",
            choices: await getRoles(false)
        },
        {
            type: "list",
            message: "Who is the EMPLOYEE's MANAGER?",
            name: "manager",
            choices: await getEmployees("None")
        }])
        .then(function (response) {

            let tempFirst = response.first;
            let tempLast = response.last;
            let tempRole = response.role;
            let tempManager = response.manager;

            let query = connection.query("INSERT INTO employee SET ?", { first_name: tempFirst, last_name: tempLast, role_id: tempRole, manager_id: tempManager }, function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added employee ${tempFirst + " " + tempLast}, role_id ${tempRole}, manager_id ${tempManager}`)
                mainMenu();
            });
        });
}

// View
const view = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to VIEW?",
            name: "view",
            choices: ["EMPLOYEES", "ROLES", "DEPARTMENTS", "BUDGET", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch (response.view) {
                case "EMPLOYEES":
                    viewEmployeesBy();
                    break;

                case "ROLES":
                    viewRoles();
                    break;

                case "DEPARTMENTS":
                    viewDepartments();
                    break;

                case "BUDGET":
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;
            }
        });
}

const viewEmployeesBy = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "VIEW EMPLOYEES by?",
            name: "employees",
            choices: ["ALL", "DEPARTMENT", "MANAGER", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch (response.employees) {
                case "ALL":
                    viewAllEmployees();
                    break;

                case "DEPARTMENT":
                    viewByDepartment();
                    break;

                case "MANAGER":
                    viewByManager();
                    break;

                case "RETURN TO MENU":
                    view();
                    break;
            }
        });
}

const viewAllEmployees = () => {

    console.log("")

    // Thanks AVI for the help with this query!
    connection.query("SELECT E1.id, E1.first_name AS 'first name', E1.last_name AS 'last name', R.title AS role, R.salary, (CONCAT(E2.first_name, ' ', E2.last_name)) AS manager FROM employee AS E1 LEFT JOIN employee AS E2 on E1.manager_id = E2.id LEFT JOIN role AS R ON E1.role_id = R.id;", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        mainMenu();
    });
}

const viewRoles = () => {

    console.log("")

    connection.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        mainMenu();
    });
}

const viewDepartments = () => {

    console.log("")

    connection.query("SELECT * FROM department", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        mainMenu();
    });
}

const viewByDepartment = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which DEPARTMENT do you want to VIEW?",
            name: "whichDepartment",
            choices: await getDepartments
        }])
        .then(function (response) {

            let query = connection.query("SELECT * FROM employee WHERE ?", [{ id: response.whichDepartment }], function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.table(response);
                mainMenu();
            });
        });
}

async function getDepartments(addCancel) {
    return new Promise((success, failure) => {

        let query = connection.query("SELECT * FROM department", function (error, response) {
            if (error) console.log(`${logSymbols.error} ${error}`);
            let returnarray = [];
            response.forEach(department => { returnarray.push({ name: department.name, value: department.id }) })
            if (addCancel) {
                returnarray.push({ name: `${logSymbols.error} Cancel`, value: null })
            }
            success(returnarray);
        });
    })
}

async function getRoles(addCancel) {
    return new Promise((success, failure) => {

        let query = connection.query("SELECT * FROM role", function (error, response) {
            if (error) console.log(`${logSymbols.error} ${error}`);
            let returnarray = [];
            response.forEach(role => { returnarray.push({ name: role.title, value: role.id }) })
            if (addCancel) {
                returnarray.push({ name: `${logSymbols.error} Cancel`, value: null })
            }
            success(returnarray);
        });
    })
}

async function getEmployees(addCancel) {
    return new Promise((success, failure) => {

        let query = connection.query("SELECT * FROM employee", function (error, response) {
            if (error) console.log(`${logSymbols.error} ${error}`);
            let returnarray = [];
            response.forEach(emp => { returnarray.push({ name: (emp.first_name + " " + emp.last_name), value: emp.id }) })
            if (addCancel) {
                if (addCancel != true) {
                    returnarray.push({ name: `${logSymbols.error} ${addCancel}`, value: null })
                }
                else {
                    returnarray.push({ name: `${logSymbols.error} Cancel`, value: null })
                }
            }
            success(returnarray);
        });
    })
}

const viewByManager = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which MANAGER do you want to VIEW?",
            name: "whichManager",
            choices: await getManagers
        }])
        .then(function (response) {

            console.log(response);
        });
}

async function getManagers() {
    return new Promise((success, failure) => {

        let query = connection.query("SELECT DISTINCT E1.manager_id, CONCAT(E2.first_name, ' ', E2.last_name) AS manager FROM employee AS E1 JOIN employee AS E2 ON E1.manager_id = E2.id WHERE E1.manager_id IS NOT NULL;", function (error, response) {
            if (error) console.log(`${logSymbols.error} ${error}`);
            let returnarray = [];
            response.forEach(manager => { returnarray.push({ name: manager.manager, value: manager.id }) })
            success(returnarray);
        });
    })
}

// Update
const update = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to UPDATE?",
            name: "update",
            choices: ["ROLES", "MANAGERS", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch (response.update) {
                case "ROLES":
                    updateRole();
                    break;

                case "MANAGERS":
                    updateManager();
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;
            }
        });
}

const updateRole = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to UPDATE?",
            name: "whichEmployee",
            choices: await getEmployees(false)
        },
        {
            type: "list",
            message: "Which ROLE do you want to change to?",
            name: "whichRole",
            choices: await getRoles(true)
        }])
        .then(async function (response) {

            let tempEmployee = response.whichEmployee;
            let tempRole = response.whichRole;

            if (tempRole != null) {
                let query = connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: tempRole }, { id: tempEmployee }], function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Updated employee ${tempEmployee}`)
                    mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Role Selected`);
                mainMenu();
            }
        });
}

const updateManager = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to UPDATE?",
            name: "whichEmployee",
            choices: await getEmployees(false)
        },
        {
            type: "list",
            message: "Which MANAGER do you want to change to?",
            name: "whichManager",
            choices: await getEmployees("None")
        }])
        .then(async function (response) {

            let tempEmployee = response.whichEmployee;
            let tempManager = response.whichManager;
            
            let query = connection.query("UPDATE employee SET ? WHERE ?", [{ manager_id: tempManager }, { id: tempEmployee }], function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Updated employee ${tempEmployee}`)
                mainMenu();
            });

        });
}

// Delete
const remove = () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to DELETE?",
            name: "delete",
            choices: ["EMPLOYEES", "ROLES", "DEPARTMENTS", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch (response.delete) {
                case "EMPLOYEES":
                    deleteEmployee();
                    break;

                case "ROLES":
                    deleteRole();
                    break;

                case "DEPARTMENTS":
                    deleteDepartment();
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;
            }
        });
}

const deleteEmployee = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to DELETE?",
            name: "whichEmployee",
            choices: await getEmployees(true)
        }])
        .then(function (response) {

            let tempEmployee = response.whichEmployee;

            if (tempEmployee != null) {
                let query = connection.query("DELETE FROM employee WHERE id=?", tempEmployee, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed employee ${tempEmployee}`)
                    mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Employee Selected`);
                mainMenu();
            }

        });
}

const deleteDepartment = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which DEPARTMENT do you want to DELETE?",
            name: "whichDepartment",
            choices: await getDepartments
        }])
        .then(function (response) {

            let tempDepartment = response.whichDepartment;

            if (tempDepartment != null) {
                let query = connection.query("DELETE FROM department WHERE id=?", tempDepartment, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed department ${tempDepartment}`)
                    mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Department Selected`);
                mainMenu();
            }
        });
}

const deleteRole = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which ROLE do you want to DELETE?",
            name: "whichRole",
            choices: await getRoles
        }])
        .then(function (response) {

            let tempRole = response.whichRole;

            if (tempRole != null) {
                let query = connection.query("DELETE FROM role WHERE id=?", tempRole, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed role ${tempRole}`)
                    mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Role Selected`);
                mainMenu();
            }
        });
}