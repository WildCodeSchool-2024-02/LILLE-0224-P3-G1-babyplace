const AbstractSeeder = require("./AbstractSeeder");

class ParentSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "parent", truncate: true });
  }

  run() {
    const parents = [
      {
        parent_firstname: "Jean",
        parent_lastname: "Roland",
        parent_adress: "47 boulevard Victor Hugo 59000 Lille",
        parent_phone: "03 21 67 82 34",
        parent_mail: "jean.roland@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Harry",
        parent_lastname: "Legrand",
        parent_adress: "1 rue de la Monnaie 59350 Lille",
        parent_phone: "03 21 29 64 28",
        parent_mail: "harry.legrand@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Georges",
        parent_lastname: "St-Pierre",
        parent_adress: "61 rue Basse 59350 Lille",
        parent_phone: "03 21 20 02 81",
        parent_mail: "georges.st-pierre@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Caroline",
        parent_lastname: "Goujon",
        parent_adress: "47 rue Nationale 59800 Lille",
        parent_phone: "03 21 69 42 08",
        parent_mail: "caroline.goujon@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Celine",
        parent_lastname: "Lelouche",
        parent_adress: "1 boulevard des cites unies 59000 Lille",
        parent_phone: "03 20 67 84 36",
        parent_mail: "celine.lelouche@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Sebastien",
        parent_lastname: "Cachin",
        parent_adress: "12 rue Vaugirard 59350 Lille",
        parent_phone: "03 20 85 43 74",
        parent_mail: "sebastien.cachin@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
      {
        parent_firstname: "Chantel",
        parent_lastname: "Gardot",
        parent_adress: "45 boulevard de la Liberte 59000 Lille",
        parent_phone: "03 20 45 63 74",
        parent_mail: "chantel.gardot@gmail.com",
        parent_password:
          "$argon2id$v=19$m=19456,t=2,p=1$464AEPDzjYRojvO3uiagpQ$7ijvm6sq926t0cjlqCldX4bWjcq/dKthC77pflfnQr0",
      },
    ];

    parents.forEach((parent) => {
      const parentWithRefName = {
        ...parent,
        refName: `parent_${parent.parent_mail}`,
      };

      this.insert(parentWithRefName);
    });
  }
}

module.exports = ParentSeeder;
