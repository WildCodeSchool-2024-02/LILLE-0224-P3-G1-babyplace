// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all bookings from the database
    const bookings = await tables.booking_operation.readAll();

    // Respond with the bookings in JSON format
    res.json(bookings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific booking from the database based on the provided ID
    const booking = await tables.booking_operation.read(req.params.id);

    // If the booking is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the booking in JSON format
    if (booking == null) {
      res.sendStatus(404);
    } else {
      res.json(booking);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const editBooking = async (req, res, next) => {
  try {
    const updatedBooking = req.body;
    await tables.booking_operation.updateOnBooking(updatedBooking);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const editValidateOrCancel = async (req, res, next) => {
  try {
    const updatedBooking = req.body;
    await tables.booking_operation.updateOnValidateAndCancel(updatedBooking);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the allergy data from the request body
  try {
    const booking = req.body;
    // Insert the booking into the database
    const insertId = await tables.booking_operation.create(booking);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted booking
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

    const result = await tables.booking_operation.delete(id);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  editBooking,
  editValidateOrCancel,
  add,
  destroy,
};
