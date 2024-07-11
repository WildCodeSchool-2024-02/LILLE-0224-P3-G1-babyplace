// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all moderatorss from the database
    const moderators = await tables.moderator.readAll();

    // Respond with the moderators in JSON format
    res.json(moderators);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific moderator from the database based on the provided ID
    const moderator = await tables.moderator.read(req.params.id);

    // If the moderator is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the moderator in JSON format
    if (moderator == null) {
      res.sendStatus(404);
    } else {
      res.json(moderator);
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
  // Extract the moderator data from the request body
  try {
    const moderator = req.body;
    // Insert the moderator into the database
    const insertId = await tables.moderator.create(moderator);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted moderator
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByEmail = async (req, res, next) => {
  try {
    // Fetch a specific moderator from the database based on the provided ID
    const moderator = await tables.moderator.readByEmail(
      req.body.moderator_mail
    );

    // If the moderator is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the moderator in JSON format
    if (moderator == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json(moderator);
    }
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
  readByEmail,
};
