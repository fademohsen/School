'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    teacherId : DataTypes.INTEGER

  }, {});
  Courses.associate = function(models) {
    Courses.belongsTo(models.Teacher);
  };
  return Courses;
};
