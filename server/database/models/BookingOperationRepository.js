const AbstractRepository = require("./AbstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the booking class (AbstractRepository)
    // and pass the table name "booking_operation" as configuration
    super({ table: "booking_operation" });
  }

  // The C of CRUD - Create operation

  async create(booking) {
    const [result] = await this.database.query(
      `insert into ${this.table} (booking_operation_date, booking_operation_state) values (?, ?)`,
      [booking.booking_operation_date, booking.booking_operation_state]
    );

    // Return the ID of the newly inserted booking
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific booking by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
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
  // TODO: Implement the update operation to modify an existing booking

  // async update(child) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a booking by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ChildRepository;
