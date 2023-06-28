// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const pup = await Puppy.findByPk(req.params.puppyId)
    const { name, ageYrs, breed, weightLbs, microchipped } = req.body
    pup.set({
        name: name || pup.name,
        ageYrs: ageYrs || pup.ageYrs,
        breed: breed || pup.breed,
        weightLbs: weightLbs || pup.weightLbs
    })
    if (microchipped !== undefined) { // different syntax because this value can be falsey
        pup.microchipped = microchipped
    }
    await pup.save()
    res.json({
        message: `Successfully updated a puppy with an id of ${req.params.puppyId}`,
        puppy: pup
    })
})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const pup = await Puppy.findByPk(req.params.puppyId)
    if (pup) {
        await pup.destroy() // :(
    }
    res.json({
        message: `Successfully deleted the puppy with an id of ${req.params.puppyId}`,
        puppy: pup
    })
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}