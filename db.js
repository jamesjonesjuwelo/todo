const spicedPg = require("spiced-pg");

const dbUser = "postgres";
const dbPass = "postgres";

const db = spicedPg(
  process.env.DATABASE_URL ||
  `postgres:${dbUser}:${dbPass}@localhost:5432/listdb`
);

const list = 'list';
const actions = 'actions';

exports.getList = () =>
  db.query(
    `SELECT * FROM ${list}`
  );

exports.createListRow = (...params) =>
  db.query(
    `INSERT INTO ${list} (name, description, created_at, completed)
      VALUES ($1, $2, $3, $4) RETURNING *`,
    params
  );


exports.createActionRow = (...params) =>
  db.query(
    `INSERT INTO ${actions} (description, userId, type, created_at)
      VALUES ($1, $2, $3, $4)`,
    params
  );


exports.updateItemDescription = (...params) =>
  db.query(
    `UPDATE list
     SET description = $2
     WHERE id = $1`,
    params
  );

exports.updateItemCompletion = (...params) =>
  db.query(
    `UPDATE list
     SET completed = $2
     WHERE id = $1`,
    params
  );


exports.deleteItemRow = (...params) =>
  db.query(
    `DELETE FROM list
     WHERE id = $1`,
    params
  );

exports.getUserActions = () =>
  db.query(
    `SELECT * FROM ${actions}`
  );

exports.clearUserActions = (...params) =>
  db.query(
    `DELETE from actions
     WHERE userId = $1
    `,
    params
  );