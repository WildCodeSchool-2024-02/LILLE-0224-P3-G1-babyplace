const AbstractSeeder = require("./AbstractSeeder");
const ParentSeeder = require("./ParentSeeder");

class ChildSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the child class (AbstractSeeder) with appropriate options
    super({ table: "child", truncate: true, dependencies: [ParentSeeder] });
  }

  run() {
    const children = [
      {
        child_firstname: "Zoé",
        child_lastname: "Lelouche",
        child_birth: "2023-06-17",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
      },
      {
        child_firstname: "Martin",
        child_lastname: "Lelouche",
        child_birth: "2023-08-24",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
      },
      {
        child_firstname: "Benoit",
        child_lastname: "St-Pierre",
        child_birth: "2023-04-28",
        walk_status: 1,
        clean_status: 1,
        parent_id: this.getRef("parent_georges.st-pierre@gmail.com").insertId,
      },
      {
        child_firstname: "Hannah",
        child_lastname: "Legrand",
        child_birth: "2023-05-28",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_harry.legrand@gmail.com").insertId,
      },
      {
        child_firstname: "Elias",
        child_lastname: "Goujon",
        child_birth: "2023-12-12",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_caroline.goujon@gmail.com").insertId,
      },
      {
        child_firstname: "Vincent",
        child_lastname: "Roland",
        child_birth: "2023-07-22",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_jean.roland@gmail.com").insertId,
      },
      {
        child_firstname: "Bob",
        child_lastname: "Cachin",
        child_birth: "2023-11-12",
        walk_status: 1,
        clean_status: 1,
        parent_id: this.getRef("parent_sebastien.cachin@gmail.com").insertId,
      },
      {
        child_firstname: "Eloise",
        child_lastname: "Gardot",
        child_birth: "2023-10-23",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_chantel.gardot@gmail.com").insertId,
      },
    ];

    children.forEach((child) => {
      const childWithRefName = {
        ...child,
        refName: `child_${child.child_firstname}`,
      };

      this.insert(childWithRefName); // insert into child(lastname) values (?)
    });
  }
}

// Export the ChildSeeder class
module.exports = ChildSeeder;
