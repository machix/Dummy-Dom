'use strict'
module.exports = function (sequelize, DataTypes) {
  var Food = sequelize.define('Food', {
    LocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING,
    type: DataTypes.STRING
  })

  Food.associate = function (models) {
    Food.belongsTo(models.Itinerary)
    Food.belongsTo(models.Location)
  }

  return Food
}
