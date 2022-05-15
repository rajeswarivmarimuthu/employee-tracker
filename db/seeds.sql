INSERT INTO department (department_name)
VALUES ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("QA");


INSERT INTO role (title,salary,department_id) 
VALUES ('Sr.Accountant',100000,1),
        ('Mech Engineer',90000,3),
        ('Jr.QA',70000,4),
        ('Sales Manager',90000,2),
        ('Engineering Manager',220000,3);

INSERT into employee (first_name,last_name,role_id,manager_id)
VALUES ('Will','Mill',3,NULL),
       ('Kill','Bill',3,1),
        ('Becky','Vicky',3,1);