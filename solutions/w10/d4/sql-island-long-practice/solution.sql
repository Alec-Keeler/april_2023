-- The following queries are examples for how to get the expected results in the
-- game. As always, you may have come up with a different, equally valid 
-- solution!

-- How can I see a list of all inhabitants?
SELECT *
FROM inhabitant;

-- Let's see who is friendly on this island?
SELECT *
FROM inhabitant
WHERE state = 'friendly';

-- There is no way around getting a sword for myself.
-- I will now try to find a friendly weaponsmith to forge me one.
SELECT *
FROM inhabitant
WHERE state = 'friendly'
  AND job = 'weaponsmith';

-- Maybe other friendly smiths can help you out, e.g. a blacksmith.
SELECT *
FROM inhabitant
WHERE state = 'friendly'
  AND job LIKE '%smith';

-- What's my personid?
SELECT personid
FROM inhabitant
WHERE name = 'Stranger';

-- How much gold do you have?
SELECT gold
FROM inhabitant
WHERE personid = 20;

-- Can I make a list of all items that don't belong to anyone?
SELECT *
FROM item
WHERE owner IS NULL;

-- Do you know a trick how to collect all the ownerless items?
UPDATE item
SET owner = 20
WHERE owner IS NULL;

-- Now list all of the items I have!
SELECT *
FROM item
WHERE owner = 20;

-- Find a friendly inhabitant who is either a dealer or a merchant.
SELECT *
FROM inhabitant
WHERE state = 'friendly'
  AND (
    job = 'dealer'
    OR job = 'merchant'
  );
-- You could also use `IN` for the job filter
SELECT *
FROM inhabitant
WHERE state = 'friendly'
  AND job IN ('dealer', 'merchant');

-- I'd like to get the ring and the teapot. The rest is nothing but scrap. 
-- Please give me the two items. My personid is 15.
UPDATE item
SET owner = 15
WHERE item IN ('ring', 'teapot');

-- Maybe it's not a bad idea to change my name from Stranger to my real name 
-- before I will apply for a job.
UPDATE inhabitant
SET name = 'Your Name'
WHERE personid = 20;

-- List all bakers and use 'ORDER BY gold' to sort the results.
-- 'ORDER BY gold DESC' is even better because then the richest baker is on top.
SELECT *
FROM inhabitant
WHERE job = 'baker'
ORDER BY gold DESC;

-- Is there a pilot on this island by any chance? He could fly me home.
SELECT *
FROM inhabitant
WHERE job = 'pilot';

-- I can use the join to find out the chief 's name of the village Onionville.
SELECT inhabitant.name
FROM inhabitant
  JOIN village ON (village.chief = inhabitant.personid)
  AND village.name = 'Onionville';

-- Shall I tell you how many women there are in Onionville?
SELECT COUNT(*)
FROM inhabitant
  JOIN village ON (inhabitant.villageid = village.villageid)
WHERE village.name = 'Onionville'
  AND inhabitant.gender = 'f';

-- Oh, only one woman. What 's her name?
SELECT inhabitant.name
FROM inhabitant
  JOIN village ON (inhabitant.villageid = village.villageid)
WHERE village.name = 'Onionville'
  AND inhabitant.gender = 'f';

-- If I continue working and selling items though, I could earn more gold than 
-- the worth of gold inventories of all bakers, dealers and merchants together.
-- How much gold is that?
SELECT SUM(inhabitant.gold)
FROM inhabitant
WHERE job IN ('baker', 'dealer', 'merchant');

-- How much gold do different inhabitants have on average, depending on their 
-- state (friendly,...) ?
SELECT state,
  AVG(inhabitant.gold)
FROM inhabitant
GROUP BY state
ORDER BY AVG(inhabitant.gold) DESC;

-- Heeeey! Now I 'm very angry! What will you do next, Your Name?
DELETE FROM inhabitant
WHERE name = 'Dirty Diane';

-- How would you change Diane to be friendly instead?
-- Yeah! Now I release the pilot!
UPDATE inhabitant
SET state = 'friendly'
WHERE job = 'pilot';

-- Congratulations! You escaped the island!
