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

const readByMail = async (req, res, next) => {
  try {
    // Fetch a specific parent from the database based on the provided ID
    const parent = await tables.parent.readByMailFromDB(req.params.mail);

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

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    const updatedParent = req.body;
    await tables.parent.update(updatedParent);
    res.sendStatus(204);
  } catch (err) {
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

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await tables.parent.delete(id);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Parent not found" });
    } else {
      res.status(200).json({ message: "Parent deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readByEmail,
  readByMail,
  edit,
  add,
  destroy,
};
