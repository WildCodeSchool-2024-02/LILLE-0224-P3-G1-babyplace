const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import allergy-related actions
const { browse, read, add } = require("../../../controllers/allergyActions");

// Route to get a list of allergies
router.get("/", browse);

// Route to get a specific allergy by ID
router.get("/:id", read);

// Route to add a new allergy
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
