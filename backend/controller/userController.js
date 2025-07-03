const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/userModel");

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await createUser({ name, email, password, isAdmin });
  res.status(201).json({ message: "Usuário criado com sucesso", user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  const token = jwt.sign(
    { id: user.id, isAdmin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};
