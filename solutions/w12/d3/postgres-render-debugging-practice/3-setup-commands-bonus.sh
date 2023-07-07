cd server

# Remove the database file (if run multiple times)

rm db/dev.db 2> /dev/null || true
rm test/test.db 2> /dev/null || true

# Migrations and seeders

npx dotenv sequelize db:migrate

npx dotenv sequelize db:seed:all

echo "----- Tables Exist? -----"
sqlite3 db/dev.db ".schema"

echo "----- Tables Have Data? -----"
sqlite3 db/dev.db "SELECT 'treeCount', count(id) FROM Trees;"
sqlite3 db/dev.db "SELECT 'insectCount', count(id) FROM Insects;"
sqlite3 db/dev.db "SELECT 'insectTreeCount', count(id) FROM InsectTrees;"
