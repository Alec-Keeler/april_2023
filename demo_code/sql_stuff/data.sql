INSERT INTO food_items (name, price, vegan, vegetarian, gluten_free, service_time, description, dish_type)
VALUES
('BBQ Brisket Sandwich', 12.99, false, false, false, 'lunch', 'Delicious smoked brisket smothered in our House BBQ Sauce', 'entree'),
('Oreos', 5, true, true, true, 'snack', 'Classic chocolate sandwich cookies with a sweet and creamy filling', 'appetizer'),
('Dry-Aged Ribeye', 35.99, false, false, true, 'dinner', 'Prime ribeye aged for 60 days for maximum flavor', 'entree'),
('Filet Mignon', 38.99, false, false, true, 'dinner', '8 oz tenderloin steak cooked to perfection', 'entree'),
('Cajun Chicken Pasta', 14.99, false, false, false, 'dinner', 'A pasta dish with chicken and spicy alfredo sauce', 'entree'),
('Chicken Tenders', 10, false, false, false,' all the time', 'everyones favorite', 'entree'),
('Jellied Moose Nose', 14.99, false, false, true, 'dinner', 'Canadian delicacy made from the snout of a moose, cooked and cooled in a brothy liquid', 'appetizer'),
('Deep Fried Tarantulas', 15.99, false, false, true, 'dinner', 'A Cambodian delicacy - crispy fried tarantulas served with a tangy lime and black pepper dip', 'exotic');

INSERT INTO drinks (name, type, alcohol_content, price, serving_size_oz)
VALUES
('Apple Juice', 'juice', 0, 6, 12),
('Anett Bianco', 'wine', 12.5, 16, 12.3);


INSERT INTO ingredients (name, quantity, price_per_unit, storage)
VALUES
('Oreos', 10, 4.39, 'dry'),
('Butter', 50, 3.50, 'cold'),
('Moose Noses', 300, 9.99, 'cold');