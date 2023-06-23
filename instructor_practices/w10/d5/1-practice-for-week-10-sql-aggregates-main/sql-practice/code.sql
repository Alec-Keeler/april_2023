-- Q1
SELECT COUNT(*) FROM cats;


-- Q2
SELECT MIN(birth_year), name, birth_year FROM cats;

SELECT MAX(birth_year), name, birth_year FROM cats;

-- Q3
SELECT COUNT(*), cat_id FROM toys
GROUP BY cat_id;

SELECT COUNT(*), cat_id, cats.name FROM toys
JOIN cats ON (cats.id = toys.cat_id)
GROUP BY cats.name;


-- Q4
SELECT COUNT(*), cat_id FROM toys
GROUP BY cat_id
HAVING COUNT(*) >= 2;

SELECT COUNT(*), cat_id, cats.name FROM toys
JOIN cats ON (cats.id = toys.cat_id)
GROUP BY cats.name
HAVING COUNT(*) >= 2;