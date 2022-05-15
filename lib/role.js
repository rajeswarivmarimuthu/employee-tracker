const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // TODO: Add MySQL password here
      password: "root",
      database: "employees_db",
    },
    console.log(`Connected to the employee database.`)
  );

  class Role {
    constructor (role_title, role_salary, department_id){
        this.role_title = role_title;
        this.role_salary = role_salary;
        this.department_id = department_id;
    }

    roleInsert(){
        const insertQuery = `insert into role (title, salary, department_id) values (?,?,?)`
        const params = [this.role_title, this.role_salary, this.department_id];
        console.log(params);
        db.query(insertQuery, params, (err, result) => {
            if (err) {
              console.log({ error: err.message});
              return;
            }
           console.log('Role Insert is successful' + result)
        });
    }

    async roleSelectAll(){
        console.log('select all')
        const selectQuery = `select id as 'Role ID', title as 'Role Title', salary as 'Role Salary', department_id as 'Department ID' from role;`
        return db.promise().query(selectQuery)
        .then(([rows,fields]) => {
          console.table(rows);
          return(rows);
        }).catch(console.log)
        .then(() => db.end());
    }
  }

  module.exports = Role;