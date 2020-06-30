'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dataofbirth: DataTypes.STRING,
    mobile: DataTypes.INTEGER
  }, {});
  Parent.associate = function(models) {
    // associations can be defined here
  };
  return Parent;
};