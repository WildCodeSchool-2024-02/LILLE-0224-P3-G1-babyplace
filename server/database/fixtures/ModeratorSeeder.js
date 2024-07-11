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
        moderator_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
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
