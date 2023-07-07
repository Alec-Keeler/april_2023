# Setting up a PostgresQL Database Instance on Render.com

## Set up Render.com account

_Skip this step if you already have a Render.com account connected to your
GitHub account._

Navigate to the [Render homepage] and click on "Get Started". On the Sign Up
page, click on the GitHub button. This will allow you to sign in to Render
through your GitHub account, and easily connect your repositories to Render for
deployment. Follow the instructions to complete your registration and verify
your account information.

## Create a PostgresQL Database Instance

_Skip this step if you have already created a Render PostgresQL database
instance for another application._

Sign in to Render using your GitHub credentials, and navigate to your
[Dashboard].

Click on the "New +" button in the navigation bar, and click on "PostgreSQL" to
create your PostgresQL database instance.

In the name field, give your database a descriptive name. Note that all of your
applications will share this database instance, so make it general (for example,
you might name it "App-Academy-Projects"). For the region field, choose the
location nearest to you. The rest of the fields in this section can be left
blank.

Click the "Create Database" button to create the new PostgresQL database instance.
Within a few minutes, your new database will be ready to use. Scroll down on
the page to see all of the information about your database, including the
hostname, user name and password, and URLs to connect to the database.

You can access this information anytime by going back to your [Dashboard], and
clicking on the database instance.

[Render homepage]: https://render.com/
[Dashboard]: https://dashboard.render.com/
[PostgreSQL]: https://www.postgresql.org/
