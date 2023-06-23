-- Step 1
-- JOIN the tables, matching FOREIGN KEYs to the corresponding PRIMARY KEY.
--!!START
SELECT bands.name, albums.title
FROM albums
    JOIN bands ON (bands.id = albums.band_id);
--!!END
