// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all accounts from the database
    const accounts = await tables.account.readAll();

    // Respond with the accounts in JSON format
    res.json(accounts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific account from the database based on the provided ID
    const account = await tables.account.read(req.params.id);

    // If the account is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the account in JSON format
    if (account == null) {
      res.sendStatus(404);
    } else {
      res.json(account);
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
  // Extract the account data from the request body
  try {
    const account = req.body;
    // Insert the account into the database
    const insertId = await tables.account.create(account);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted account
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
