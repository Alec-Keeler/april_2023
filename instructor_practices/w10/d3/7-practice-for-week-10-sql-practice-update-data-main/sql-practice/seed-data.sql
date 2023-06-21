DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

INSERT INTO friends (first_name, last_name)
VALUES
  ('Ryan', 'Pond'),
  ('Sky', 'Tyler'),
  ('Morgan', 'Jones'),
  ('Shannon', 'Noble'),
  ('River', 'Song');

SELECT * FROM friends;

-- Update 1
UPDATE friends
SET first_name = 'Ryder'
WHERE first_name = 'Ryan' AND last_name = 'Pond';
-- WHERE id = 1;

SELECT * FROM friends;