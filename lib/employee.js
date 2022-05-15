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

class Employee {
    constructor (fName, lName, roleID, manager_id){
        this.first_name = fName;
        this.last_name = lName;
        this.role_id = roleID;
        this.manager_id = manager_id;
    }

    empInsert(){
        const insertQuery = `insert into employee (first_name, last_name, role_id, manager_id) values (?)`
        const params = [this.first_name,this.last_name,this.role_id,this.manager_id];
        db.query(insertQuery, params, (err, result) => {
            if (err) {
              console.log({ error: err.message});
              return;
            }
           console.log('Employee Insert is successful' + result)
        });
    }

    async empSelectAll(){
        console.log('select all')
        const selectQuery = `select id, first_name, last_name, role_id ,manager_id  from employee;`
        return db.promise().query(selectQuery) 
        .then(([rows,fields]) => {
          console.table(rows);
          return(rows);
        }).catch(console.log)
        .then(() => db.end());
    }
}

module.exports = Employee;
