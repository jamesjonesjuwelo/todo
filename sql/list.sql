DROP TABLE IF EXISTS list;

CREATE TABLE list(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description VARCHAR,
    created_at VARCHAR,
    completed VARCHAR
);