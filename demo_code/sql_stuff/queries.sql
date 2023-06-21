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