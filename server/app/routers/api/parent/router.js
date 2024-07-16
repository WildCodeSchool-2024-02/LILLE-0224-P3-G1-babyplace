const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import parent-related actions
const {
  browse,
  read,
  edit,
  add,
  readByMail,
  destroy,
} = require("../../../controllers/parentActions");

// Route to get a list of parents
router.get("/", browse);

// Route to get a specific parent by ID
router.get("/:id", read);

router.put("/:id", edit);

const hashPassword = require("../../../services/HashedPassword");

// Route to add a new parent
router.post("/", hashPassword, add);

const login = require("../../../controllers/authentificationActions");

router.get("/mail/:mail", readByMail);

router.post("/login", login);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
