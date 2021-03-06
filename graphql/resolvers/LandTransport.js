const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const LandTransport = {
  LandTransport: {
    departureLocation (landTransport) {
      return landTransport.getLandTransportDeparture()
    },
    arrivalLocation (landTransport) {
      return landTransport.getLandTransportArrival()
    },
    attachments (landTransport) {
      return landTransport.getAttachments()
    }
  },
  Query: {
    findLandTransport: (__, data) => {
      return db.LandTransport.findById(data.id)
    }
  },
  Mutation: {
    createLandTransport: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        var newTransport = Promise.all([departure, arrival])
          .then(values => {
            temp.DepartureLocationId = values[0]
            temp.ArrivalLocationId = values[1]
            return temp
          })
      } else {
        newTransport = Promise.resolve(temp)
      }

      return newTransport.then(newTransport => {
        return db.LandTransport.create(newTransport)
          .then(created => {
            if (data.attachments) {
              createAllAttachments(data.attachments, 'LandTransport', created.id)
                // check if helper returns true/false
            }
            return created.id
          })
          .then(createdId => {
            return db.LandTransport.findById(createdId)
          })
      })
    },
    updateLandTransport: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          updates[key] = data[key]
        }
      })

      // updates only if both departure and arrival are given. what about updating only 1?
      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        return Promise.all([departure, arrival])
          .then(values => {
            console.log(values)
            updates.DepartureLocationId = values[0]
            updates.ArrivalLocationId = values[1]
            return db.LandTransport.findById(data.id)
              .then(foundTransport => {
                return foundTransport.update(updates)
              })
          })
      } else {
        return db.LandTransport.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteLandTransport: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('LandTransport', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.LandTransport.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = LandTransport
