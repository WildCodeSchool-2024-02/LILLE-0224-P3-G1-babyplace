const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import allergy-related actions
const {
  browse,
  read,
  editBooking,
  editValidateOrCancel,
  add,
  destroy,
} = require("../../../controllers/bookingOperationActions");

// Route to get a list of bookings
router.get("/", browse);

// Route to get a specific booking by ID
router.get("/:id", read);

// Route to modify a specific booking by ID
router.put("/:id", editValidateOrCancel);
router.put("/:id/edit", editBooking);

// Route to add a new booking
router.post("/", add);

// Route to delete a booking

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
