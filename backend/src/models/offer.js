const offer = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Offer.associate = ({ Item }) => {
    Offer.belongsTo(Item, { as: 'maker', onDelete: 'CASCADE' });
    Offer.belongsTo(Item, { as: 'receiver', onDelete: 'CASCADE' });
  };

  return Offer;
};

export default offer;
