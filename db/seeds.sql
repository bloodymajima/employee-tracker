INSERT INTO department (name)
VALUES ('Legal'),
       ('Engineering'),
       ('Sales'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES  ('Lead Lawyer', 20000, 1),
        ('Lawyer', 25000, 2),
        ('Lead Engineer', 25000, 3),
        ('Engineer', 20000, 4);
        ('Sales Lead', 160000, 3),
        ('Salesperson', 125000, 3),
        ('Lead Accountant', 250000, 4),
        ('Accountant', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Stinger', 'Gooseforge', 1, null),
       ('Junk', 'Ottergaze', 2, 1),
       ('Quack', 'Forestwhisper', 3, null)
       ('Chirp', 'Flowerripper', 4, 2),
       ('Poacher', 'Springgreave', 5, null),
       ('Cruncher', 'Parrotknight', 6, 3);
       ('Coins Clink', 'Sharkdestroyer', 7, null),
       ('Marauder', 'Boarmaker', 8, 4);