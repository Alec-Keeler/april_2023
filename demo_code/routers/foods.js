const express = require('express')
const router = express.Router()

const { FoodItem, FoodItemIngredient, Drink, Ingredient } = require('../db/models')
const { Op } = require("sequelize");


// query methods: findAll, findOne, findByPk
// other methods: update, destroy

router.get('/', async(req, res) => {
	// const foodItems = await FoodItem.findAll({
	// 	order: [['price']],
	// 	// attributes: ['name', 'price'],
	// 	where: {
	// 		price: {
	// 			[Op.gte]: 12
	// 		},
	// 		vegan: false
	// 	}
	// }) // SELECT * FROM FoodItems

	const foodItems = await FoodItem.scope(['defaultScope', 'orderByName', 'orderByPrice',]).findAll()

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

const foodItemChecker = (req, res, next) => {
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body
	const errors = []
	if (name.length < 5 || name.length > 100) {
		errors.push('Name must be between 5 and 100 characters')
	}
	if (price < 5) {
		errors.push('Price must be at least 5')
	}
	const dishTypes = ['entree', 'appetizer', 'exotic', 'main', 'dessert', 'soup', 'salad', 'side', 'kids']
	if (!dishTypes.includes(dishType)) {
		errors.push('Dish type must be one of: entree, appetizer, exotic, main, dessert, soup, salad, side, kids')
	}

	if (errors.length > 0) {
		const err = new Error('Errors occurred with creating a new food item')
		err.statusCode = 403
		err.errors = errors
		return next(err)
	}
	next()
}

router.post('/create', foodItemChecker, async(req, res) => {
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body
	// const newItem = await FoodItem.create({
	// 	name: name,
	// 	price, //price: price
	// 	vegetarian,
	// 	vegan,
	// 	glutenFree,
	// 	description,
	// 	serviceTime,
	// 	dishType
	// })

	// res.json(newItem)
	res.json('success')
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

router.put('/:id', async(req, res, next) => {
	const foodItem = await FoodItem.findByPk(req.params.id)
	const { name, price, vegetarian, vegan, glutenFree, description, serviceTime, dishType } = req.body
	// console.log(foodItem)

	if (!foodItem) {
		const err = new Error(`We do not have a food item with an id of ${req.params.id}`)
		err.statusCode = 404
		return next(err)
	}

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

router.delete('/:id', async(req, res, next) => {
	const foodItem = await FoodItem.findByPk(req.params.id)

	if (foodItem) {
		await foodItem.destroy()
	} else {
		// return res.json({message: `We do not have a food item with an id of ${req.params.id}`})
		const err = new Error(`We do not have a food item with an id of ${req.params.id}`)
		err.statusCode = 404
		return next(err)
	}

	res.json({message: `Successfully deleted a food item with an id of ${req.params.id}`})
})

router.get('/joins', async(req, res) => {
	const foodItem = await FoodItem.findByPk(2, {
		// include: Drink
		// include: [Drink, Ingredient]
		include: {
			model: Drink, 
			attributes: ['name', 'price'],
			as: 'DrinkRecommandations'
			// where //WHERE Drinks.name = ?
		},
		attributes: ['name', 'price']
		// where: // WHERE FoodItems.name = ?
	})

	// const drink = await Drink.findOne({
	// 	where: {id: 2},
	// 	include: {
	// 		model: FoodItem,
	// 		include: {
	// 			model: Ingredient,
	// 			through: {
	// 				attributes: []
	// 			}
	// 		}
	// 	}
	// })

	res.json(foodItem)
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

router.get('/agg', async(req, res) => {
	const maxPrice = await FoodItem.max('price')
	const minPrice = await FoodItem.min('price')
	const totalItems = await FoodItem.count({
		// where: {
		// 	name: {
		// 		[Op.substring]: 'Chicken'
		// 	}
		// }
	})
	const sumPrice = await FoodItem.sum('price')
	const avgPrice = sumPrice/totalItems

	// const highestPricedFoodItem = await FoodItem.findOne({
	// 	where: {
	// 		price: maxPrice
	// 	}
	// })

	const highestPricedFoodItem = await FoodItem.findOne({
		order: [['price', 'DESC']]
	})

	console.log(highestPricedFoodItem)
	console.log(highestPricedFoodItem.toJSON())
	const item = highestPricedFoodItem.toJSON()

	item.minPrice = minPrice
	item.maxPrice = maxPrice
	item.totalItems = totalItems
	item.sumPrice = sumPrice
	item.avgPrice = avgPrice

	res.json(item)
	// res.json({
	// 	minimumPrice: minPrice,
	// 	maximumPrice: maxPrice,
	// 	totalNumFoodItems: totalItems,
	// 	sumPrice,
	// 	avgPrice,
	// 	highestPricedFoodItem
	// })
})

router.get('/search', async(req, res) => {
	// pagination conditions:
		// set default values incase values are not provided
		// if page or size are less than 1, do not include pagination in query
	let {page, size, vegan, maxPrice, drink} = req.query

	let queryObj = {
		order: [['name', 'ASC']],
		where: {},
		include: []
		// include: Drink
	}

	if (!page) page = 1
	if (!size) size = 5

	// let pagination = {}

	if (size >= 1 && page >= 1) {
		// pagination.limit = size
		// pagination.offset = (page - 1) * size
		queryObj.limit = size
		queryObj.offset = (page - 1) * size
	}

	if (vegan !== undefined) {
		if (vegan === 'true') queryObj.where.vegan = true
		if (vegan === 'false') queryObj.where.vegan = false
	}

	if (maxPrice) {
		queryObj.where.price = {
			[Op.lte]: maxPrice
		}
	}

	if (drink) {
		queryObj.include.push({
			model: Drink,
			where: {
				name: drink
			},
			as: 'DrinkRecommandations'
		})
	}
	
	const foodItems = await FoodItem.findAll(queryObj)

	res.json({
		searchResult: foodItems
	})
})

module.exports = router;