# SQLite 3

SQLite3 is a lightweight RDBMS with a built in command line interface.  The SQLite3 CLI has many commands built into it, but here are a list of the ones you're likely to use most frequently for the time being.

### From outside the CLI
- `sqlite3` - This command run from your terminal will open a "transient" database in your current directory.  A "transient database is one that will disappear when you exit sqlite3.  This is useful for testing purposes.
- `sqlite3 dbname.db` - This command will find or create a database with the given file name at the current directory.

### From inside the CLI
- `.exit/.quit` - This command will exit the SQLite3 CLI.
- `.read filename` - This command will read a file with the given name, executing any SQL commands within it.
- `.schema ?pattern?` - This command will show the table schemas in your current database, or one schema given a table name in place of ?pattern?.
- `.tables ?table?` - Lists existing table names, returns only table names matching ?table? pattern if provided.
- `.indexes ?table?` - Lists all indexes that exist on tables in the current database, or indexes for just the table of the name provided.
- `.headers on|off` - Turn display headers on or off.
- `.timer on|off` - Turn SQL timer on or off.

### SQLite3 NPM package methods
* Set up code for using SQLite3 in an Express app
```js
// DO NOT DO THIS - USE .env VARIABLE INSTEAD
const DATA_SOURCE = 'app.db';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);
```
[Node package docs](https://www.npmjs.com/package/sqlite3)
[API Docs with additional methods](https://github.com/TryGhost/node-sqlite3/wiki/API)
- `.all` - Returns an array of records
- `.get` - Returns a single record
- `.run` - Use this for running INSERTS, UPDATES, DELETES