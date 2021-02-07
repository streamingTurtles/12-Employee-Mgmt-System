USE employee_db;
-- company departments --
INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Finance'),
       (3, 'Marketing'),
       (4, 'Engineering'),
       (5, 'IT'),
       (6, 'Research'),
       (7, 'Opperations'),
       (8, 'Legal');



-- company roles --
INSERT INTO role (title, salary, department_id) 
VALUES
    ("CEO-Founder", 500000, 1),
    ("Sr-Sales-Engineer-Manager", 250000, 1),
    ("CIO", 350000, 2),
    ("Accountant", 175000, 2),
    ("Sr-Marketing-Manager", 170000, 3),
    ("Sr-Engineer", 225000, 4),
    ("Sr-Engineer-Manager", 225000, 4),
    ("Sr-Software-Engineer", 175000, 4),
    ("Fiels-Engineer-Manager", 100000, 4),
    ("CCIE", 200000, 4),
    ("Technical-Engineer-Manager", 150000, 6),
    ("Technical-Engineer", 115000, 6),
    ("Staffing-Manager", 150000, 1),
    ("Purchasing-Manager", 110000, 7),
    ("Accounts-Receivables", 75000, 7),
    ("Lawyer", 200000, 8);





-- company stake holder employees --
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Mickey', 'Matt', 10, NULL),
('Stevie', 'EngineerWonderBoy', 41, 40),
('Joe', 'Soprano', 40, NULL),
('Christian', 'ForcastIt', 20, 10),
('Peter', 'LetItRoll', 30, 10),
('Joe', 'DrawIt', 42, 43),
('Stef', 'ItsAllGreekToMe', 43, 40),
('Peter', 'GetsItDone', 44, 40),
('Willy', 'Wonker', 45, 43),
('Jimmy', 'RunsForYou', 50, 41),
('Freddy', 'ShopMgr', 60, 43),
('Alex', 'WorksHard', 61, 60),
('Cliff', 'Clowner', 11, 10),
('Mary', 'Louie', 70, 10),
('Benny', 'SleepingJets', 71, 70),
('Empty', 'Suit', 80, NULL);


