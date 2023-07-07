# Bonus Phase 4: Debugging Other Common Issues

In this phase, you will add a feature with some buggy code to the starter
project. You will then simulate the production environment, and try to migrate
and seed the PostgresQL database. You will use the PSQL Command Line Tools and
error messages to help you debug the code.

Use the commands in the __2-setup-commands-postgres.md__ file for reference.

## Setup

First, drop the schema in your database so you are starting with an empty
database.

Enter your PSQL Command to access the PostgresQL database, then run the command to
drop the schema. Confirm that the `test_schema` no longer exists by running the
command to list schemas. You should only see the default `public` schema listed.

Next, rename the server database directories so you can work with a new server
for the bonus phase.

1. Rename the __server/db__ directory __server/db-basic__.
2. Rename the __server/db-bonus__ directory __server/db__.

In the __.env__ file, change the `NODE_ENV` to `development`.

Migrate and seed the development database for the new server by running the following setup script.

`sh 3-setup-commands-bonus.sh`

If successful your SQLite3 development database located at __server/db/dev.db__ should be seeded, and you should see the following printed out in the console:

```shell
----- Tables Have Data? -----
treeCount|5
insectCount|2
insectTreeCount|5
```

After you have confirmed that everything is working in the development
environment with the SQLite3 database, change the `NODE_ENV` variable back to
`production` in the __.env__ file.

## Common Bug 1: Debugging Schema-Related Problems

Set up your Postgres production database by trying to run the first three
commands in the __2-setup-commands-postgres.md__ file.

**This migration is expected to fail!**

```shell
Sequelize CLI [Node: 16.15.0, CLI: 6.6.0, ORM: 6.6.5]
Loaded configuration file "config/database.js".
Using environment "production".
== 20211130040722-create-tree: migrating =======
== 20211130040722-create-tree: migrated (0.200s)

== 20211202064406-create-insect: migrating =======
== 20211202064406-create-insect: migrated (0.211s)

== 20211204211035-create-insect-tree: migrating =======

ERROR: relation "test_schema.Insects" does not exist
```

Use Polya's problem solving framework to understand the problem, make a plan,
carry out the plan, and look back and improve your solution.

A few tips:

- This first bug is related to the __schema__. Use the PSQL Command Line tools
  to look at your tables within the `test_schema` schema as well as inside the
  `public` schema.
- Refer back to the "Setting up a Schema in Express and Sequelize" reading at
  __pre-requisite-readings/2-schema-express-sequelize.md__ to help isolate the
  problem.
- Make sure you drop the `test_schema` in the PostgresQL database, and any tables
  that may have ended up in the `public` schema, before testing any new code
  changes.

By the end of this phase, you should be able to run the migration command
successfully, but the seeding command is expected to fail. You will debug the
seeding in the next step.

## Common Bug 2: Debugging Data Type Problems

One more common type of bug to look out for is related to data types. Sequelize
has many built-in data types, but SQLite3 and PostgresQL have their own sets of
data types that are compatible with the Sequelize data types. In many cases,
SQLite3 and PostgresQL will each use a slightly different data type to enforce the
data type validation that is defined in the Sequelize models and migrations.

Look through the [Data Types tables in the Sequelize documentation] to see how
various database dialects use different data types to enforce the built-in
Sequelize data types. Bookmark this resource to use as a debugging resource for
this bug, and for debugging data type bugs in the future.

Continue using Polya's problem solving framework to solve the data type bug,
which shows up after running the seeding command.

**This seeding is expected to fail!**

```shell
Sequelize CLI [Node: 16.15.0, CLI: 6.6.0, ORM: 6.6.5]

Loaded configuration file "config/database.js".
Using environment "production".
== 20211130053831-biggest-trees: migrating =======
== 20211130053831-biggest-trees: migrated (0.191s)

== 20211202065724-smallest-insects: migrating =======

ERROR: value too long for type character varying(255)
```

Use Polya's problem solving framework to understand the problem, make a plan,
carry out the plan, and look back and improve your solution.

A few tips:

- The error message is clear that a value is too long for a constraint or
  validation. Scroll upwards to the SQL that was executed during migration. Can
  you see any evidence of data type validations in the SQL? What is the maximum
  length?
- Look at your seed data - which seed is causing the problem?
- Use the [Data Types tables in the Sequelize documentation] to choose a
  different data type for the column that is causing the issue.
- Make sure you drop the `test_schema` in the Postgres database, before testing
  any new code changes.

By the end of this phase, you should be able to successfully seed the table that
failed, but seeding of the last table is still expected to fail. You will debug
seeding of the final table in the next step.


## Common Bug 3: Debugging Association-Related Problems

Continue using Polya's problem solving framework to solve the next bug, which
shows up after running the seeding command.

**This seeding is expected to fail!**

```shell
Sequelize CLI [Node: 16.15.0, CLI: 6.6.0, ORM: 6.6.5]
Loaded configuration file "config/database.js".
Using environment "production".
== 20211130053831-biggest-trees: migrating =======
== 20211130053831-biggest-trees: migrated (0.208s)

== 20211202065724-smallest-insects: migrating =======
== 20211202065724-smallest-insects: migrated (0.180s)

== 20211204211320-starter-insect-tree: migrating =======

ERROR: column "InsectId" does not exist
```

A few tips:
- This second bug is related to your associations. Use the PSQL Command Line
  tools to look at your table names and column names within the `test_schema`.
- Make sure you drop the `test_schema` in the PostgresQL database before testing
  any new code changes.

By the end of this step, you should be able to run both the migration and seed
commands successfully, and should be able to use the PSQL Command Line Tool to
view seed data in all three tables.



[Data Types tables in the Sequelize documentation]: https://sequelize.org/docs/v7/other-topics/other-data-types/
