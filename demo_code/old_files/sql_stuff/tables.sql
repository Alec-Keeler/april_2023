PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS food_item_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS food_items;
DROP TABLE IF EXISTS drinks;


CREATE TABLE drinks (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL UNIQUE,
	type VARCHAR(25),
	alcohol_content DECIMAL(3,1) NOT NULL,
	price DECIMAL(5,2) NOT NULL,
	serving_size_oz DECIMAL(3,1)
);

CREATE TABLE food_items (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL UNIQUE,
	price DECIMAL(5,2) NOT NULL,
	vegan BOOLEAN NOT NULL DEFAULT false,
	vegetarian BOOLEAN NOT NULL DEFAULT false,
	gluten_free BOOLEAN NOT NULL DEFAULT false,
	description VARCHAR(255),
	service_time VARCHAR(25),
	dish_type VARCHAR(25) NOT NULL,
	-- drink_id INTEGER,
	-- FOREIGN KEY (drink_id) REFERENCES drinks(id) ON DELETE SET NULL
	drink_id INTEGER REFERENCES drinks(id) ON DELETE SET NULL
);

CREATE TABLE ingredients (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(200) NOT NULL,
	quantity INTEGER NOT NULL DEFAULT 1,
	price_per_unit DECIMAL(5,2) NOT NULL,
	storage VARCHAR(20) NOT NULL
);

CREATE TABLE food_item_ingredients (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	food_item_id INTEGER REFERENCES food_items (id) ON DELETE CASCADE,
	ingredient_id INTEGER REFERENCES ingredients (id) ON DELETE CASCADE
);