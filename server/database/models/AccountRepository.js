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
  // TODO: Implement the update operation to modify an existing account

  // async update(account) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a account by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = AccountRepository;
