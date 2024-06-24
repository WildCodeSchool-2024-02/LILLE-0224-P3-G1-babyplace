const AbstractSeeder = require("./AbstractSeeder");
const AccountSeeder = require("./AccountSeeder");
const ModeratorSeeder = require("./ModeratorSeeder");

class OperationManagementSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the managed operation class (AbstractSeeder) with appropriate options
    super({
      table: "operation_management",
      truncate: true,
      dependencies: [AccountSeeder, ModeratorSeeder],
    });
  }

  run() {
    const managedOperations = [
      {
        operation_management_date: "2024-02-24",
        type: "creation",
        account_id: this.getRef("account_parent").insertId,
        moderator_id: null,
      },
      {
        operation_management_date: "2024-05-12",
        type: "deletion",
        account_id: this.getRef("account_parent").insertId,
        moderator_id: this.getRef("moderator_didier.delabre@babyplace.com")
          .insertId,
      },
    ];

    managedOperations.forEach((managedOperation) => {
      this.insert(managedOperation);
    });
  }
}

// Export the ModeratorSeeder class
module.exports = OperationManagementSeeder;
