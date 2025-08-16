const sequelize = require('./database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL estabelecida com sucesso 🚀');
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
}

testConnection();
