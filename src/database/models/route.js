module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    routeID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  return Route;
};
