USE employeeDB;

INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Research & Development");
INSERT INTO department (name) VALUES ("Design & Engineering");
INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Administration");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Assistant", 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("HR Manager", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Secretary", 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Researcher", 90000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Graphic Designer", 80000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Multimedia Developer", 95000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Business Development Manager", 110000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Owner", 150000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 40000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("David", "Robinson", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tim", "Duncan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Manu", "Ginobili", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tony", "Parker", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("George", "Gervin", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malik", "Rose", 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tiago", "Splitter", 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Kelleher", 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("RC", "Buford", 10, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Gregg", "Popovich", 9, 9);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Danny", "Green", 11, 9);