const AbstractRepository = require("./AbstractRepository");

class AccountRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the account class (AbstractRepository)
    // and pass the table name "account" as configuration
    super({ table: "account" });
  }

  // The C of CRUD - Create operation

  async create(account) {
    const [result] = await this.database.query(
      `insert into ${this.table} (role) values (?)`,
      [account.role]
    );

    // Return the ID of the newly inserted account
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific account by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where account_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the account
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all accounts from the "account" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of accounts
    return rows;
  }

  // The U of CRUD - Update operation

  async update(account) {
    // Execute the SQL UPDATE query to update an account from the 'account' table
    const [rows] = await this.database.query(
      `update ${this.table} set role = ?, where account_id = ?`,
      [account.role]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete an account from the 'account' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where account_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = AccountRepository;
