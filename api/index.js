import express from 'express'
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const app = express()

app.use(bodyParser.json())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}, { stream: accessLogStream }))


var news = require('./routes/news')
var property = require('./routes/property')
var user = require('./routes/user')
var file = require('./routes/file')
var comments = require('./routes/comments')

app.use('/news', news)
app.use('/property', property)
app.use('/user', user)
app.use('/file', file)
app.use('/comments', comments)
// Export the server middleware
export default {
  path: '/api',
  handler: app
}
