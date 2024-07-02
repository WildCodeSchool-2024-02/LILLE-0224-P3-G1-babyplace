const AbstractRepository = require("./AbstractRepository");

class OperationManagementRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the management_operation class (AbstractRepository)
    // and pass the table name "managedoperation" as configuration
    super({ table: "operation_management" });
  }

  // The C of CRUD - Create operation

  async create(managedOperation) {
    const [result] = await this.database.query(
      `insert into ${this.table} (operation_management_date, type) values (?, ?)`,
      [managedOperation.operation_management_date, managedOperation.type]
    );

    // Return the ID of the newly inserted
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific managed operation by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where nursery_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the managed operation
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all managed operations from the "management_operation" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of managed operations
    return rows;
  }

  // The U of CRUD - Update operation

  async update(managedOperation) {
    // Execute the SQL UPDATE query to update an operation from the 'operation_management' table
    const [rows] = await this.database.query(
      `update ${this.table} set date = ?, type = ?, where operation_management_id = ?`,
      [managedOperation.operation_management_date, managedOperation.type]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete an operation from the 'operation_management' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where operation_management_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = OperationManagementRepository;
