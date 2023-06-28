const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	if (req.params.id > 10) {
		const err = new Error('The requested thing could not be found')
		err.statusCode = 404
		return next(err)
	}
	res.send(`stuff related to thing with an id of ${req.params.id}`)
})

module.exports = router