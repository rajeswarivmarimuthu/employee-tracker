
// Importing necessary npm packages
const inquirer = require('inquirer');
const cTable = require('console.table');

var process = require('process');

//importing the class and methods for department, role and Employee 
const Department = require ('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

//Array of initial  menuQuestions: 
const menuQuestions =
    {
        message: "What would you like to do?",
        name: "optedAction",
        type: "list",
        choices: ["view all departments", 
                  "add a new department",
                  
                  "view all roles",
                  "add a new role",
                  "delete a role",
                  
                  "view all employees",
                  "add a new employee",

                  "all done!!"
                 ],
        filter(val) {
          return val.toLowerCase();
        }
    }

// initiate the program with main prompt
async function init() {
    await inquirer.prompt(menuQuestions)
    .then((answers) => {
        switch(answers.optedAction){
            case 'view all departments':
                displayAllDepts();
                break;
            case 'view all roles':
                displayAllRoles();
                break;
            case 'view all employees':
                displayAllEmployees();
                break;
            case 'add a new department':
                addNewDepartment();
                break;
            case 'add a new role':
                addNewRole(); 
                break;
            case 'add a new employee':
                addNewEmployee();
                break;
            case 'delete a role':
                deleteRole();
                break;
            default:
                console.log('Hope you loved using employee manager!!')
                process.exit(0);
        }
        return;
    })
}

// Function to display all Departments
async function displayAllDepts(){
    const newDept = new Department();
    const displayDept = await newDept.deptSelectAll();
    console.log ('\n *** LIST OF DEPARTMENTS ***\n');
    console.table(displayDept);
    init();
    return;
}

// Function to display all Roles
async function displayAllRoles() {
    const roleSelect = new Role();
    const allroles = await roleSelect.roleSelectAll();
    console.log ('\n *** LIST OF ROLES ***\n');
    console.table(allroles);
    init();
    return;
}

// Function to display all employees
async function displayAllEmployees (){
    const employeeSelect = new Employee();
    const displayEmployees = await employeeSelect.empSelectAll();
    console.log ('\n *** LIST OF EMPLOYEEES ***\n');
    console.table(displayEmployees);
    init();
    return;
}


// Functions to add new department 
async function addNewDepartment() {
    const addNewDeptQues = {
        message: "Enter the department name:",
        name: "deptName",
        type: "input"
    }
    await inquirer.prompt(addNewDeptQues)
    .then((answers) => {
        const deptDetails = new Department(answers.deptName);
        insertDepartment(deptDetails);
    });
    return;
}

async function insertDepartment(deptDetails) {
    await deptDetails.deptInsert();
    init();
    return;
}

// Functions to add new role  
async function addNewRole(){
    // Prepare a list of department 
    const newDept = new Department();
    const displayDept = await newDept.deptSelectAll();
    const deptList = function (displayDept) {
    const listDept = [];
    displayDept.forEach(element => {
        listDept.push(element.id + '.' + element.department_name); 
    });
    return listDept;  
    }
    
    const roleQuestions = [
        {
        message: "Enter the role title:",
        name: "roleTitle",
        type: "input"
        },
        {
        message: "Enter the salary for the role:",
        name: "roleSalary",
        type: "input"
        },
        {
            message: "Select a department:",
            name: "deptName1",
            type: "list",
            choices: deptList(displayDept)
        }
    ]
    await inquirer.prompt(roleQuestions)
    .then((answers) => {
        const deptIDSeparator = answers.deptName1.split(".");
        const deptID = Number(deptIDSeparator[0]);
        const roleSal = parseFloat(answers.roleSalary);
        const roleDetails = new Role(answers.roleTitle, roleSal, deptID);
        insertRole(roleDetails);
    });
    return;
}


async function insertRole(roleDetails) {
    await roleDetails.roleInsert();
    init();
    return;
}

//// Functions to add new Employee  
async function addNewEmployee(){
    //prepare list of roles 
    const newRole = new Role();
    const displayRole = await newRole.roleSelectAll();
    const roleList = function (displayRole) {
        const listRoles = [];
        displayRole.forEach(element => {
            listRoles.push(element.id + '.' + element.title); 
        });
        return listRoles;  
    }

    //prepare list of Managers

    const newManager = new Employee();
    const displayManagers = await newManager.empSelectAll();
    const managerList = function (displayManagers) {
        const listManagers = [];
        listManagers.push('0.None');
        displayManagers.forEach(element => {
            listManagers.push(element.id + '.' + element.first_name + ' ' + element.last_name); 
        });
        return listManagers;  
    }

    //Employee questions
    const employeeQuestions = [
        {
        message: "Enter the first name:",
        name: "fname",
        type: "input"
        },
        {
            message: "Enter the last name:",
            name: "lname",
            type: "input"
        },
        {
        message: "Enter the role id:",
        name: "roleID",
        type: "list",
        choices: roleList(displayRole)
        },
        {
            message: "Select employee's manager:",
            name: "mgrName",
            type: "list",
            choices: managerList(displayManagers)
        }
    ]

    await inquirer.prompt(employeeQuestions)
    .then((answers) => {
        let empDetails;
        const roleIDSeparator = answers.roleID.split(".");
        const roleID = Number(roleIDSeparator[0]);

        const mgrIDSeparator = answers.mgrName.split(".");
        const mgrID = Number(mgrIDSeparator[0]);

        if (mgrID > 0) {
            empDetails = new Employee(answers.fname,answers.lname,roleID,mgrID);
        } else {
            empDetails = new Employee(answers.fname,answers.lname,roleID, null);
        }
        insertEmployee(empDetails);
    });
    return;
}


async function insertEmployee(empDetails) {
    await empDetails.empInsert();
    init();
    return;
}


async function deleteRole(){
    //prepare list of roles 
    let roleID;
    const newRole = new Role();
    const displayRole = await newRole.roleSelectAll();
    const roleList = function (displayRole) {
        const listRoles = [];
        displayRole.forEach(element => {
            listRoles.push(element.id + '.' + element.title); 
        });
        return listRoles;  
    }

    const delRoleQues = {
        message: "Enter the role to be deleted:",
        name: "roleID",
        type: "list",
        choices: roleList(displayRole)
    }

    await inquirer.prompt(delRoleQues)
    .then((answers) => {
        const roleIDSeparator = answers.roleID.split(".");
        roleID = Number(roleIDSeparator[0]);
    });
    const roleDetails = new Role();
    await roleDetails.roleDelete(roleID);
    init();
}

// Initiate the program with main set of prompts
init();

