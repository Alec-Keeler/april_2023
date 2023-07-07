# Phase 1: Configuring Node Environments

The starter is already configured to use a SQLite3 database file for development, a
SQLite3 database file for testing, and a PostgresQL database server URL for production. This
separation of concerns, by using separate databases in different environments,
ensures the security of your data and prevents you from accidentally altering
production data while developing and testing your application locally.

## Understanding Node Environment Configuration

Explore the following files to understand how the server is configured for 3
different Node environments (development, test, and production), and how each
environment uses a different database connection. Make the changes described
below to set up your project for local testing of the production environment.

### 1. server/config/database.js file

The configuration object exported from this file includes a property for each of
the three Node environments.

__No changes are needed in this file.__

The `development` property defines the database
dialect as "sqlite" and points to the location of the database file, defined as
an environment variable.

The `test` property uses the same dialect, but defines
a different location for the test database file.

The `production` property defines the database dialect as "postgres", and points
to the location of the Postgres database through the `use_env_variable`
property.


### 2. .env file

Environment variables are used to define the location of the
development SQLite3 database file (`DB_FILE`) and the test SQLite3 database file
(`TEST_DB_FILE`).

The `NODE_ENV` environment variable defines the current Node environment. It is
currently set to `development`. When you initially ran the setup command script,
the `NODE_ENV` was set to `development` in the __.env__ file, so the script migrated and seeded the development SQLite3 database file (`DB_FILE`).

__Change the value of `NODE_ENV` from `development` to `production` in the .env file.__

This will allow you to test your production database locally for the rest of
this practice.

__Add the following key / value pairs to define environment variables needed for
the PostgresQL production database connection:__

The value for `SCHEMA` should be "test_schema". This specific schema name will
be used in example commands throughout the rest of the practice.

The value for the `DATABASE_URL` can be accessed from your [Render.com
Dashboard]. Click on your database instance, and then click on the copy icon
next to "External Database URL".

```shell
SCHEMA=test_schema
DATABASE_URL=<copied-External-Database-URL>
```

This `DATABASE_URL` is a connection string that identifies the location, name,
and user and password for accessing the database. **Never commit this string to
git. Make sure that any files that contain this string (for example, the .env
file) are in the .gitignore file, and check that the file is properly being
ignored by git.**

### 3. server/models/db/index.js file

The top of this file uses values from the __server/config/database.js__  file as
well as the __.env__ file to create a new Sequelize instance using the correct
database, based on the current Node environment.

__No changes are needed in this file.__

_Can you find the line of code that uses the `DATABASE_URL` to make the
connection to the PostgresQL database in production?_

[Render.com Dashboard]: https://dashboard.render.com/
