const AbstractRepository = require("./AbstractRepository");

class BookingOperationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the booking class (AbstractRepository)
    // and pass the table name "booking_operation" as configuration
    super({ table: "booking_operation" });
  }

  // The C of CRUD - Create operation

  async create(booking) {
    const [result] = await this.database.query(
      `insert into ${this.table} (booking_operation_date, slots, state, nursery_id) values (?, ?, ?, ?)`,
      [
        booking.booking_operation_date,
        booking.slots,
        booking.state,
        booking.nursery_id,
      ]
    );

    // Return the ID of the newly inserted booking
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific booking by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where booking_operation_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the booking
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all children from the "booking_operation" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of bookings
    return rows;
  }

  // The U of CRUD - Update operation

  async update(booking) {
    // Execute the SQL UPDATE query to update a booking from the 'booking_operation' table
    const [rows] = await this.database.query(
      `update ${this.table} set booking_operation_date = ?, state = ?, where booking_operation_id = ?`,
      [booking.booking_operation_date, booking.state]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a booking from the 'booking_operation' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where booking_operation_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = BookingOperationRepository;
