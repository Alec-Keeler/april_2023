const express = require('express')
const app = express()
require('dotenv').config()

const foodRouter = require('./routers/foods')

app.use(express.json())

app.use('/fooditems', foodRouter)


// 404
app.use((req, res, next) => {
	const err = new Error('The requested end point could not be found')
	err.statusCode = 404
	return next(err)
})

// generic error handler
app.use((err, req, res, next) => {
	console.log('error!', err)
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