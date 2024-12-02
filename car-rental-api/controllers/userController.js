const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Reservation, Car } = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, cpf, cep } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "O e-mail já está em uso." });
    }
    const existingCpf = await User.findOne({ where: { cpf } });
    if (existingCpf) {
      return res.status(400).json({ message: "O CPF já está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      cpf,
      cep,
    });

    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, dateOfBirth, cpf, cep } = req.body;
    if (!name || !email || !dateOfBirth || !cpf || !cep) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    user.name = name;
    user.email = email;
    user.dateOfBirth = dateOfBirth;
    user.cpf = cpf;
    user.cep = cep;

    await user.save();
    return res.json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json(user.id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao realizar o login" });
  }
};

exports.getUserReservations = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const reservations = await Reservation.findAll({
      where: { userId: user.id },
    });

    console.log("Reservations:", reservations);

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar reservas" });
  }
};
