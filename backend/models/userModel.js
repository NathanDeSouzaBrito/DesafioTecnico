const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function createUser({ name, email, password, isAdmin }) {
  const hashed = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    "INSERT INTO users(name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashed, isAdmin]
  );
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
