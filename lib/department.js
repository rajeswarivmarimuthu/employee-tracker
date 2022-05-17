//import necessary npm packages
const mysql = require("mysql2/promise");

//Class for department
class Department {
    constructor (department_name){
        this.department_name =department_name;
    }
    
    //Method to insert department
    async deptInsert(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
        console.log(`Connected to the employee database.`)
      );
        const insertQuery = `insert into department (department_name) values (?)`
        const params = [this.department_name];
        const [rows, fields] = await db.execute(insertQuery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THIS DEPARTMENT*** \n`)
        return;
    }
    //Method to select all departments
    async deptSelectAll(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
        console.log(`Connected to the employee database.`)
      );
        const selectQuery = `select id, department_name from department;`
        const [rows, fields] = await db.execute(selectQuery);
        return(rows);
    }
}

module.exports = Department;