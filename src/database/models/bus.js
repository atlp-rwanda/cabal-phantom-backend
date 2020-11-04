module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    plate: DataTypes.STRING,
    company: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Bus.associate = function(models) {
 
    Bus.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'driver',
      onDelete: 'CASCADE',
    })
  };
  return Bus;
};

