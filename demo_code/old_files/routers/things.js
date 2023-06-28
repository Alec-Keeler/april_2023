const express = require('express')
const router = express.Router()
const stuffRouter = require('./stuff')

router.use((req, res, next) => {
	console.log('Inside things router')
	if (req.query.admin !== 'true') {
		const err = new Error('not authorized')
		next(err)
	}
	next()
})

router.get('/', (req, res) => {
	res.send('all of the things')
})

router.get('/:id(\\d+)', (req, res, next) => {
	if (req.params.id > 10) {
		const err = new Error('The requested thing could not be found')
		err.statusCode = 404
		return next(err)
	}
	res.send(`thing with an id of ${req.params.id}`)
})

router.get('/summary', (req, res, next) => {
	res.send('a summary of our things data aggregates')
})

router.use('/:id/stuff', stuffRouter)

router.post('/', (req, res, next) => {
	res.json({
		message: 'Created a new thing',
		newThing: req.body
	})
})

router.put('/:id', (req, res, next) => {
	if (req.params.id > 10) {
		const err = new Error('The requested thing could not be found')
		err.statusCode = 404
		return next(err)
	}
	res.json({
		message: `Updated thing with an id of ${req.params.id}`,
		updateBody: req.body
	})
})

router.delete('/:id', (req, res, next) => {
	if (req.params.id > 10) {
		const err = new Error('The requested thing could not be found')
		err.statusCode = 404
		return next(err)
	}
	res.send(`deleted a thing with an id of ${req.params.id}`)
})

module.exports = router;