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

            switch(response.action){
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
            choices: ["EMPLOYEES", "ROLES", "DEPARTMENTS", "RETURN TO MENU"]
        }])
        .then(function (response) {

            switch(response.add){
                case "EMPLOYEES":
                    break;

                case "ROLES":
                    break;
                    
                case "DEPARTMENTS":
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;                
            }
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

            switch(response.view){
                case "EMPLOYEES":
                    break;

                case "ROLES":
                    break;
                    
                case "DEPARTMENTS":
                    break;
                    
                case "BUDGET":
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;                
            }
        });
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

            switch(response.update){
               case "ROLES":
                    break;
                    
                case "MANAGERS":
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;                
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

            switch(response.delete){
                case "EMPLOYEES":
                    break;

                case "ROLES":
                    break;
                    
                case "DEPARTMENTS":
                    break;

                case "RETURN TO MENU":
                    mainMenu();
                    break;                
            }
        });
}