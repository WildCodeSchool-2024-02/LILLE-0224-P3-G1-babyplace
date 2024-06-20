// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all allergies from the database
    const allergies = await tables.allergy.readAll();

    // Respond with the allergies in JSON format
    res.json(allergies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific allergy from the database based on the provided ID
    const allergy = await tables.allergy.read(req.params.id);

    // If the allergy is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the allergy in JSON format
    if (allergy == null) {
      res.sendStatus(404);
    } else {
      res.json(allergy);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the allergy data from the request body
  try {
    const allergy = req.body;
    // Insert the allergy into the database
    const insertId = await tables.allergy.create(allergy);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted allergy
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
