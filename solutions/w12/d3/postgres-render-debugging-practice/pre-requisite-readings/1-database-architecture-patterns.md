# Exploring Database Architecture Patterns

Up until this point, you have been following a traditional one-to-one pattern in
relation to your database and backend application: Each application has its own
database, which includes all of the tables needed for that application.

However, this is just one pattern out of many possible options for organizing
data.

In this article, you will explore a few different options for organizing data,
and learn a new pattern for organizing the data for your first portfolio
project.

> _A note about naming conventions: The examples below use the SQL table naming
> convention, which uses lowercase snakecasing (for example, `sql_table_name`).
> When you work with tables in Sequelize, however, you have been using the
> Sequelize naming convention, which uses UpperCamelCase (for example,
> `SequelizeTableName`)._

## Pattern 1: One Database to One Application

As mentioned above, a traditional pattern for organizing data for a small
project is to create a database specifically for that project, that only
includes tables that store data for that specific project.

For example, an overly simplified online community may have have a `users`
table, a `posts` table, and a `comments` table. All three tables are housed
within the single database named `community`.

![database-pattern-1]

This architecture makes sense for a small stand-alone project. All the data is
clearly organized in one place, and can be easily managed through the single
database.

## Pattern 2: Multiple Databases to One Application

When working with larger, more complex applications, it may make sense to
separate out different types of data into separate databases. This is a common
approach when a client-side application is requesting data from multiple
servers, and each server may have its own database.

For example, imagine an application that includes multiple services, including
e-commerce as well as an online community. The e-commerce side of the
application may store and access data from one database, while the community
side of the application may store and access data from a different database.

![database-pattern-2]

This pattern makes sense in scenarios in which different types of data need to
be accessed by a single client-side application. Separating different types of
data out into multiple databases allows you to secure each set of data
individually, which helps to control access to more sensitive data.

It also can be helpful during maintenance periods or outage, because if one
database is impacted, it will not impact operations related to the other
databases.

## Pattern 3: One Database to Many Applications

Another common pattern is to have a single database which stores the data
accessed by multiple applications. This is a common practice in large companies
that may host several internal and/or externally-facing applications. There may
be some overlap in the tables that each application needs to access, and some
tables may be accessed by all applications (for example, if they all share a
common `users` table).

![database-pattern-3]

One advantage of using an architecture like this is that it may be less
expensive and take up less space than hosting individual databases for each
application. It also can provide flexibility for scaling applications in the
future, which may need to access the data in a table that is currently used by a
different application.

However, a disadvantage of this system is that it can be difficult to maintain.
You need to be vigilant about table naming conventions and ensure that names are
not duplicated to avoid conflicts when running migrations.

## Pattern 4: One Database with Multiple Schemas to Many Applications

This pattern is similar to the pattern described above, but adds a layer of
organization that helps address some of the limitations of the one database to
multiple applications pattern. In this model, there is a single database, but
the tables for each application are grouped within a specific **schema** within
the database. With this organization, multiple applications could have the same
table name(s), but they would be differentiated from each other because they
would be organized into their own schema.

![database-pattern-4]

You are already familiar with the concept of a **schema** in the context of
designing a database schema. In this case, you are really just assigning a
name to the schema that contains all of the tables within it for the
application. As a result, you can reference a specific table by prefixing it
with its schema name. For example, you can differentiate between two `users`
tables by referencing `Schema1.users` or `Schema2.users`.

Many software as a service (SAAS) providers use this architecture. These
companies may provide a basic platform that can be customized by their client.
For example, Forem is an open-source project that allows groups to host their
own _instances_ of an online community. Using this architecture pattern, they
could organize the tables for each _instance_ of the community within its own
schema in the same database that stores data for all of the Forem instances.

## Deploying to Render.com with Pattern 4

As you develop your portfolio projects, you will be using **Pattern #4**, by
organizing the tables for each project into their own schema within a single
database. This will allow you to host all of your projects on Render.com using
their free tier of service, and will allow you to easily manage the database for
all projects at once.

As you work through the **Authenticate Me** project, you will implement two new
patterns that will be necessary for deploying your project.

First, you will set up your application to use a **PostgresQL** database instance hosted on Render.com as the production
database, instead of using a SQLite3 database file as you have been using it in the development
environment. With PostgresQL, each database will have a name, whereas your SQLite3
databases did not have names (_instead, they had file names_). In addition,
PostgresQL databases uses a default schema named `public`, and will store all tables within
the `public` schema, unless you explicitly create new schemas and create tables
within the new schemas. Whereas SQLite3 databases do not have schemas.

Second, you will have to implement some minor Sequelize configuration changes to
set up a new schema for your project within the PostgresQL production database. By
making small changes to your configuration, models, migrations, and seeders, you
will be implementing a new architecture pattern, which will help you
become a stronger backend developer.

## What you've learned

In this reading, you were introduced to four different patterns for how data can
be stored within or across databases. Here are the four patterns for comparison:

![database-patterns-all]

[database-pattern-1]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-pattern-1.png
[database-pattern-2]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-pattern-2.png
[database-pattern-3]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-pattern-3.png
[database-pattern-4]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-pattern-4.png
[database-patterns-all]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/database-patterns-all.png
