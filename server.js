
const inquirer = require('inquirer');


const Department = require ('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

//Array of Questions: 
const menuQuestions =
    {
        message: "What would you like to do?",
        name: "optedAction",
        type: "list",
        choices: ["view all departments", 
                  "add a new department",
                  "view all roles",
                  "add a new role",
                  "view all employees",
                  "add a new employee"
                 ],
        filter(val) {
          return val.toLowerCase();
        }
    }

  async function init() {
    //get team name 
    await inquirer.prompt(menuQuestions)
    .then((answers) => {
         switch(answers.optedAction){
            case 'view all departments':
                const showAllDept = new Department();
                showAllDept.deptSelectAll();
                break;
            case 'view all roles':
                const roleSelect = new Role();
                displayRoles = roleSelect.roleSelectAll();
                break;
            case 'view all employees':
                const employeeSelect = new Employee();
                displayEmployees = employeeSelect.empSelectAll();
                break;
            case 'add a new department':
                addNewDepartment();
                break;
            case 'add a new role':
                addNewRole(); 
                break;
            case 'add a new employee':
                break;
            default:
                break;
        }
    });
}


async function addNewDepartment() {
    const addNewDeptQues = {
        message: "Enter the department name:",
        name: "deptName",
        type: "input"
    }
    await inquirer.prompt(addNewDeptQues)
    .then((answers) => {
        const deptDetails = new Department(answers.deptName);
        deptDetails.deptInsert();
    });
    return;
}


async function addNewRole(){
    // Prepare a list of department 
    const newDept = new Department();
    const displayDept = await newDept.deptSelectAll();
    console.log(displayDept);

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
        roleDetails.roleInsert();
    });
    return;
}


async function addNewEmployee(){
    return;
}

init();

