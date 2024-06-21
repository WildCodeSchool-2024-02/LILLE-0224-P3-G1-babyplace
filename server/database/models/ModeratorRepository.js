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
      `insert into ${this.table} (moderator_mail, moderator_password) values (?, ?)`,
      [moderator.moderator_mail, moderator.moderator_password]
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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Moderatorren from the "moderator" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of moderator
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing moderator

  // async update(moderator) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a moderator by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ModeratorRepository;
