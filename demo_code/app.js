const express = require('express')
const app = express()
require('dotenv').config()

const DATA_SOURCE = process.env.DATA_SOURCE
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE)

const thingsRouter = require('./routers/things')
const foodRouter = require('./routers/food')

app.use(express.json())
app.use(express.urlencoded())

app.set('view engine', 'pug')

app.use('/things', thingsRouter)
app.use('/foods', foodRouter)

app.get('/fruits', (req, res) => {
	res.send('fruits!')
})

// 404
app.use((req, res, next) => {
	const err = new Error('The requested end point could not be found')
	err.statusCode = 404
	return next(err)
})

// generic error handler
app.use((err, req, res, next) => {
	console.log(err)
	const statusCode = err.statusCode || 500
	res.status(statusCode)
	res.json({
		message: err.message || 'Something went wrong',
		statusCode: statusCode,
		stack: err.stack
	})
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))