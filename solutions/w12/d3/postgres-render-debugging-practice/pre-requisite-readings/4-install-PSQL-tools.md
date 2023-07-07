# Install PSQL Command Line Tools

[PostgreSQL] Command Line Tools allow you to examine and interact with the
contents of your PostgresQL database.

- **If you already have PostgresQL** or PSQL Command Line Tools installed, then
  skip the installation instructions below and continue with the "Interacting
  with your Database (All)" section.
- **If you are not sure** if you have PostgresQL or PSQL Command Line Tools
  installed, then open a terminal and enter `psql`.

  - *If you recieve an error message*, this means you need to install the PSQL
    Command Line Tools. Close your terminal and continue with the installation
    instructions below.

  - *If you see a new PSQL command prompt* after entering `psql`, then that
    means you already have the tools you need and you should not install
    anything else. Type `Control-d` to exit out of the PSQL Command Line Tools,
    and continue with the "Interacting with your Database (All)" section.

Follow the Mac or Windows instructions below to install these tools.

## Mac Installation

_You can install PSQL Command Line Tools using Homebrew, OR through an
installer. Choose ONE approach below._

### Mac Option A: Using Homebrew

Open your terminal, and run `brew install libpq`.

Read the output provided in the terminal. You will be instructed to run commands
which will add the location of your PSQL command line tools to your path. Run
each command as instructed.

### Mac Option B: Using the EDB Installer

Navigate to the [PostgresQL Downloads] page and click on the icon for the Mac
download (latest version). Follow the instructions on the installer. You can
choose the default options on each screen except the "Select Components" screen.
On that page, select only the "Command Line Tools" option.

![psql-mac]

_See the [Mac Installation Documentation] for more details or troubleshooting._

When installation is complete (either approach), follow the instructions below
to interact with your Render database using the PSQL Command Line Tools.


## Windows Installation through WSL

You will install the PostgresQL client tools through WSL. This will
allow you to interact with a remotely-hosted PostgresQL server, without the ability
to host your own PostgresQL database server.

Open your **Ubuntu terminal** and enter the following command:

`sudo apt install postgresql-client`

_You will need your Ubuntu user password since you are using `sudo`._

When installation is complete, follow the instructions below to interact with
your Render.com database using the Postgres client through your Ubuntu terminal.

## Interacting with your Database (All)

To access your Render PostgresQL database, copy the **PSQL Command** value from the
information page of your database in Render. The value should start with "PGPASSWORD="
and should include information about your database. _If you look closely, you should be able to identify your password, username, database name, and host within the PSQL Command string._

Paste this value into your terminal. This will open up PostgresQL with a
connection to your remote database. At this point, you can use PostgresQL commands
locally in the PSQL shell to examine the contents of your database. This is similar to how you
use the SQLite3 CLI to use SQLite3 CLI commands and SQL commands to interact
with SQLite3 database files. Try the following:

- `\dn` - lists all of the schemas in the database
  - Does your database show the correct schema for your project?

- `\dt <schema_name>.*` - lists all tables within `<schema_name>` schema
  - Do you see all of your tables within the schema? You should see any tables that you migrated, as well as the `SequelizeMeta` and `SequelizeData` tables.

- `SELECT * FROM "<schema_name>"."<TableName>";` - lists all entries in the
  table within `<schema_name>` schema
 - Does the table show the appropriate seed data?

If there are any problems with the way the database or schema is set up, you can
drop the schema for your application and all tables within it, using the
following command:

```sql
DROP SCHEMA <schema_name> CASCADE
```

Use `Control-d` to close your database connection and exit out of the PSQL
Command Line Tools.

**Never commit the PSQL Command string to git. Make sure that any files that may
contain this string are in the .gitignore file, and check that the file is
properly being ignored by git.**

[PostgreSQL]: https://www.postgresql.org/
[PostgresQL Downloads]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
[Mac Installation Documentation]: https://www.enterprisedb.com/postgres-tutorials/installation-postgresql-mac-os
[psql-mac]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/psql-mac.png
