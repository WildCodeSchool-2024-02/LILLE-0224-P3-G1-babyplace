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
      `select * from ${this.table} where id = ?`,
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
  // TODO: Implement the update operation to modify an existing managed operation

  // async update(management_operation) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a managed operation by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = OperationManagementRepository;
