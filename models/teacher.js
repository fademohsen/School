'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dataofbirth: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
  };
  return Teacher;
};