-- Step 1
-- Connecting both sides of a many-to-many relationship involves JOINing the
-- join table on to one side of the relationship, then JOINing the other side
-- on to the join table.
--!!START
SELECT musicians.first_name, instruments.type
FROM instruments
  JOIN musician_instruments ON (
    instruments.id = musician_instruments.instrument_id
  )
  JOIN musicians ON (musicians.id = musician_instruments.musician_id)
--!!END
