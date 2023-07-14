SELECT title, salary, department_name
FROM roles INNER JOIN department
ON roles.department_id = department.department_id;