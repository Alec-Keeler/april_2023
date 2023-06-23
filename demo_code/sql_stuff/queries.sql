SELECT * FROM food_items;

SELECT name, price FROM food_items;

SELECT * FROM food_items
WHERE name = 'Oreos';

SELECT name, price FROM food_items
WHERE price <= 14.99;

SELECT name, price, vegan, gluten_free FROM food_items
WHERE price >= 14.99 AND gluten_free = 1;

DELETE FROM food_items
WHERE name = 'Jellied Moose Nose';

DELETE FROM food_items
WHERE price >= 30.00;

UPDATE food_items
SET price = 6
WHERE name = 'Oreos';

-- UPDATE food_items
-- SET price = price + 2
-- WHERE gluten_free = 1;

SELECT name, price FROM food_items
WHERE name LIKE '%chicken%';

-- SELECT name, alcohol_content FROM drinks
-- WHERE alcohol_content >= 10 AND alcohol_content <= 30;

-- SELECT name, alcohol_content FROM drinks
-- WHERE alcohol_content BETWEEN 10 AND 30;

SELECT * FROM ingredients
WHERE storage IN ('cold', 'frozen');

SELECT * FROM drinks
ORDER BY alcohol_content DESC
LIMIT 2;

SELECT name, price FROM food_items
ORDER BY price DESC
LIMIT 1;

SELECT name, price FROM food_items
ORDER BY price DESC
LIMIT 1
OFFSET 1;


SELECT drinks.name, drinks.id, food_items.drink_id, food_items.name FROM food_items
JOIN drinks ON (drinks.id = food_items.drink_id)
WHERE drinks.name = 'Apple Juice';

SELECT food_items.name, food_items.id, food_item_ingredients.food_item_id, 
	food_item_ingredients.ingredient_id, ingredients.id, ingredients.name 
FROM food_item_ingredients
JOIN food_items ON (food_item_ingredients.food_item_id = food_items.id)
JOIN ingredients ON (ingredients.id = food_item_ingredients.ingredient_id)
WHERE food_items.name = 'Oreos';

SELECT drinks.name, food_items.name, ingredients.name FROM food_items
JOIN drinks ON (drinks.id = food_items.drink_id)
JOIN food_item_ingredients ON (food_items.id = food_item_ingredients.food_item_id)
JOIN ingredients ON (food_item_ingredients.ingredient_id = ingredients.id)
WHERE ingredients.name = 'Butter';

SELECT AVG(price), drink_id FROM food_items
GROUP BY drink_id
HAVING drink_id IN (1, 2, 3);








SELECT drinks.name, drinks.id, food_items.drink_id, food_items.name FROM food_items
JOIN drinks ON (drinks.id = food_items.drink_id)
WHERE drinks.name = 'Apple Juice';



SELECT * FROM food_items
WHERE drink_id IN (
	SELECT id FROM drinks
	WHERE drinks.alcohol_content = 0
);

-- ingredients.name = 'Butter'
-- list of drink names

SELECT * FROM drinks
WHERE id IN (
	SELECT drink_id FROM food_items
	WHERE id IN (
		SELECT food_item_id FROM food_item_ingredients
		WHERE ingredient_id IN (
			SELECT id FROM ingredients
			WHERE ingredients.name = 'Butter'
		) 
	)
);

DELETE FROM food_items
WHERE drink_id IN (
	SELECT id FROM drinks
	WHERE drinks.name = 'Apple Juice'
);