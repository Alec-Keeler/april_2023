# Step 1
# Create database file (if it doesn't exist) and commit all migration files
npx dotenv sequelize db:migrate


# Step 2
# Undo the last migration file
npx dotenv sequelize db:migrate:undo


# Step 3
# Re-commit the last migration file
npx dotenv sequelize db:migrate


# Step 4
# Undo all the migration files
npx dotenv sequelize db:migrate:undo:all


# Step 5
# Re-commit all the migration files
npx dotenv sequelize db:migrate

# Undo up to the `20211008225902-create-cats.js` migration file
npx dotenv -- sequelize db:migrate:undo:all --to 20211008225902-create-cats.js
