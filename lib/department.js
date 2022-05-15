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

class Department {
    constructor (department_name){
        this.department_name =department_name;
    }

    deptInsert(){
        const insertQuery = `insert into department (department_name) values (?)`
        const params = [this.department_name];
        db.query(insertQuery, params, (err, result) => {
            if (err) {
              console.log({ error: err.message});
              return;
            }
           console.log('Department Insert is successful' + result)
        });
    }

    async deptSelectAll(){
        console.log('select all');
        const selectQuery = `select id, department_name from department;`
        return db.promise().query(selectQuery)
        .then(([rows,fields]) => {
          console.table(rows);
          return(rows);
        })
        .catch(console.log('Display all department failed'));
    }
}

module.exports = Department;