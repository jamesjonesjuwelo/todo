DROP TABLE IF EXISTS actions;

CREATE TABLE actions(
    id SERIAL PRIMARY KEY,
    description VARCHAR,
    userId VARCHAR,
    type VARCHAR,
    created_at VARCHAR
);