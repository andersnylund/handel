import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    operatorsAliases: false,
  }
);

const models = {
  User: sequelize.import('./user'),
};

export { sequelize };

export default models;
