'use strict'
module.exports = function (sequelize, DataTypes) {
  var FlightBooking = sequelize.define('FlightBooking', {
    ItineraryId: DataTypes.INTEGER,
    paxAdults: DataTypes.INTEGER,
    paxChildren: DataTypes.INTEGER,
    paxInfants: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    classCode: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    backgroundImage: DataTypes.STRING
  })

  FlightBooking.associate = function (models) {
    FlightBooking.belongsTo(models.Itinerary)
    // FlightBooking.hasMany(models.FlightInstance, {onDelete: 'CASCADE', hooks: true})
    FlightBooking.hasMany(models.FlightInstance)
    FlightBooking.hasMany(models.Attachment)
  }

  FlightBooking.beforeDestroy((instance, options) => {
    sequelize.models.Attachment.destroy({where: {FlightBookingId: instance.id}})
    sequelize.models.FlightInstance.destroy({where: {FlightBookingId: instance.id}})
  })

  return FlightBooking
}
