const bcrypt = require("bcrypt");
const { Admin } = require('../models');

const initializeAdminUser = async () => {
  try {
    const adminEmail = 'admin@autorent.com';

    const existingAdmin = await Admin.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log('Usuário administrador já existe.');
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword, 
    });

    console.log('Usuário administrador criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar usuário administrador padrão:', error.message);
  }
};

module.exports = initializeAdminUser;
