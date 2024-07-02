const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import account-related actions
const { browse, read, add } = require("../../../controllers/accountActions");

// Route to get a list of allergies
router.get("/", browse);

// Route to get a specific account by ID
router.get("/:id", read);

// Route to add a new account
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
