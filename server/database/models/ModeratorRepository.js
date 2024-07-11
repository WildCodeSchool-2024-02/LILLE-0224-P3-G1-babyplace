const AbstractRepository = require("./AbstractRepository");

class ModeratorRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the moderator class (AbstractRepository)
    // and pass the table name "moderator" as configuration
    super({ table: "moderator" });
  }

  // The C of CRUD - Create operation

  async create(moderator) {
    const [result] = await this.database.query(
      `insert into ${this.table} (moderator_mail, moderator_role, moderator_password) values (?, ?, ?)`,
      [
        moderator.moderator_mail,
        moderator.moderator_password,
        moderator.moderator_role,
      ]
    );

    // Return the ID of the newly inserted moderator
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Moderator by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where moderator_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the moderator
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific moderator by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where moderator_mail = ?`,
      [email]
    );

    // Return the first row of the result, which represents the nursery
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Moderatorren from the "moderator" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of moderator
    return rows;
  }

  // The U of CRUD - Update operation

  async update(moderator) {
    // Execute the SQL UPDATE query to update a moderator from the 'moderator' table
    const [rows] = await this.database.query(
      `update ${this.table} set moderator_mail = ?, moderator_password, where moderator_id = ?`,
      [moderator.moderator_mail, moderator.moderator_hashedPassword]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a moderator from the 'moderator' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where moderator_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = ModeratorRepository;
