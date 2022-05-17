//import necessary npm packages
const mysql = require("mysql2/promise");

//Building Employee class!! 
class Employee {
    constructor (fName, lName, roleID, manager_id){
        this.first_name = fName;
        this.last_name = lName;
        this.role_id = roleID;
        this.manager_id = manager_id;
    }

  //Method to insert employee
   async empInsert(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
        console.log(`Connected to the employee database.`)
      );
        const insertQuery = `insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)`
        const params = [this.first_name,this.last_name,this.role_id,this.manager_id];
        const [rows, fields] = await db.execute(insertQuery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THE EMPLOYEE *** \n`)
        return;
    }

    //Method to select all employees
    async empSelectAll(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
        console.log(`Connected to the employee database.`)
      );
        const selectQuery = `select id, first_name, last_name, role_id ,manager_id  from employee;`
        const [rows, fields] = await db.execute(selectQuery);
        return(rows);
    }
}

module.exports = Employee;
