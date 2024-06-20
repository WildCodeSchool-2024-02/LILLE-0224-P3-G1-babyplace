const AbstractSeeder = require("./AbstractSeeder");

class ModeratorSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the moderator class (AbstractSeeder) with appropriate options
    super({ table: "moderator", truncate: true });
  }

  run() {
    const moderators = [
      {
        moderator_mail: "didier.delabre@babyplace.com",
        moderator_password: "******",
      },
      {
        moderator_mail: "christian.samart@babyplace.com",
        moderator_password: "******",
      },
    ];

    moderators.forEach((moderator) => {
      const moderatorWithRefName = {
        ...moderator,
        refName: `moderator_${moderator.moderator_mail}`,
      };

      this.insert(moderatorWithRefName); // insert into moderator(mail) values (?)
    });
  }
}

// Export the ModeratorSeeder class
module.exports = ModeratorSeeder;
