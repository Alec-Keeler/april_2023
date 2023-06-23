-- These are example steps that could be taken to work this murder mystery case.
-- As always, your steps may be completely different and still find the same
-- answer in the end.
-- Get initial information from the crime_scene_report table
SELECT *
FROM crime_scene_report
WHERE type = 'murder'
  AND date = '20180115'
  AND city = 'SQL City';
/*
 NEW INFORMATION: Relevant Report: 
 Security footage shows that there were 2 witnesses. The first witness lives at 
 the last house on "Northwestern Dr".The second witness, named Annabel, lives 
 somewhere on "Franklin Ave".
 */


-- Get information about the first witness
-- The first witness lives in the last house on 'Northwestern Dr', meaning they 
-- will have the largest `address_number`.
SELECT *
FROM person
WHERE address_street_name = 'Northwestern Dr'
ORDER BY address_number DESC
LIMIT 1;
/*
 NEW INFORMATION: Witness 1: 
 Name: Morty Schapiro 
 id: 14887, 
 license_id: 118009, 
 address_number: 4919, 
 address_street_name: Northwestern Dr, 
 ssn: 111564949
 */


-- Get information about the second witness
-- The first witness' name is 'Annabel' and lives on 'Franklin Ave'
-- LIKE has to be used for the name because the last name is unknown
SELECT *
FROM person
WHERE address_street_name = 'Franklin Ave'
  AND name LIKE 'Annabel%';
/*
 NEW INFORMATION: Witness 1: 
 Name: Annabel Miller
 id: 16371, 
 license_id: 490173, 
 address_number: 103, 
 address_street_name: Franklin Ave, 
 ssn: 318771143
 */


-- Get the transcripts from the interviews with the witnesses
-- Having their name next to the transcript will be helpful, so a JOIN is used
SELECT person.name,
  interview.transcript
FROM person
  JOIN interview ON (person.id = interview.person_id)
WHERE person.name = 'Annabel Miller'
  OR person.name = 'Morty Schapiro';
/* NEW INFORMATION: 
 Morty's Transcript: 
 I heard a gunshot and then saw a man run out. He had a "Get Fit Now Gym" bag. 
 The membership number on the bag started with "48Z". Only gold members have 
 those bags. The man got into a car with a plate that included "H42W". 
 
 Annabel's Transcript: 
 I saw the murder happen, and I recognized the killer from my gym when I was 
 working out last week on January the 9th. 
 */


-- The murderer was at the gym on January 9th, they are a gold member with 
-- membership number starting with '48Z' and a license plate that includes 
-- 'H42W'. 
-- The tables needed will be the `person` table, to ultimately get the name and 
-- to make join tables, the `drivers_license` table for the plate_number, the 
-- `get_fit_now_member` table for the id and to join on the 
-- `get_fit_now_check_in` table for the check_in_date.
SELECT person.*
FROM person
  JOIN drivers_license ON (person.license_id = drivers_license.id)
  JOIN get_fit_now_member ON (person.id = get_fit_now_member.person_id)
  JOIN get_fit_now_check_in ON (
    get_fit_now_member.id = get_fit_now_check_in.membership_id
  )
WHERE (get_fit_now_check_in.check_in_date = 20180109)
  AND (get_fit_now_member.membership_status = 'gold')
  AND (get_fit_now_member.id LIKE '48Z%')
  AND (drivers_license.plate_number LIKE '%H42W%');
/* NEW INFORMATION: 
 Jeremy Bowers committed the murder!
 name: Jeremy Bowers, 
 id: 67318, 
 license_id: 423327, 
 address_number: 530, 
 address_street_name: Washington Pl, Apt 3A, 
 ssn: 871539279 
 */


-- Enter the solution into the solution field.
INSERT INTO solution
VALUES (1, 'Jeremy Bowers');
SELECT value
FROM solution;
/* NEW INFORMATION: 
 Congrats, you found the murderer! But wait, there's more... If you think 
 you're up for a challenge, try querying the interview transcript of the 
 murderer to find the real villain behind this crime. If you feel especially 
 confident in your SQL skills, try to complete this final step with no more than 
 2 queries. Use this same INSERT statement with your new suspect to check your 
 answer. 
 */


-- Get initial information from transcript. The person_id is known from the 
-- previous query, but the `person` table also could have been joined on to 
-- filter by name. 
SELECT *
FROM interview
WHERE person_id = 67318;
/* NEW INFORMATION: 
 Jeremy's Transcript: 
 I was hired by a woman with a lot of money. I don't know her name but I know 
 she's around 5'5" (65") or 5'7" (67"). She has red hair and she drives a Tesla 
 Model S. I know that she attended the SQL Symphony Concert 3 times in December 
 2017. 
 */


-- Gender, height, hair color, car make and car model can all be filtered on the 
-- `drivers_license` table. The `facebook_event_checkin` table can be used to 
-- filter for attendees of the `SQL Symphony Concert` in December 2017. The 
-- person should have multiple checkins, so the results should be grouped by 
-- the person id and then filtered by those having a count of three. 
SELECT person.*
FROM person
  JOIN drivers_license ON (person.license_id = drivers_license.id)
  JOIN facebook_event_checkin ON (person.id = facebook_event_checkin.person_id)
WHERE drivers_license.gender = 'female'
  AND (
    drivers_license.height BETWEEN 65 AND 67
  )
  AND drivers_license.hair_color = 'red'
  AND drivers_license.car_make = 'Tesla'
  AND drivers_license.car_model = 'Model S'
  AND facebook_event_checkin.event_name = 'SQL Symphony Concert'
  AND facebook_event_checkin.date BETWEEN 20171201 AND 20171231
GROUP BY facebook_event_checkin.person_id
HAVING COUNT(*) = 3;
/* NEW INFORMATION: 
 Miranda Priestly hired Jeremy to commit the murder!
 name: Miranda Priestly, 
 id: 99716, 
 license_id: 202298, 
 address_number: 1883, 
 address_street_name: Golden Ave, 
 ssn: 987756388 
 */


-- Enter the solution into the solution field.
INSERT INTO solution
VALUES (1, 'Miranda Priestly');
SELECT value
FROM solution;
/* NEW INFORMATION: 
 Congrats, you found the brains behind the murder! Everyone in SQL City hails you 
 as the greatest SQL detective of all time. Time to break out the champagne!
 */
