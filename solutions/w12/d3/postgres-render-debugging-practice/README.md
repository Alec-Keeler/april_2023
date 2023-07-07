# Postgres and Render Debugging Practice

In this practice, you will test and debug an Express-Sequelize server using a
[Render.com] PostgresQL database server.

This exercise will prepare you to debug and deploy your first project.

## Pre-requisites

First, complete the following readings to understand the database architecture
pattern you will be using, and learn how to setup a schema in an Express and
Sequelize application. You will not need to set up the schema yourself in this
exercise, but you will need to be familiar with the changes so that you can
debug the server.

1. __Exploring Database Architecture Patterns__
2. __Setting up a Schema in Express and Sequelize__

Next, set up a [Render.com] PostgresQL database instance. This is the database
that you will use in production for your practice application, and the database
you will use during this practice. You will be connecting to this database locally
through Sequelize and the PSQL shell.

3. __Setting up a Postgres Database Instance on Render.com__

Finally, you will need to download the PSQL Command Line Tools, which will allow
you to access and interact with your Render PostgresQL database from the terminal.
Read the following article and complete the installation.

4. __Install PSQL Command Line Tools__


## Setup

1. Run the `1-setup-commands-basic.sh` script to install dependencies at the
   root and __server__ directories. This will also migrate and seed your SQLite3
   development database, located at __server/db/dev.db__.

2. Examine the output in the console. If migration and seeding was successful,
   you should see the following at the bottom of the output:

```plaintext
----- Tables Have Data? -----
bandCount|5
instrumentCount|8
musicianCount|10
musicianInstrumentCount|16
```

3. Run `npm test` to run all mocha tests. __All 4 tests are expected to pass
   with the SQLite3 development database.__

## Phases

In the phases that follow, you will learn how to locally configure this server
to use a PostgresQL database hosted on Render instead of SQLite3. The
migration and seeding will fail due to a few common bugs related to
differences between SQLite3 and PostgresQL.

You will need to debug the server code so that it works locally with the
PostgresQL database server.

__Phase 1__: Configuring Node Environments
__Phase 2__: Using PSQL Command Line Tools
__Phase 3__: Debugging the Association
__Bonus Phase 4__: Debugging Other Common Issues

[Render.com]: https://render.com/
