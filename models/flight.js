'use strict'
module.exports = function (sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', {
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    arrivalTerminal: DataTypes.STRING,
    arrivalGate: DataTypes.STRING,
    departureTerminal: DataTypes.STRING,
    departureGate: DataTypes.STRING,
    departureLoadSequence: DataTypes.INTEGER,
    arrivalLoadSequence: DataTypes.INTEGER,
    departureDay: DataTypes.INTEGER,
    arrivalDay: DataTypes.INTEGER,
    departureTime: DataTypes.INTEGER,
    arrivalTime: DataTypes.INTEGER,
    boardingTime: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING
  })

  Flight.associate = function (models) {
    Flight.belongsTo(models.Itinerary)
    Flight.belongsTo(models.Location, {
      as: 'FlightDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Flight.belongsTo(models.Location, {
      as: 'FlightArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Flight.hasMany(models.Attachment)
  }

  Flight.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {FlightId: instance.id}})
  })

  return Flight
}
