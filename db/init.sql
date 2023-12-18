CREATE DATABASE db;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isadmin BOOLEAN DEFAULT false,
    resetcode VARCHAR(255),
    registration_time TIMESTAMP
);