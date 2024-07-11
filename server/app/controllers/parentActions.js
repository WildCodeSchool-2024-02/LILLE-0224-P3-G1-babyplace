// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all parents from the database
    const parents = await tables.parent.readAll();

    // Respond with the parents in JSON format
    res.json(parents);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific parent from the database based on the provided ID
    const parent = await tables.parent.read(req.params.id);

    // If the parent is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the parent in JSON format
    if (parent == null) {
      res.sendStatus(404);
    } else {
      res.json(parent);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByEmail = async (req, res, next) => {
  try {
    // Fetch a specific parent from the database based on the provided ID
    const parent = await tables.parent.readByEmail(req.body.parent_mail);

    // If the parent is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the parent in JSON format
    if (parent == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json(parent);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    // Update the category in the database
    await tables.parent.update(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the parent data from the request body
  try {
    const parent = req.body;
    // Insert the parent into the database
    const insertId = await tables.parent.create(parent);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted parent
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
  readByEmail,
  edit,
  add,
  // destroy,
};
