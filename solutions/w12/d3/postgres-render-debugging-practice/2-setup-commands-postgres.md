# Setup and Testing Commands for Postgres Database

Run the following commands from the __server__ directory:

1. Run setup script to create schema

`node psql-setup-script.js`

2. Run migration files

`npx dotenv sequelize db:migrate`

3. Run seeder files

`npx dotenv sequelize db:seed:all`

4. Connect to Postgres database

_(USE PSQL COMMAND FROM RENDER DATABASE - Copy / Paste below)_ **Never commit
this string to git. Make sure that any files that contain this string (for
example, this 2-setup-commands-postgres.md file) are in the .gitignore file, and
check that the file is properly being ignored by git.**



5. Check schema exists

`\dn`

6. Check tables exist within schema

`\dt "test_schema".*`

_TIP: You can also check that tables do NOT exist in the default public schema by running ``\dt "public".*`_

7. Check seed data exists

`SELECT * FROM "test_schema"."Bands";`

`SELECT * FROM "test_schema"."Instruments";`

`SELECT * FROM "test_schema"."Musicians";`

`SELECT * FROM "test_schema"."MusicianInstruments";`

_TIP: Make sure you are enclosing the schema name in double quotes, AND
enclosing the table name in double quotes. You must include the semi-colon at
the end of each SQL command._

8. Drop schema _(only if needed)_

`DROP SCHEMA test_schema CASCADE;`

9. Close database connection and quit PSQL

control-d
