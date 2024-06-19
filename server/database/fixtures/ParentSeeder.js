const AbstractSeeder = require("./AbstractSeeder");

class ParentSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "parent", truncate: true });
  }

  run() {
    const parents = [
      {
        parent_firstname: "Thierry",
        parent_lastname: "Roland",
        parent_adress: "47 boulevard Victor Hugo 59000 Lille",
        parent_phone: "03 21 67 82 34",
        parent_mail: "thierry.roland@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Harry",
        parent_lastname: "Styles",
        parent_adress: "1 rue de la monnaie 59350 Lille",
        parent_phone: "03 21 29 64 28",
        parent_mail: "harry.styles@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Georges",
        parent_lastname: "St-Pierre",
        parent_adress: "61 rue Basse 59350 Lille",
        parent_phone: "03 21 20 02 81",
        parent_mail: "georges.rush.st-pierre@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Caroline",
        parent_lastname: "Goujon",
        parent_adress: "47 rue Nationale 59800 Lille",
        parent_phone: "03 21 69 42 08",
        parent_mail: "caroline.goujon@gmail.com",
        parent_password: "************",
      },
    ];

    parents.forEach((parent) => {
      this.insert(parent);
    });
  }
}

// Export the ParentSeeder class
module.exports = ParentSeeder;
