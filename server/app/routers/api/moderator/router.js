const express = require("express");

const router = express.Router();

const login = require("../../../controllers/authentificationActions");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import moderator-related actions
const { browse, read, add } = require("../../../controllers/moderatorActions");

// Route to get a list of moderators
router.get("/", browse);

// Route to get a specific moderator by ID
router.get("/:id", read);

const hashPassword = require("../../../services/HashedPassword");

// Route to add a new moderator
router.post("/", hashPassword, add);

router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
