// REQUIREMENTS
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const logSymbols = require('log-symbols');
require("dotenv").config();

// MODULES
const view = require("./view");
const add = require("./add");
const update = require("./update");

// CREATE CONNECTION
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employeeDB"
})

// CONNECT
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

// MAIN MENU
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
                    add.add();
                    break;

                case "VIEW":
                    view.view();
                    break;

                case "UPDATE":
                    update.update();
                    break;

                case "DELETE":
                    remove();
                    break;

                case "EXIT PROGRAM":
                    process.exit();
            }
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

exports.connection = connection;
exports.mainMenu = mainMenu;