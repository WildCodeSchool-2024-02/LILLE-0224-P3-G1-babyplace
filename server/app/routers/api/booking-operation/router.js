const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import allergy-related actions
const {
  browse,
  read,
  add,
} = require("../../../controllers/bookingOperationActions");

// Route to get a list of bookings
router.get("/", browse);

// Route to get a specific booking by ID
router.get("/:id", read);

// Route to add a new booking
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
