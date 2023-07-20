function sqlQuery(task) {
    selection = task
    switch (selection) {
        case "View all Employees":
            return "SELECT employee_id ,first_name, last_name, title, salary FROM employee INNER JOIN  roles ON employee.role_id = roles.role_id"
        case "View All Departments":
            return "SELECT * FROM department"
        case "View All Roles":
            return "SELECT role_id ,title, department_name, salary FROM roles INNER JOIN  department ON roles.department_id = department.department_id"
        default:
            return "Quit";
    }
}



module.exports = sqlQuery


