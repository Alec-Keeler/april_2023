# Phase 2: Using PSQL Command Line Tools

In this phase, you will simulate a production environment locally. You will add
data to the PostgresQL database and use the PSQL Command Line Tools to check the
contents of your database and interact with your database.

## Adding Data for Local Testing

Now that you have adjusted the __.env__ file to run in production, you are ready
create the schema, migrate your tables, and add seed data to the PostgresQL
database.

In the __server__ directory run the following commands:

1. Run __psql-setup-script.js__

`node psql-setup-script.js`

This should create the `test_schema` schema within your Render.com PostgresQL
database.

If successful, you should see the following SQL command executed in the
terminal:

```shell
Executing (default): CREATE SCHEMA IF NOT EXISTS test_schema;
```

If you do not see the output above, then check your __.env__ file to make
sure you entered the key-value pair for the `DATABASE_URL` properly.

2. Run migration files

`npx dotenv sequelize db:migrate`

This should run all of your migrations.

If successful, you should see the following in the terminal. Note that the
output identifies the current environment as "production", and is using the
configuration determined from the __config/database.js__ file.

```shell
Sequelize CLI [Node: 16.15.0, CLI: 6.6.0, ORM: 6.6.5]

Loaded configuration file "config/database.js".
Using environment "production".
== 20211021000307-create-band: migrating =======
== 20211021000307-create-band: migrated (0.192s)

== 20211021001002-create-instrument: migrating =======
== 20211021001002-create-instrument: migrated (0.185s)

== 20211021015753-create-musician: migrating =======
== 20211021015753-create-musician: migrated (0.191s)

== 20211021031604-create-musician-instrument: migrating =======
== 20211021031604-create-musician-instrument: migrated (0.186s)
```

3. Confirm schema and tables exist in database

You can see the contents of your database by running the Render PSQL Command.
This can be accessed from your [Render.com Dashboard]. Click on your database
instance, and then click on the copy icon next to "PSQL Command".

Enter the PSQL Command directly into the terminal. It should look something
like:

`PGPASSWORD=<followed-by-a-very-long-string>`

You should see a PSQL command prompt, with the name of your Render database. It should look something like:

```shell
test_i68k=>
```

Remember, PSQL is a shell that you can use to interact with a PostgresQL
database instance, similar to how the SQLite3 CLI is used to interact
with SQLite3 database files. You can execute SQL commands in PSQL.

List all schemas in the database by running `\dn`.

You should see something like this (with your own database name):

```shell
test_i68k=> \dn
       List of schemas
    Name     |     Owner
-------------+----------------
 public      | test_i68k_user
 test_schema | test_i68k_user
(2 rows)
```

List all tables within the `test_schema` schema by by running `\dt
"test_schema".*`.

You should see something like this (with your own database name):

```shell
test_i68k=> \dt "test_schema".*
                     List of relations
   Schema    |        Name         | Type  |     Owner
-------------+---------------------+-------+----------------
 test_schema | Bands               | table | test_i68k_user
 test_schema | Instruments         | table | test_i68k_user
 test_schema | MusicianInstruments | table | test_i68k_user
 test_schema | Musicians           | table | test_i68k_user
 test_schema | SequelizeData       | table | test_i68k_user
 test_schema | SequelizeMeta       | table | test_i68k_user
(6 rows)
```

This confirms that your schema exists, and that the four tables are properly migrated within the `test_schema` schema.

Use `Control-d` to close your database connection and exit out of the PSQL
Command Line Tools. You should return back to your regular command prompt, in
the __server__ directory.

4. Run seeder files from the __server__ directory.

`npx dotenv sequelize db:seed:all`

This should run all of your seeder files.

**This is expected to fail, because this is a debugging practice!**

You should see the following output in the terminal:

```shell
Loaded configuration file "config/database.js".
Using environment "production".
== 20211021001539-starter-bands: migrating =======
== 20211021001539-starter-bands: migrated (0.187s)

== 20211021001545-starter-instruments: migrating =======
== 20211021001545-starter-instruments: migrated (0.183s)

== 20211021184554-starter-musicians: migrating =======
== 20211021184554-starter-musicians: migrated (1.835s)

== 20211021190325-add-instruments-to-musicians: migrating =======

ERROR: column "InstrumentId" does not exist
```

_What can you infer from the error message above? Which seeder files were
successfully migrated? Which seeder file failed? Any ideas why this seeder may
have failed?_

5. Check the seed data

Run the following commands, one at a time, to check whether the seed data was
added to each table.

`SELECT * FROM "test_schema"."Bands";`

`SELECT * FROM "test_schema"."Instruments";`

`SELECT * FROM "test_schema"."Musicians";`

`SELECT * FROM "test_schema"."MusicianInstruments";`

You should see seed data in the first three tables, but you should see the
following in the `MusiciansInstruments` table:

```shell
test_i68k=> SELECT * FROM "test_schema"."MusicianInstruments";
 id | musicianId | instrumentId | createdAt | updatedAt
----+------------+--------------+-----------+-----------
(0 rows)
```

There is no seed data in the table.

Compare the column names in this join table (above) to the error message you
received after running the seed command (below):

```shell
== 20211021190325-add-instruments-to-musicians: migrating =======

ERROR: column "InstrumentId" does not exist
```

_What do you think caused this seeder file to fail? Any ideas on how to fix it?

6. Drop the schema

`DROP SCHEMA test_schema CASCADE;`

This command will drop the entire schema and all associated tables and data
within it.

You should see the following in the terminal output:

```shell
test_i68k=> DROP SCHEMA test_schema CASCADE;
NOTICE:  drop cascades to 6 other objects
DETAIL:  drop cascades to table test_schema."SequelizeMeta"
drop cascades to table test_schema."Bands"
drop cascades to table test_schema."Instruments"
drop cascades to table test_schema."Musicians"
drop cascades to table test_schema."MusicianInstruments"
drop cascades to table test_schema."SequelizeData"
DROP SCHEMA
```

7. Close the database connection

Use `Control-d` to close your database connection and exit out of the PSQL
Command Line Tools. You should return back to your regular command prompt, in
the __server__ directory.

## Wrapping up

In this phase, you ran commands to migrate and seed a Postgres database
instance on Render.com,
simulating the production environment. In the process, you found that your
application that worked in development (and passed all the mocha tests) did NOT
work in production. You had to do extra work to set up your production
database and make your application work in the production environment.

The commands you used to create the schema, migrate, seed, and check the
contents of your database are summarized in the __2-setup-commands-postgres.md__
file.

**Paste your PSQL Command from Render into that file and save it.**

You will need to use that file as a reference sheet as you complete the next
debugging phase.

[Render.com Dashboard]: https://dashboard.render.com/
