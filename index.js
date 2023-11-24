const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connecting to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

const dbMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ['View All Employees',
                  'Add Employees', 
                  'Update Employee Role', 
                  'View All Roles', 
                  'Add Role', 
                  'View All Departments', 
                  'Add Department',
                  'Quit']
    }
];

const viewEmployees = () => {
    db.query('SELECT a.id, a.first_name, a.last_name, department.name as department, role.title as title, role.salary as salary, b.first_name as manager FROM employee a LEFT JOIN employee b on a.manager_id = b.id JOIN role on a.role_id = role.id JOIN department on role.department_id = department.id', function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results);  
            startMenu();
        }
    })
};

const addEmployee = () => {
    console.log('Unable to add an employee );');
    startMenu();
};

const updateEmployee = () => {
    console.log('Unable to update employee role. );');
    startMenu();
};

const viewRoles = () => {
    db.query(
        'SELECT role.id, role.title, department.name as department, role.salary FROM role JOIN department on role.department_id = department.id;', function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results);  
                startMenu();
            }
        }
    )
};

const addRole = () => {
    consolg.log('Unable to add a role');
}

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter the name of the departent you would like to add.',
            validate: emptyString
        }
    ]).then((response) => {
        db.query(
            `INSERT INTO department (name) VALUES ('${response.department}');`
        );
        console.log(`Successfully added ${response.department} to the department table!`);
        viewDept();
    })
};

const viewDept = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            startMenu()
        }
    })
}

async function startMenu() {
    try {
        const answers = await inquirer.prompt(questions.queries);

        if (answers.commands == 'View all departments') {
            await viewDept()
            startUp()
        } else if (answers.commands == 'View all roles') {
            await viewRoles()
            startUp()
        } else if (answers.commands == 'View all employees') {
            await viewEmployees()
            startUp()
        } else if (answers.commands == 'Create department') {
            await addDept()
            startUp()
        } else if (answers.commands == 'Create role') {
            await addRole()
            startUp()
        } else if (answers.commands == 'Create employee') {
            connection.query(`
            SELECT * FROM employee;`, async (err, results) => {
                
                const managerChoices = results.map((employee) => {
                    console.log()
                    return {name: `${employee.first_name} ${employee.last_name}`, value: `${employee.id}`}
                })
                
                managerChoices.unshift({name: `None`, value: null})
                 await addEmployee(managerChoices)
                startUp()
            })
        } else if (answers.commands == 'Update employee') {
            await updateEmployee()
            startUp()
        }

    } catch (error) {
        console.error(error)
    }

};

startMenu();