const express = require('express')
const router = express.Router()

const { FoodItem, FoodItemIngredient, Drink, Ingredient } = require('../db/models')
const { Op } = require("sequelize");


// query methods: findAll, findOne, findByPk
// other methods: update, destroy

router.get('/', async(req, res) => {
	const foodItems = await FoodItem.findAll({
		order: [['price']],
		attributes: ['name', 'price'],
		where: {
			price: {
				[Op.gte]: 12
			},
			vegan: false
		}
	}) // SELECT * FROM FoodItems

	res.json(foodItems)
})

// /fooditems/name?name=xyz
router.get('/name', async(req, res) => {
	const searchTerm = req.query.name
	const foodItem = await FoodItem.findOne({
		where: {
			name: {
				[Op.startsWith]: searchTerm
			}
			// price: 10
		}
	}) // SELECT * FROM FoodItems WHERE name = searchTerm

	res.json(foodItem)
})

router.get('/:id(\\d+)', async(req, res) => {
	const foodItem = await FoodItem.findByPk(req.params.id, {})

	res.json(foodItem)
})

router.post('/create', async(req, res) => {
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body
	const newItem = await FoodItem.create({
		name: name,
		price, //price: price
		vegetarian,
		vegan,
		glutenFree,
		description,
		serviceTime,
		dishType
	})

	res.json(newItem)
})

router.post('/build', async(req, res, next) => {
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body

	const newItem = FoodItem.build({
		name: name,
		price, //price: price
		vegetarian,
		vegan,
		glutenFree,
		description,
		serviceTime,
		dishType
	})

	newItem.validate()

	await newItem.save()

	res.json(newItem)
})

router.put('/:id', async(req, res) => {
	const foodItem = await FoodItem.findByPk(req.params.id)
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body
	console.log(foodItem)

	if (name) {
		foodItem.name = name
	}

	if (vegetarian !== undefined) {
		foodItem.vegetarian = vegetarian
	}

	await foodItem.save()
	console.log(foodItem)

	res.json({
		updatedFoodItem: foodItem,
		message: 'Successfully updated your food item'
	})
})

router.delete('/:id', async(req, res) => {
	const foodItem = await FoodItem.findByPk(req.params.id)

	if (foodItem) {
		await foodItem.destroy()
	} else {
		return res.json({message: `We do not have a food item with an id of ${req.params.id}`})
	}

	res.json({message: `Successfully deleted a food item with an id of ${req.params.id}`})
})

router.get('/joins', async(req, res) => {
	// const foodItem = await FoodItem.findByPk(2, {
	// 	// include: Drink
	// 	// include: [Drink, Ingredient]
	// 	include: {
	// 		model: Drink, 
	// 		attributes: ['name', 'price']
	// 		// where //WHERE Drinks.name = ?
	// 	},
	// 	attributes: ['name', 'price']
	// 	// where: // WHERE FoodItems.name = ?
	// })

	const drink = await Drink.findOne({
		where: {id: 2},
		include: {
			model: FoodItem,
			include: {
				model: Ingredient,
				through: {
					attributes: []
				}
			}
		}
	})

	res.json(drink)
})

router.get('/getters', async(req, res) => {
	// const foodItem = await FoodItem.findOne()
	// const drink = await foodItem.getDrink()

	const drink = await Drink.findByPk(1)
	// something
	const foodItems = await drink.getFoodItems()
	res.json({foodItems, drink})
})

router.post('/add', async(req, res) => {
	const drink = await Drink.findByPk(1)

	const foodItem = await drink.createFoodItem({
		name: 'Mashed Potatoes', 
		price: 15, 
		vegetarian: true, 
		vegan: false, 
		glutenFree: true, 
		description: 'Tasty Mashed Taters', 
		serviceTime: 'dinner', 
		dishType: 'side'
	})

	await foodItem.addIngredients([1, 2])

	const newFood = await FoodItem.findOne({
		where: {name: 'Mashed Potatoes'},
		include: [Drink, Ingredient]
	})

	res.json(newFood)
})

module.exports = router;