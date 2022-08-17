DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    user_id serial NOT NULL,
    user_name text,
    score integer
);


INSERT INTO users VALUES (1, 'Kathi', 1);
INSERT INTO users VALUES (2, 'David', 5);
INSERT INTO users VALUES (3, 'Adrian', 2);
INSERT INTO users VALUES (4, 'Blabla', 3);
INSERT INTO users VALUES (5, 'TheBest', 5);
SELECT pg_catalog.setval('users_user_id_seq', 5, true);