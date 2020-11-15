// REQUIREMENTS
const server = require('./server');
const get = require('./get');
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');

// MAIN ADD MENU
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
                    server.mainMenu();
                    break;
            }
        });
}

// ADD DEPARTMENT
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
            let query = server.connection.query("INSERT INTO department (name) VALUES (?)", [tempDepartment], function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added department ${tempDepartment}`)
                server.mainMenu();
            });
        });
}

// ADD ROLE
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
            choices: await get.getDepartments(false)
        }])
        .then(function (response) {

            let tempTitle = response.role;
            let tempSalary = response.salary;
            let tempDepartment = response.department;

            let query = server.connection.query("INSERT INTO role SET ?", { title: tempTitle, salary: response.salary, department_id: response.department }, function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added role ${tempTitle}, salary ${tempSalary}, department_id ${tempDepartment}`)
                server.mainMenu();
            });
        });
}

// ADD EMPLOYEE
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
            choices: await get.getRoles(false)
        },
        {
            type: "list",
            message: "Who is the EMPLOYEE's MANAGER?",
            name: "manager",
            choices: await get.getEmployees("None")
        }])
        .then(function (response) {

            let tempFirst = response.first;
            let tempLast = response.last;
            let tempRole = response.role;
            let tempManager = response.manager;

            let query = server.connection.query("INSERT INTO employee SET ?", { first_name: tempFirst, last_name: tempLast, role_id: tempRole, manager_id: tempManager }, function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Added employee ${tempFirst + " " + tempLast}, role_id ${tempRole}, manager_id ${tempManager}`)
                server.mainMenu();
            });
        });
}


exports.add = add;