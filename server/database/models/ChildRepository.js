const AbstractRepository = require("./AbstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the child class (AbstractRepository)
    // and pass the table name "child" as configuration
    super({ table: "child" });
  }

  // The C of CRUD - Create operation

  async create(child) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (child_firstname, child_lastname, child_birth, walk_status, clean_status, parent_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        child.child_firstname,
        child.child_lastname,
        child.child_birth,
        child.walk_status,
        child.clean_status,
        child.parent_id,
      ]
    );

    // Return the ID of the newly inserted child
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific child by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where child_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the child
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all children from the "child" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of children
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing child

  // async update(child) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a child by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ChildRepository;
