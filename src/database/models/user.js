module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Bus, {
      foreignKey: 'userId',
      as: 'driver',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
