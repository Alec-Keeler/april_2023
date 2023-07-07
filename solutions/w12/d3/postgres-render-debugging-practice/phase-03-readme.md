# Phase 3: Debugging the Association

In the last phase, you migrated and seeded a PostgresQL database in a simulated
production environment, but the seeding failed. In this phase, you will complete
a walkthrough of Polya's problem solving framework to understand the bug, make
and carry out the plan, and improve the solution if needed.

## 1. Understand the Problem

You saw the following output after seeding the `MusicianInstruments` table and
checking the contents of that table.

After seeding:

```shell
== 20211021190325-add-instruments-to-musicians: migrating =======

ERROR: column "InstrumentId" does not exist
```

Contents of `MusicianInstruments` table:

```shell
test_i68k=> SELECT * FROM "test_schema"."MusicianInstruments";
 id | musicianId | instrumentId | createdAt | updatedAt
----+------------+--------------+-----------+-----------
(0 rows)
```

If you compare both blocks of output above, you can see that the seeding of the
file failed because _column "InstrumentId" does not exist_. You can also see
that the "MusicianInstruments" table has a `musicianId` and `instrumentId`
column, but does NOT have a `InstrumentId` column.

First, review what you know about this table:

- It is a join table because it references the ids from two other tables
- It is representing a many to many relationship between musicians and
  instruments

Next, review the blueprint for this table, and the Sequelize associations that
are already defined, to find the problem:

- How are the tables and columns defined in the model files and migration files?
- How is the many to many relationship defined in the model files?

When you review the model files, you can see that a `belongsToMany` association
is set on the `Musician` and `Instrument` model, each `through` the other model.
You can see that the `MusicianInstrument` column names are defined in camel case
(`instrumentId` and `musicianId`).

A quick review of the migration files shows that all column names are defined in
camel case as well.

__Why is PostgresQL looking for the Pascal case version of `InstrumentId`?__

To understand the problem, you need to explore some features of Sequelize, and
some differences between SQLite3 and PostgresQL.

First, Sequelize allows us to explicitly define table names and column names,
and here at App Academy, we have been using the PascalCase convention for table
names (`Musicians`) and camelCase for column names (`firstName`). We explicitly
define these in our models when we initiate the class.

However, Sequelize also makes assumptions based on provided information to
determine any values that are NOT explicitly defined. In `belongsToMany`
associations, for example, if we do not explicitly define the foreign keys of two
instances being associated, then Sequelize will assume that the names are
PascalCased (`InstrumentId`), because it will just add "Id" to the end of the
model name "Instrument".

Similar to Sequelize, SQLite3 also makes assumptions. SQLite3 will automatically
lowercase any schema, table, and column names. Therefore, in development with
the SQLite3 database, `InstrumentId` is automatically lowercased to
`instrumentid`. This matches the casing of the column name that was explicitly
defined in the `MusicianInstrument` table, and allows the table to seed
successfully.

PostgresQL, on the other hand, is very strict. It is using the PascalCase
`InstrumentId` column name that was assumed by Sequelize, and as a result does
not find that column name in the `MusicianInstruments` table. It throws an
error, and does not seed the table.

## 2. Make a Plan

The root cause of this seeding problem in PostgresQL is that Sequelize is assuming
the casing of the `foreignKey` and `otherKey` in the `belongsToMany` association
to be PascalCase (`InstrumentId`). You can fix this by explicitly defining the
column names for the `foreignKey` and `otherKey` references in the
`belongsToMany` association. This will make Sequelize use these column
names instead of the assumed column names.

The `foreignKey` is the key in the join table that relates to the current model.
The `otherKey` is the key in the join table that relates to the model that you
are associating the current model with.

You can look at the [Sequelize documentation] for Advanced Associations for an
example of correct syntax for defining the `foreignKey` and `otherKey`. Look at the third code block down.

## 3. Carry Out the Plan

Using the information above, change your code to try to fix the problem.

After you implement your fix, test that it still works in the development environment. Change the value of `NODE_ENV` in the __.env__ file back to `development`.

Run `sh 1-setup-commands-basic.sh` to reset your development SQLite3 database.

Run the mocha tests from the root directory to make sure the code is still
passing all tests with your changes.

## 4. Look Back and Improve your Solution

Finally, test your changes by simulating the production environment.

Change the value of `NODE_ENV` in the __.env__ file back to `production`.

You will also need to recreate the `DATABASE_URL` environment variable.  Set
the Render database instance's External URL as the value.

Follow the commands summarized in the __2-setup-commands-postgres.md__ file to
implement the schema, migrate tables, and seed data in the PostgresQL database.

If you fixed the bug with the many to many association, you should be able to
see 16 rows of seed data in the `MusicianInstruments` table:

```shell
test_i68k=> SELECT * FROM "test_schema"."MusicianInstruments";
 id | musicianId | instrumentId |         createdAt          |         updatedAt
----+------------+--------------+----------------------------+----------------------------
  1 |          1 |            1 | 2023-03-15 15:13:36.354+00 | 2023-03-15 15:13:36.354+00
  2 |          1 |            2 | 2023-03-15 15:13:36.354+00 | 2023-03-15 15:13:36.354+00
# ... list continues ...
 16 |         10 |            5 | 2023-03-15 15:13:37.963+00 | 2023-03-15 15:13:37.963+00
(16 rows)
```

If the database seeds correctly, congratulations! You are done with this phase.

If it did not seed correctly, use the process described above to address any
other errors you encounter. Keep in mind the following:

- Carefully examine any error output for the casing of table names and column
  names. If there is a mismatch between what Sequelize is using and what you see
  in the database, you will need to explicitly define the value in Sequelize.

- You must explicitly define the casing of the `foreignKey` and `otherKey`
  properties on all `belongsToMany` associations to work with the Render
  PostgresQL database.

[Sequelize documentation]: https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#aliases-and-custom-key-names
