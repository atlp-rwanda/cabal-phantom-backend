module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    plate: DataTypes.STRING,
    company: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  return Bus;
};
