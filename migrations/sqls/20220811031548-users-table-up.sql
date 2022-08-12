CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) not NULL,
    password VARCHAR(255) not NULL
);