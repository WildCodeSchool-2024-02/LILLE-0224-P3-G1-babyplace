const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import nursery-related actions
const { browse, read, add } = require("../../../controllers/nuseryActions");

// Route to get a list of nurseries
router.get("/", browse);

// Route to get a specific parent by ID
router.get("/:id", read);

// Route to add a new nursery
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
