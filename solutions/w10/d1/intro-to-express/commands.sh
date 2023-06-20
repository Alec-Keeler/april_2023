cd server/

# Add a package.json file to your server folder
npm init -y

# Install Express as a dependency
npm install express

# Install nodemon as a dev dependency
npm install -D nodemon

# Create a file called app.js in your server folder
touch app.js

# To run server as `node app.js`
npm start

# To run server as `nodemon app.js`
npm run dev