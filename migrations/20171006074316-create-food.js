'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      locationAlias: {
        type: Sequelize.STRING
      },
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Itineraries'
          },
          key: 'id'
        }
      },
      loadSequence: {
        type: Sequelize.INTEGER
      },
      startDay: {
        type: Sequelize.INTEGER
      },
      endDay: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      bookingStatus: {
        type: Sequelize.BOOLEAN
      },
      bookedThrough: {
        type: Sequelize.STRING
      },
      bookingConfirmation: {
        type: Sequelize.STRING
      },
      backgroundImage: {
        type: Sequelize.STRING
      },
      openingHoursValidation: {
        type: Sequelize.STRING
      },
      allDayEvent: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Food')
  }
}
