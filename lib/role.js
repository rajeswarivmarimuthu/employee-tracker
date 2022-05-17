//import necessary npm packages
const mysql = require("mysql2/promise");

//Building role class
  class Role {
    constructor (role_title, role_salary, department_id){
        this.role_title = role_title;
        this.role_salary = role_salary;
        this.department_id = department_id;
    }

    //Method to insert role
    async roleInsert(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
      );
        const insertQuery = `insert into role (title, salary, department_id) values (?,?,?)`
        const params = [this.role_title, this.role_salary, this.department_id];
        const [rows, fields] = await db.execute(insertQuery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THIS ROLE*** \n`)
        return (rows);
  }

    //Method to select all employees
    async roleSelectAll(){
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
      );
      
        const selectQuery = `select id, title, salary, department_id from role;`
        const [rows, fields] = await db.execute(selectQuery);
        return(rows);
    }

    //Method to select all employees
    async roleDelete(id) {
      const db = await mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "employees_db",
        },
      );
      
        const delQuery = `delete from role where id = ?;`
        const params = [id];
        const [rows, fields] = await db.execute(delQuery, params);
        console.log(`\n ***SUCCESSFULLY DELETED THIS ROLE*** \n`)
        return;
    }

}


  module.exports = Role;