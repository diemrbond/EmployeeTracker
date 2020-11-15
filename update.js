// REQUIREMENTS
const server = require('./server');
const get = require('./get');
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');

// MAIN UPDATE MENU
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

// UPDATE ROLE
const updateRole = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to UPDATE?",
            name: "whichEmployee",
            choices: await get.getEmployees(false)
        },
        {
            type: "list",
            message: "Which ROLE do you want to change to?",
            name: "whichRole",
            choices: await get.getRoles(true)
        }])
        .then(async function (response) {

            let tempEmployee = response.whichEmployee;
            let tempRole = response.whichRole;

            if (tempRole != null) {
                let query = server.connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: tempRole }, { id: tempEmployee }], function (error, response) {
                    if (error) console.log(`${logSymbols.error} ${error}`);
                    console.log(`${logSymbols.success} Updated employee ${tempEmployee}`)
                    server.mainMenu();
                });
            }
            else {
                console.log(`${logSymbols.error} No Role Selected`);
                server.mainMenu();
            }
        });
}

// UPDATE MANAGER
const updateManager = async () => {

    console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Which EMPLOYEE do you want to UPDATE?",
            name: "whichEmployee",
            choices: await get.getEmployees(false)
        },
        {
            type: "list",
            message: "Which MANAGER do you want to change to?",
            name: "whichManager",
            choices: await get.getEmployees("None")
        }])
        .then(async function (response) {

            let tempEmployee = response.whichEmployee;
            let tempManager = response.whichManager;

            let query = server.connection.query("UPDATE employee SET ? WHERE ?", [{ manager_id: tempManager }, { id: tempEmployee }], function (error, response) {
                if (error) console.log(`${logSymbols.error} ${error}`);
                console.log(`${logSymbols.success} Updated employee ${tempEmployee}`)
                server.mainMenu();
            });

        });
}

exports.update = update;