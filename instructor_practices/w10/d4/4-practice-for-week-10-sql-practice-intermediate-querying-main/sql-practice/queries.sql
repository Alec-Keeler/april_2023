-- Q1
SELECT * FROM albums
WHERE num_sold >= 100000;

-- Q2
SELECT title, (year - 2000) AS year_2000s FROM albums
WHERE year BETWEEN 2018 AND 2020;

-- Q3
SELECT title, band_id FROM albums
WHERE band_id IN ('1', '3', '4');

-- Q4
SELECT title FROM albums
WHERE title LIKE ('The%');

-- Q5
SELECT * FROM albums
ORDER BY num_sold DESC
LIMIT 2;

-- Q6
SELECT * FROM albums
ORDER BY num_sold DESC
LIMIT 2
OFFSET 2;