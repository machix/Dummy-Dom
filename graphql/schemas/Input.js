const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    day: Int!
    start: Boolean
  }
  input googlePlaceData {
    placeId: String!
    countryCode: String
    name: String
    latitude: Float
    longitude: Float
    address: String
    openingHours: [openingHoursPeriodsInput]
    openingHoursText: [String]
  }
  input openingHoursPeriodsInput {
    close: periodObjInput
    open: periodObjInput
  }
  input periodObjInput {
    day: Int
    time: String
  }
  input attachmentInput {
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
  input createFlightInstanceInput {
    flightNumber: Int
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String
    firstFlight: Boolean
  }

  input updateFlightInstanceInput {
    id: ID!
    departureIATA: String
    arrivalIATA: String
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String
  }
`
module.exports = Input
