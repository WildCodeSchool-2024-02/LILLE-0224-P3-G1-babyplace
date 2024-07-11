const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import parent-related actions
const {
  browse,
  read,
  add,
  readByMail,
} = require("../../../controllers/parentActions");

// Route to get a list of parents
router.get("/", browse);

// Route to get a specific parent by ID
router.get("/:id", read);

router.get("/mail/:mail", readByMail);

const hashPassword = require("../../../services/HashedPassword");
// Route to add a new parent
router.post("/", hashPassword, add);

const login = require("../../../controllers/authentificationActions");

router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
