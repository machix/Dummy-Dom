'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('FlightInstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FlightBookingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'FlightBookings'
          },
          key: 'id'
        }
      },
      flightNumber: {
        type: Sequelize.INTEGER
      },
      airlineCode: {
        type: Sequelize.STRING
      },
      airlineName: {
        type: Sequelize.STRING
      },
      DepartureLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      ArrivalLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      departureTerminal: {
        type: Sequelize.STRING
      },
      departureGate: {
        type: Sequelize.STRING
      },
      arrivalTerminal: {
        type: Sequelize.STRING
      },
      arrivalGate: {
        type: Sequelize.STRING
      },
      startDay: {
        type: Sequelize.INTEGER
      },
      endDay: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      startLoadSequence: {
        type: Sequelize.INTEGER
      },
      endLoadSequence: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.TEXT
      },
      firstFlight: {
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
    return queryInterface.dropTable('FlightInstances')
  }
}
