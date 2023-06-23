const express = require('express')
const router = express.Router()

const DATA_SOURCE = process.env.DATA_SOURCE
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE)

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM food_items ORDER BY dish_type;'
	db.all(sql, [], (err, rows) => {
		if (err) {
			res.json({
				message: 'There was an error :(',
				error: err
			})
		}

		// res.json(rows)
		res.render('foods.pug', {foods: rows})
	})
})

router.get('/new', (req, res) => {
	console.log('HELLO?????')
	const sql = 'SELECT * FROM drinks;'
	db.all(sql, [], (err, rows) => {
		if (err) {
			res.json({
				message: 'There was an error :(',
				error: err
			})
		}

		res.render('new_food.pug', {drinks: rows})
	})
})

router.get('/:id', (req, res) => {
	const sql = 'SELECT * FROM food_items WHERE id = ?'
	const params = [req.params.id]
	db.get(sql, params, (err, row) => {
		if (err) {
			res.json({
				message: 'There was an error :(',
				error: err
			})
		}
		// res.json(row)
		res.render('a_food.pug', {food: row})
	})
})

router.post('/', (req, res) => {
	const {name, price, vegan, vegetarian, gluten_free, description, service_time, dish_type, drink_id} = req.body

	const sql = 'INSERT INTO food_items (name, price, vegan, vegetarian, gluten_free, description, service_time, dish_type, drink_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
	const params = [name, price, vegan, vegetarian, gluten_free, description, service_time, dish_type, drink_id]

	db.run(sql, params, (err) => {
		if (err) {
			res.json({
				message: 'There was an error :(',
				error: err
			})
		}
		res.redirect('/foods')
	})
})


module.exports = router