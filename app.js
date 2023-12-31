require('dotenv').config();
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2/promise');
const logo = require('./assets/logo')
const sqlQuery = require('./task')
const cTable = require('console.table');

const question = [
    {
        type: 'list',
        message: 'What do you wanna inquire about now?',
        name: 'request',
        choices: [
            "View all Employees",
            "Add Employee",
            "Update Employee",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Departments",
            "Quit"]
    }
]

const addNewDepartment = [
    {
        type: 'input',
        message: 'What is the name of the New Department?',
        name: 'request'
    }
]

const addNewRole = [
    {
        type: 'input',
        message: 'What is the title of the New Role?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the salary (ie. 60000.00) of the New Role?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'What is the department id of the New Role?',
        name: 'department_id'
    }

]

const addNewEmployee = [
    {
        type: 'input',
        message: 'What is the Employee first name?',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'What is the Employee last name?',
        name: 'last_name'
    },
    {
        type: 'input',
        message: 'What is the Employee role id?',
        name: 'role_id'
    },
    {
        type: 'input',
        message: 'What is the Employee Manger Id if any?',
        name: 'manager_id',
        default: 'NULL'
    }
]

const updateEmployee = [
    {
        type: 'input',
        message: 'What Employee by ID do you want to update',
        name: 'employee_id'
    },
    {
        type: 'input',
        message: 'What is the UPDATE employee First name?',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'What is the UPDATE employee last name?',
        name: 'last_name'
    },
    {
        type: 'input',
        message: 'What is the UPDATE employee role id?',
        name: 'role_id'
    },
    {
        type: 'input',
        message: 'What is the UPDATE employee Manger Id if any?',
        name: 'manager_id',
        default: 'NULL'
    }
]

//! unused Function
async function get() {
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    )

    const getDepartments = await db.query("SELECT department_name FROM department")
    let departValues = []
    getDepartments[0].forEach(element => {
        const data = Object.values(element)
        departValues.push(...data)
    });

    questionDepartment = [
        {
            type: 'list',
            message: 'What Department is this employee in?',
            name: 'request',
            choices: departValues
        }
    ]
    const askedQuestion = await prompt(questionDepartment)
    const id = departValues.indexOf(askedQuestion.request)+1
    db.end()
    return id
}
//! unused Function


async function ask() {
    const askedQuestion = await prompt(question)
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    )
    if (askedQuestion.request === 'Quit') {
        console.log("See you next time!");
        return db.end();
    }

    if (askedQuestion.request === "View all Employees" || askedQuestion.request === "View All Departments" || askedQuestion.request === "View All Roles") {
        const queryString = sqlQuery(askedQuestion.request)
        const answer = await db.query(queryString)
        console.table(answer[0]);
        db.end()
        return ask()
    }
    if (askedQuestion.request === "Add Employee") {
        const askedQuestion = await prompt(addNewEmployee)

        const string = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${askedQuestion.first_name}", "${askedQuestion.last_name}", ${askedQuestion.role_id}, ${askedQuestion.manager_id})`

        const answer = await db.query(string)
        const { insertId } = answer[0]
        console.log(`Add employee to id ${insertId}:${askedQuestion.first_name} ${askedQuestion.last_name}`);
        db.end()
        return ask()
    }
    if (askedQuestion.request === "Add Departments") {
        const departmentName = await prompt(addNewDepartment)
        const answer = await db.query(`INSERT INTO department (department_name) VALUES (?)`, departmentName.request)
        const { insertId } = answer[0]
        console.log(`Department Add to id ${insertId}:${departmentName.request}`);
        db.end()
        return ask()
    }
    if (askedQuestion.request === "Add Role") {
        const data = await prompt(addNewRole)
        const answer = await db.query(`INSERT INTO roles (title, salary,department_id) VALUES ("${data.title}", ${data.salary}, ${data.department_id})`)
        const { insertId } = answer[0]
        console.log(`Role Add to id ${insertId}:${data.title}`);
        db.end()
        return ask()
    }

    if (askedQuestion.request === "Update Employee") {
        const data = await prompt(updateEmployee)

        const { employee_id, first_name, last_name, role_id, manager_id } = data

        const roleAnswer = await db.query(`UPDATE employee SET first_name = "${first_name}", last_name = "${last_name}" , role_id = ${role_id}, manager_id = ${manager_id} WHERE employee_id = ${employee_id}`)

        const answer = await db.query(sqlQuery("View all Employees"))

        console.table(answer[0]);
        db.end()
        return ask()
    }


}




ask()