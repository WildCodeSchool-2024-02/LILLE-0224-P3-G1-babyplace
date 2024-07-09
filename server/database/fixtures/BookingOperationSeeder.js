const AbstractSeeder = require("./AbstractSeeder");
const ParentSeeder = require("./ParentSeeder");
const ModeratorSeeder = require("./ModeratorSeeder");
const NurserySeeder = require("./NurserySeeder");
const ChildSeeder = require("./ChildSeeder");

class BookingOperationSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the managed operation class (AbstractSeeder) with appropriate options
    super({
      table: "booking_operation",
      truncate: true,
      dependencies: [ParentSeeder, ModeratorSeeder, NurserySeeder, ChildSeeder],
    });
  }

  run() {
    const bookingOperations = [
      {
        booking_operation_date: "2024-02-24",
        slots: "15h-18h",
        state: "Passée",
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
        child_id: this.getRef("child_Morgan").insertId,
        moderator_id: null,
        nursery_id: this.getRef("nursery_contact@lillomomes.fr").insertId,
      },
      {
        booking_operation_date: "2024-07-01",
        slots: "10h-12h",
        state: "En attente",
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
        child_id: this.getRef("child_Morgan").insertId,
        moderator_id: null,
        nursery_id: this.getRef("nursery_contact@lillomomes.fr").insertId,
      },
      {
        booking_operation_date: "2024-06-01",
        slots: "10h-18h",
        state: "Validée",
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
        child_id: this.getRef("child_Morgan").insertId,
        moderator_id: null,
        nursery_id: this.getRef("nursery_hello@tambourin-et-castagnettes.com")
          .insertId,
      },
      {
        booking_operation_date: "2024-06-02",
        slots: "10h-20h",
        state: "Validée",
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
        child_id: this.getRef("child_Emilie").insertId,
        moderator_id: null,
        nursery_id: this.getRef("nursery_hello@tambourin-et-castagnettes.com")
          .insertId,
      },
    ];

    bookingOperations.forEach((bookingOperation) => {
      this.insert(bookingOperation);
    });
  }
}

// Export the ModeratorSeeder class
module.exports = BookingOperationSeeder;
