import bcrypt from 'bcryptjs';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8],
      },
    },
  });

  User.findByLogin = async login => {
    let userResult = await User.findOne({
      where: { username: login },
    });

    if (!userResult) {
      userResult = await User.findOne({
        where: { email: login },
      });
    }

    return userResult;
  };

  User.beforeCreate(async newUser => {
    // eslint-disable-next-line no-param-reassign
    newUser.password = await newUser.generatePasswordHash();
  });

  // eslint-disable-next-line func-names
  User.prototype.generatePasswordHash = function() {
    const saltRounds = 12;
    return bcrypt.hash(this.password.concat(this.id), saltRounds);
  };

  // eslint-disable-next-line func-names
  User.prototype.validatePassword = async function(password) {
    const isValid = await bcrypt.compare(
      password.concat(this.id),
      this.password
    );
    return isValid;
  };

  return User;
};

export default user;
