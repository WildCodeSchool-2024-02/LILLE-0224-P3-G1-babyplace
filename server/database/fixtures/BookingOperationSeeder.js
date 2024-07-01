const AbstractSeeder = require("./AbstractSeeder");
const NurserySeeder = require("./NurserySeeder");
const AccountSeeder = require("./AccountSeeder");
const ModeratorSeeder = require("./ModeratorSeeder");

class OperationManagementSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the managed operation class (AbstractSeeder) with appropriate options
    super({
      table: "booking_operation",
      truncate: true,
      dependencies: [AccountSeeder, ModeratorSeeder, NurserySeeder],
    });
  }

  run() {
    const bookingOperations = [
      {
        booking_operation_date: "2024-02-24",
        state: "passed",
        nursery_id: this.getRef("nursery_contact@lillomomes.fr").insertId,
        account_id: this.getRef("account_parent").insertId,
        moderator_id: null,
      },
      {
        booking_operation_date: "2024-07-01",
        state: "pending",
        nursery_id: this.getRef("nursery_contact@lillomomes.fr").insertId,
        account_id: this.getRef("account_parent").insertId,
        moderator_id: this.getRef("moderator_didier.delabre@babyplace.com")
          .insertId,
      },
    ];

    bookingOperations.forEach((bookingOperation) => {
      this.insert(bookingOperation);
    });
  }
}

// Export the ModeratorSeeder class
module.exports = OperationManagementSeeder;
