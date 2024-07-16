// Import access to database tables
const tables = require("../../database/tables");
// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all nurseries from the database
    const nurseries = await tables.nursery.readAll();
    if (req.query.city != null) {
      const filteredNurseries = nurseries.filter((nursery) =>
        nursery.city.includes(req.query.city)
      );

      res.json(filteredNurseries);
    } else {
      res.json(nurseries);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific nursery from the database based on the provided ID
    const nursery = await tables.nursery.read(req.params.id);
    // If the nursery is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the nursery in JSON format
    if (nursery == null) {
      res.sendStatus(404);
    } else {
      res.json(nursery);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByEmail = async (req, res, next) => {
  try {
    // Fetch a specific nursery from the database based on the provided ID
    const nursery = await tables.nursery.readByEmail(req.body.nursery_mail);

    // If the nursery is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the nursery in JSON format
    if (nursery == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json(nursery);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation

const editContact = async (req, res, next) => {
  try {
    const updatedNursery = req.body;
    await tables.nursery.updateContact(updatedNursery);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
// This operation is not yet implemented
// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the nursery data from the request body
  const nursery = req.body;
  try {
    // Insert the nursery into the database
    const insertId = await tables.nursery.create(nursery);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted nursery
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

    const result = await tables.nursery.delete(id);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Nursery not found" });
    }

    res.status(200).json({ message: "Nursery deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// This operation is not yet implemented
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readByEmail,
  editContact,
  add,
  destroy,
};
