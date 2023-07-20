
DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

USE library_db;

CREATE TABLE department (
department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(8,2),
department_id INT NOT NULL,
FOREIGN KEY(department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(role_id),
FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
);


