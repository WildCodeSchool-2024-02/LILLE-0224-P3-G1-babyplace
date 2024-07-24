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
    try {
      const [rows] = await this.database.query(`
          SELECT
              bo.booking_operation_id,
              bo.booking_operation_date,
              bo.slots,
              bo.state,
              p.parent_id,
              p.role AS parent_role,
              p.parent_firstname,
              p.parent_lastname,
              p.parent_adress,
              p.parent_phone,
              p.parent_mail,
              p.parent_password,
              c.child_id,
              c.child_firstname,
              c.child_lastname,
              c.child_birth,
              c.walk_status,
              c.clean_status,
              n.nursery_id,
              n.role AS nursery_role,
              n.nursery_name,
              n.nursery_street,
              n.nursery_street_number,
              n.latitude,
              n.longitude,
              n.city,
              n.capacity,
              n.price,
              n.nursery_phone,
              n.nursery_mail,
              n.image1,
              n.image2,
              n.image3,
              n.activity1,
              n.activity2,
              n.activity3,
              n.certification1,
              n.certification2,
              n.certification3,
              n.about,
              a.allergy_id,
              a.gluten,
              a.fruitsacoque,
              a.crustaces,
              a.celeri,
              a.oeufs,
              a.moutarde,
              a.poissons,
              a.soja,
              a.lait,
              a.sulfites,
              a.sesame,
              a.lupin,
              a.arachides,
              a.mollusques,
              a.autres
          FROM
              booking_operation bo
              LEFT JOIN parent p ON bo.parent_id = p.parent_id
              LEFT JOIN child c ON bo.child_id = c.child_id
              LEFT JOIN nursery n ON bo.nursery_id = n.nursery_id
              LEFT JOIN allergy a ON c.child_id = a.child_id
        `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all bookings: ${error.message}`);
    }
  }

  // The U of CRUD - Update operation

  async updateOnBooking(booking) {
    // Execute the SQL UPDATE query to update a booking from the 'booking_operation' table
    const [rows] = await this.database.query(
      `update ${this.table} set  state = ?, parent_id = ?, child_id = ? where booking_operation_id = ?`,
      [
        booking.state,
        booking.parent_id,
        booking.child_id,
        booking.booking_operation_id,
      ]
    );

    // Return how many rows were affected
    return rows;
  }

  async updateOnValidateAndCancel(booking) {
    // Execute the SQL UPDATE query to update a booking from the 'booking_operation' table
    const [rows] = await this.database.query(
      `update ${this.table} set  state = ? where booking_operation_id = ?`,
      [booking.state, booking.booking_operation_id]
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
