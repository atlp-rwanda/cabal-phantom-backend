module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    routeID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});

    Route.associate = (models) => {
    // associations can be defined here
    Route.hasMany(models.Bus, {
      foreignKey: 'routeId',
      as: 'Route',
      onDelete: 'CASCADE',
    });
  };
  return Route;
};
