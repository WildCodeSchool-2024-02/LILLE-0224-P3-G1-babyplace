// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all children from the database
    const children = await tables.child.readAll();

    // Respond with the children in JSON format
    res.json(children);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific child from the database based on the provided ID
    const child = await tables.child.read(req.params.id);

    // If the child is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the child in JSON format
    if (child == null) {
      res.sendStatus(404);
    } else {
      res.json(child);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
// eslint-disable-next-line consistent-return
const add = async (req, res, next) => {
  try {
    // Extract the child data from the request body
    const child = req.body;

    // Vérifier que les allergies sont un tableau
    if (!Array.isArray(child.allergies)) {
      return res
        .status(400)
        .json({ error: "Les allergies doivent être un tableau" });
    }

    // Insert the child and allergies into the database
    const insertId = await tables.child.createChildAndAllergies(
      child,
      child.allergies
    );

    // Respond with HTTP 201 (Created) and the ID of the newly inserted child
    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'enfant:", err);
    // Si c'est une erreur connue, renvoyez un message d'erreur approprié
    if (err.message === "Invalid data") {
      res.status(400).json({ error: "Données invalides" });
    } else {
      // Pour les autres erreurs, passez-les au middleware de gestion des erreurs
      next(err);
    }
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
