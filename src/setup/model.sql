CREATE DATABASE users;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY NOT NULL,
    user_first_name VARCHAR(32) NOT NULL,
    user_last_name VARCHAR(32) NOT NULL
);
