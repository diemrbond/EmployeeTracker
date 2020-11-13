const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require("dotenv").config();

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employeeDB"
})

connection.connect(function (error) {
    if (error) throw error;
    console.log("-> Connected to employeeDB.");
    console.log('   Starting program...');
})

// Add department
// View departments
// Delete department
// View department budget

// Add role
// View roles
// Update roles
// Delete role

// Add employee
// View employees
// Delete employees
// Update managers