// REQUIREMENTS
const server = require('../server');
const cTable = require('console.table');
const logSymbols = require('log-symbols');

// GET DEPARTMENTS
async function getDepartments(addCancel) {
    return new Promise((success, failure) => {

        let query = server.connection.query("SELECT * FROM department", function (error, response) {
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

// GET ROLES
async function getRoles(addCancel) {
    return new Promise((success, failure) => {

        let query = server.connection.query("SELECT * FROM role", function (error, response) {
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

// GET EMPLOYEES
async function getEmployees(addCancel) {
    return new Promise((success, failure) => {

        let query = server.connection.query("SELECT * FROM employee", function (error, response) {
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

// GET MANAGERS
async function getManagers(addCancel) {
    return new Promise((success, failure) => {

        let query = server.connection.query("SELECT DISTINCT E1.manager_id, CONCAT(E2.first_name, ' ', E2.last_name) AS manager FROM employee AS E1 JOIN employee AS E2 ON E1.manager_id = E2.id WHERE E1.manager_id IS NOT NULL;", function (error, response) {
            if (error) console.log(`${logSymbols.error} ${error}`);
            let returnarray = [];
            response.forEach(manager => { returnarray.push({ name: manager.manager, value: manager.manager_id }) })
            if (addCancel) {
                returnarray.push({ name: `${logSymbols.error} Cancel`, value: null })
            }
            success(returnarray);
        });
    })
}

// EXPORTS
exports.getDepartments = getDepartments;
exports.getRoles = getRoles;
exports.getEmployees = getEmployees;
exports.getManagers = getManagers;