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
const remove = require("./delete");

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
                    remove.remove();
                    break;

                case "EXIT PROGRAM":
                    console.log("\nThanks, see you next time!")
                    process.exit();
            }
        });
}

// EXPORTS
exports.connection = connection;
exports.mainMenu = mainMenu;