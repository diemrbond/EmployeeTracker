// REQUIREMENTS
const server = require('../server');
const get = require('./get');
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');

// MAIN DELETE FUNCTION
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
                    server.mainMenu();
                    break;
            }
        });
}

// DELETE EMPLOYEE
const deleteEmployee = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to DELETE?",
            name: "whichEmployee",
            choices: await get.getEmployees(true)
        },
        {
            type: "confirm",
            message: "Are you sure you want to DELETE this EMPLOYEE?",
            name: "confirm",
            default: false,
            when: (answers) => answers.whichEmployee != null
        }])
        .then(function (response) {
            
            let tempEmployee = response.whichEmployee;

            if ((tempEmployee != null) && (response.confirm)) {
                let query = server.connection.query("DELETE FROM employee WHERE id=?", tempEmployee, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed employee ${tempEmployee}`)
                    server.mainMenu();
                });
            }
            else if (!response.confirm){
                console.log(`${logSymbols.error} Employee NOT Deleted`);
                server.mainMenu();
            }
            else {
                console.log(`${logSymbols.error} No Employee Selected`);
                server.mainMenu();
            }

        });
}

// DELETE DEPARTMENT
const deleteDepartment = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which DEPARTMENT do you want to DELETE?",
            name: "whichDepartment",
            choices: await get.getDepartments
        },
        {
            type: "confirm",
            message: "Are you sure you want to DELETE this DEPARTMENT?",
            name: "confirm",
            default: false,
            when: (answers) => answers.whichDepartment != null
        }])
        .then(function (response) {

            let tempDepartment = response.whichDepartment;

            if ((tempDepartment != null) && (response.confirm)) {
                let query = server.connection.query("DELETE FROM department WHERE id=?", tempDepartment, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed department ${tempDepartment}`)
                    server.mainMenu();
                });
            }
            else if (!response.confirm){
                console.log(`${logSymbols.error} Department NOT Deleted`);
                server.mainMenu();
            }
            else {
                console.log(`${logSymbols.error} No Department Selected`);
                server.mainMenu();
            }
        });
}

// DELETE ROLE
const deleteRole = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which ROLE do you want to DELETE?",
            name: "whichRole",
            choices: await get.getRoles
        },
        {
            type: "confirm",
            message: "Are you sure you want to DELETE this ROLE?",
            name: "confirm",
            default: false,
            when: (answers) => answers.whichRole != null
        }])
        .then(function (response) {

            let tempRole = response.whichRole;

            if ((tempRole != null) && (response.confirm)) {
                let query = server.connection.query("DELETE FROM role WHERE id=?", tempRole, function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Removed role ${tempRole}`)
                    server.mainMenu();
                });
            }
            else if (!response.confirm){
                console.log(`${logSymbols.error} Role NOT Deleted`);
                server.mainMenu();
            }
            else {
                console.log(`${logSymbols.error} No Role Selected`);
                server.mainMenu();
            }
        });
}

// EXPORTS
exports.remove = remove;