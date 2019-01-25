import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let sequelize;

if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      operatorsAliases: false,
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

const models = {
  User: sequelize.import('./user'),
  Item: sequelize.import('./item'),
  Offer: sequelize.import('./offer'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
