INSERT INTO department (department_name)
VALUES ("Executive"),
       ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("QA");

INSERT INTO role (title,salary,department_id) 
VALUES  ('CEO',1000000,1),
        ('Sr.Accountant',100000,2),
        ('Mech Engineer',90000,4),
        ('Jr.QA',70000,5),
        ('Sales Manager',90000,3),
        ('Engineering Manager',220000,4);

INSERT into employee (first_name,last_name,role_id,manager_id)
VALUES ('Will','Mill',1,NULL),
       ('Kill','Bill',2,1),
        ('Becky','Vicky',3,1);