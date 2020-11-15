// REQUIREMENTS
const server = require('./server');
const get = require('./get');
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');

// MAIN VIEW MENU
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
                    viewBudget();
                    break;

                case "RETURN TO MENU":
                    server.mainMenu();
                    break;
            }
        });
}

// VIEW EMPLOYEES BY MENU
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
                    server.mainMenu();
                    break;
            }
        });
}

// VIEW ALL EMPLOYEES
const viewAllEmployees = () => {

    console.log("")

    // Thanks AVI for the help with this query!
    server.connection.query("SELECT E1.id, E1.first_name AS 'first name', E1.last_name AS 'last name', R.title AS role, R.salary, (CONCAT(E2.first_name, ' ', E2.last_name)) AS manager FROM employee AS E1 LEFT JOIN employee AS E2 on E1.manager_id = E2.id LEFT JOIN role AS R ON E1.role_id = R.id;", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        server.mainMenu();
    });
}

// VIEW BY DEPARTMENT
const viewByDepartment = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which DEPARTMENT do you want to VIEW?",
            name: "whichDepartment",
            choices: await get.getDepartments
        }])
        .then(function (response) {

            if (response.whichDepartment != null) {
                let query = server.connection.query("SELECT E1.id, E1.first_name, E1.last_name, R.title AS role, R.salary, (CONCAT(E2.first_name, ' ', E2.last_name)) AS manager\
                FROM employee AS E1\
                LEFT JOIN employee AS E2 on E1.manager_id = E2.id\
                LEFT JOIN role AS R ON E1.role_id = R.id\
                WHERE R.title IN (SELECT title FROM role WHERE department_id=?)", [response.whichDepartment], function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.table(response);
                    server.mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Department Selected`);
                server.mainMenu();
            }

        });
}

// VIEW BY MANAGER
const viewByManager = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which MANAGER do you want to VIEW?",
            name: "whichManager",
            choices: await get.getManagers(true)
        }])
        .then(function (response) {

            if (response.whichManager != null) {
                server.connection.query("SELECT E1.id, E1.first_name AS 'first name', E1.last_name AS 'last name', R.title AS role, R.salary\
                FROM employee AS E1 \
                LEFT JOIN employee AS E2 on E1.manager_id = E2.id \
                LEFT JOIN role AS R ON E1.role_id = R.id\
                WHERE E1.manager_id=?", response.whichManager, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.table(response);
                    server.mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Manager Selected`);
                server.mainMenu();
            }
        });
}

// VIEW ROLES
const viewRoles = () => {

    console.log("")

    server.connection.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        server.mainMenu();
    });
}

// VIEW DEPARTMENTS
const viewDepartments = () => {

    console.log("")

    server.connection.query("SELECT * FROM department", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        server.mainMenu();
    });
}

// VIEW BUDGET
const viewBudget = () => {

    console.log("")

    server.connection.query("SELECT  D2.id, D2.name, SUM(R.salary) AS budget\
    FROM employee AS E1\
    LEFT JOIN role AS R ON E1.role_id = R.id\
    LEFT JOIN department AS D2 on R.department_id = D2.id\
    WHERE R.title IN (SELECT title FROM role)\
    GROUP BY D2.id", function (error, response) {
        if (error) console.log(`${logSymbols.error} ${error}`);
        console.table(response);
        server.mainMenu();
    });
}

// EXPORTS
exports.view = view;