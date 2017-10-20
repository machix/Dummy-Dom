const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const schema = require('./graphql/schema')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

app.use('/graphql', bodyParser.json())

function verifyToken (req, res, next) {
  var authHeader = req.headers.authorization
  var token = authHeader.substring(7)
  if (token) {
    var user = jwt.verify(token, 'coconutavocadoshake')
    if (user) {
      req.user = user.id
      console.log('req.user', req.user)
    } else {
      res.status(400)
    }
  } else {
    res.status(400)
  }
  next()
}

app.use('/graphql', verifyToken)

app.use('/graphql', graphqlExpress(req => ({
  schema: schema,
  context: {
    user: req.user
  }
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Graphql is running on port ${port}`)
})
