# Setting up a Schema in Express and Sequelize

As discussed previously, you will deploy all of your portfolio projects
through Render.com. You will be implementing the _One Database with Multiple
Schemas to Many Applications_ pattern, which will allow you to host all of your
applications for free during your job search.

![database-pattern-4]

So far, you have been developing small projects with Express and Sequelize using
the traditional _One Database to One Application_ pattern. In this article, you
will learn how making a few small changes to your code will allow you to create
a specific schema within the production database, and store all of your tables
within that schema. Sequelize makes it easy to set a global schema for your
application with a few small changes to configuration files, migration files,
and seeder files. After that, no other code changes will be needed, and
Sequelize will automatically apply the schema name when executing SQL commands
and interacting with the database in the production environment.

Below is a "cookbook" for adjusting an existing Express and Sequelize
application to use this new database pattern.

>_Note: These instructions assume that your backend code is enclosed within a
>`backend` directory. If you are adjusting a project with a different directory
>structure, you will need to adjust the instructions and paths accordingly._

## Step 1: Create a setup script that creates a schema

Add a new environment variable, `SCHEMA` to your __.env__ file. Replace
`<schema_name>` with a unique schema name for the project. Note that the
`SCHEMA` must be a string written in snake_case.

```shell
SCHEMA=<schema_name>  # must be in snake case, for example, api_project
```

Now, create a script called __psql-setup-script.js__ within the backend
directory of your project. Add this code to the script:

```js
// backend/psql-setup-script.js

const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
```

This code checks to see if the schema name you have defined as an environment variable is already present
in the database. If it is not, sequelize executes the SQL command to create that
schema within the database. In raw SQL, this is equivalent to:

```sql
'CREATE SCHEMA IF NOT EXISTS <your-schema-name>;'
```

Next, add a build command to the __package.json__ file in the backend directory
of your project. The build command will run the setup script that you just
created.

```json
// backend/package.json

  "scripts": {
    // ...
    "build": "node psql-setup-script.js" // add build script here
  },
```

This build command will be run during the deployment process, using the command
`npm run build`. It will run the setup script, and execute the SQL to create the
schema within your database.

## Step 2: Define the schema in the config file

In the __config/database.js__ file (or __config/config.json__ file), you will
see keys for "development", "test", and "production". Within "production", add
the following code:

```js
// config/database.js

  production: {
    // ...
    define: {         // define schema here
      schema: process.env.SCHEMA
    }
  }
```

Here, you are defining the schema globally, but only when
the application is running in the production environment. As a result, in
production, the schema name will automatically be prefixed onto every request.

> Note: You may not have a __config/database.js__ file, depending on your
> project configuration. If not, apply this change to the __config/config.json__
> file, using json syntax.

## Step 3: Define the schema in each migration file

In every migration file, you need to specify that the tables should be created
or revised within the specific schema, when running in the production
environment. The syntax is slightly different depending on whether you are
creating a table or altering an existing table, so follow the appropriate
directions below.

### Create Table Migrations

Add the following code to each migration file that creates a new table:

```js
// EVERY create table migration file
'use strict';

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code


// add options object to up and down functions:
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('table-name', {
        // ...
    }, options);    // add options object here
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('table-name', options); // and here
  }
};
```

Make sure you make this adjustment in every migration file that creates a new
table. Pay close attention to where the `options` object is passed into both the
`up` and `down` functions.

### Alter Table Migrations

For migrations that alter a table, such as adding or removing a column, the
syntax for defining a schema is different, because Sequelize needs to know the
schema name in order to find and alter the correct table.

In this case, you will need to add the table name to the `options` object, and
then pass the options object into the alter table function before the column
name argument.

Look at the example below, and make a similar adjustment to any migration files
that alter a table, such as adding or removing columns:

```js
// NEW: add this code to each alter table migration file above up function
let options = {};
options.tableName = '<TableName>'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
```

Next, in the alter table function (such as `addColumn`), replace the table name
with the `options` object as the first argument in both the `up` and `down`
functions.

For example:

```js
// EXAMPLE up and down function of an alter table migration

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'firstName', {  // options object
      type: Sequelize.STRING(30),
      allowNull: false,
    })
    await queryInterface.addColumn(options, 'lastName', {  // options object
      type: Sequelize.STRING(30),
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'firstName') // options object
    await queryInterface.removeColumn(options, 'lastName')  // options object
  }
};
```

Make sure you implement this syntax for all migrations that alter a table, and
use the previous syntax for all migrations that create a table.

## Step 4: Define the schema in each seeder file

You will need to make a similar adjustment to each seeder file as you just did
in the migration files. In this case, you can add the table name to the options
object, and just pass in the options object to each function, which defines both
the schema name and the table name for the seed data.

```js
// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code


// add options object to up and down functions:
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = '<TableName>';     // define table name in options object
    return queryInterface.bulkInsert(options, [ // pass in options object here
        // ...
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = '<TableName>'; // define table name in options object
    return queryInterface.bulkDelete(options); // pass in options object here
  }
};
};
```

Again, pay close attention to where the `options` object is passed into the `up`
and `down` functions in each seeder file.

> _Note: If a seeder is using the `Model.bulkCreate` function for dynamic seeding, you do
> not need to define the schema in the seeder file or make any other adjustments. This
> is because the model that the `Model.bulkCreate` function is called on already has the
> schema defined._

## What you've learned

In this reading, you learned how you can adjust an existing Express and
Sequelize application to implement a global schema in the production
environment. The four steps are:

1. Create a setup script that creates a schema
2. Define the schema in the config file
3. Define the schema in each migration file
4. Define the schema in each seeder file

You can implement these same four steps when you start a new project that will
be deployed on a database shared with other applications.

[database-pattern-4]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-pattern-4.png
