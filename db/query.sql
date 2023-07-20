-- SELECT title, salary, department_name
-- FROM roles INNER JOIN department
-- ON roles.department_id = department.department_id;


-- SELECT employee_id, first_name, last_name,title,salary
-- FROM employee INNER JOIN roles
-- ON employee.role_id = roles.role_id;

-- SELECT * FROM department;
-- SELECT role_id ,title, department_name, salary FROM roles INNER JOIN  department ON roles.department_id = department.department_id
-- SELECT employee_id ,first_name, last_name, title, salary FROM employee INNER JOIN  roles ON employee.role_id = roles.role_id

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Some","Guy",3,5)

-- SELECT first_name, last_name, role_id FROM employee INNER JOIN roles ON employee.role_id = roles.role_id WHERE role_id = 7;

-- SELECT first_name ,last_name, title FROM employee INNER JOIN roles ON employee.role_id = roles.role_id WHERE employee.role_id = 7;

-- View All Employees
-- SELECT employee_id ,first_name, last_name, title, salary FROM employee INNER JOIN  roles ON employee.role_id = roles.role_id;
-- View all Roles
-- SELECT role_id ,title, department_name, salary FROM roles INNER JOIN  department ON roles.department_id = department.department_id;
-- View All Departments
-- SELECT * FROM department;

-- Add Employee
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Some","Guy",3,5)
-- Add Department
-- INSERT INTO department (department_name) VALUES ("New Department Test");

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Se", "Ro", 3, NULL)
-- INSERT INTO roles (title, salary,department_id) VALUES ("CoolCat", 90000.00, 7);
SELECT * FROM employee;
UPDATE employee SET first_name = "NewThing", last_name = "NewLast" , role_id = 6, manager_id = 3 WHERE employee_id = 1 ;
SELECT * FROM employee;