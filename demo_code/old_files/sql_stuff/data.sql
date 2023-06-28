INSERT INTO drinks (name, type, alcohol_content, price, serving_size_oz)
VALUES
('Apple Juice', 'juice', 0, 6, 12),
('Anett Bianco', 'wine', 12.5, 16, 12.3),
('Lemonade', 'juice', 0, 7, 12),
('Snake Wine', 'Rice Wine', 15, 30, 3),
('Tap Water', 'water', 0,  22, 8),
('Matcha', 'tea', 0, 6, 8),
('Earl Grey', 'tea', 0, 4, 8),
('Sourtoe Cocktail', 'shot', 40, 20, 1),
('Long Island Ice Tea', 'cocktail', 22, 12.00, 16);

INSERT INTO food_items (drink_id, name, price, vegan, vegetarian, gluten_free, service_time, description, dish_type)
VALUES
(1, 'BBQ Brisket Sandwich', 12.99, false, false, false, 'lunch', 'Delicious smoked brisket smothered in our House BBQ Sauce', 'entree'),
(2, 'Oreos', 5, true, true, true, 'snack', 'Classic chocolate sandwich cookies with a sweet and creamy filling', 'appetizer'),
(1, 'Dry-Aged Ribeye', 35.99, false, false, true, 'dinner', 'Prime ribeye aged for 60 days for maximum flavor', 'entree'),
(2, 'Filet Mignon', 38.99, false, false, true, 'dinner', '8 oz tenderloin steak cooked to perfection', 'entree'),
(1, 'Cajun Chicken Pasta', 14.99, false, false, false, 'dinner', 'A pasta dish with chicken and spicy alfredo sauce', 'entree'),
(2, 'Chicken Tenders', 10, false, false, false,' all the time', 'everyones favorite', 'entree'),
(3, 'Jellied Moose Nose', 14.99, false, false, true, 'dinner', 'Canadian delicacy made from the snout of a moose, cooked and cooled in a brothy liquid', 'appetizer'),
(4, 'Deep Fried Tarantulas', 15.99, false, false, true, 'dinner', 'A Cambodian delicacy - crispy fried tarantulas served with a tangy lime and black pepper dip', 'exotic');

INSERT INTO ingredients (name, quantity, price_per_unit, storage)
VALUES
('Oreos', 10, 4.39, 'dry'),
('Butter', 50, 3.50, 'cold'),
('Moose Noses', 300, 9.99, 'cold'),
('Kangaroo Steak', 1, 25.00, 'frozen');

INSERT INTO food_item_ingredients (food_item_id, ingredient_id)
VALUES
(2, 1),
(7, 3),
(4, 2),
(5, 2),
(6, 2),
(8, 2),
(4, 4);