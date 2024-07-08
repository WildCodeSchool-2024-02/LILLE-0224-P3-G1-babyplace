const AbstractRepository = require("./AbstractRepository");

class ParentRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "parent" as configuration
    super({ table: "parent" });
  }

  // The C of CRUD - Create operation

  async create(parent) {
    const [result] = await this.database.query(
      `insert into ${this.table} (parent_firstname, parent_lastname, parent_adress, parent_phone, parent_mail, parent_password) values (?, ?, ?, ?, ?, ?)`,
      [
        parent.parent_firstname,
        parent.parent_lastname,
        parent.parent_adress,
        parent.parent_phone,
        parent.parent_mail,
        parent.parent_hashedPassword,
      ]
    );

    // Return the ID of the newly inserted parent
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific parent by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where parent_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the parent
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific parent by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where parent_mail = ?`,
      [email]
    );

    // Return the first row of the result, which represents the parent
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all parents from the "parent" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of parents
    return rows;
  }

  // The U of CRUD - Update operation
  async update(parent) {
    // Execute the SQL UPDATE query to update a parent from the 'parent' table
    const [rows] = await this.database.query(
      `update ${this.table}set firstname = ?, lastname = ?, adress = ?, phone = ?, mail = ?, password = ? where parent_id = ?`,
      [
        parent.parent_firstname,
        parent.parent_lastname,
        parent.parent_adress,
        parent.parent_phone,
        parent.parent_mail,
        parent.parent_password,
      ]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a parent from the 'parent' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where parent_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}
module.exports = ParentRepository;
