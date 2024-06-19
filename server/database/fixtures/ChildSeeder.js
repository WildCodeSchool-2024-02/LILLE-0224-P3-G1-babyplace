const AbstractSeeder = require("./AbstractSeeder");
const ParentSeeder = require("./ParentSeeder");

class ChildSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the child class (AbstractSeeder) with appropriate options
    super({ table: "child", truncate: true, dependecies: [ParentSeeder] });
  }

  run() {
    const children = [
      {
        child_firstname: "Emilie",
        child_lastname: "Roland",
        child_birth: "12-06_2023",
        walk_status: 1,
        clean_status: 0,
      },
      {
        child_firstname: "Morgan",
        child_lastname: "Styles",
        child_birth: "17-08-2023",
        walk_status: 0,
        clean_status: 1,
      },
      {
        child_firstname: "Benoit",
        child_lastname: "St-Pierre",
        child_birth: "28-04-2023",
        walk_status: 1,
        clean_status: 1,
      },
      {
        child_firstname: "Elias",
        child_lastname: "Goujon",
        child_birth: "12-12-2023",
        walk_status: 0,
        clean_status: 0,
      },
    ];

    children.forEach((child) => {
      this.insert(child);
    });
  }
}

// Export the ChildSeeder class
module.exports = ChildSeeder;
