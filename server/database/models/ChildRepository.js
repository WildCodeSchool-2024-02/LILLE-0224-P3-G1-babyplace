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
  async update(child) {
    // Execute the SQL UPDATE query to update a child from the 'child' table
    const [rows] = await this.database.query(
      `update ${this.table}set firstname = ?, lastname = ?, birth = ?, where child_id = ?`,
      [child.child_firstname, child.child_lastname, child.child_birth]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a child from the 'child' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where child_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = ChildRepository;
