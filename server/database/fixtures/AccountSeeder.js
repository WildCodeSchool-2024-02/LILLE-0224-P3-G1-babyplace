const AbstractSeeder = require("./AbstractSeeder");
const ModeratorSeeder = require("./ModeratorSeeder");
const ParentSeeder = require("./ParentSeeder");
const NurserySeeder = require("./NurserySeeder");

class AccountSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the account class (AbstractSeeder) with appropriate options
    super({
      table: "account",
      truncate: true,
      dependencies: [ParentSeeder, ModeratorSeeder, NurserySeeder],
    });
  }

  run() {
    const accounts = [
      {
        role: "moderator",
        nursery_id: null,
        parent_id: null,
        moderator_id: this.getRef("moderator_christian.samart@babyplace.com")
          .insertId,
      },
      {
        role: "parent",
        nursery_id: null,
        parent_id: this.getRef("parent_harry.styles@gmail.com").insertId,
        moderator_id: null,
      },
      {
        role: "nursery",
        nursery_id: this.getRef("nursery_contact@lillomomes.fr").insertId,
        parent_id: null,
        moderator_id: null,
      },
    ];

    accounts.forEach((account) => {
      const accountWithRefName = {
        ...account,
        refName: `account_${account.role}`,
      };

      this.insert(accountWithRefName); // insert into account(role) values (?)
    });
  }
}

// Export the accountSeeder class
module.exports = AccountSeeder;
