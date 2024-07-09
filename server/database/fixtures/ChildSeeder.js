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
        child_firstname: "Emilie",
        child_lastname: "Lelouche",
        child_birth: "2023-06-17",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_celine.lelouche@gmail.com").insertId,
      },
      {
        child_firstname: "Morgan",
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
        parent_id: this.getRef("parent_georges.rush.st-pierre@gmail.com")
          .insertId,
      },
      {
        child_firstname: "Hannah",
        child_lastname: "Styles",
        child_birth: "2023-05-28",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_harry.styles@gmail.com").insertId,
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
        child_firstname: "Lucie",
        child_lastname: "Swift",
        child_birth: "2023-09-03",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_taylor.swift@gmail.com").insertId,
      },
      {
        child_firstname: "Matheo",
        child_lastname: "Roland",
        child_birth: "2023-07-22",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_thierry.roland@gmail.com").insertId,
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
      {
        child_firstname: "Coralie",
        child_lastname: "Moussin",
        child_birth: "2023-06-09",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_marie.moussin@gmail.com").insertId,
      },
      {
        child_firstname: "Valentin",
        child_lastname: "Fouillon",
        child_birth: "2023-06-13",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_paul.fouillon@gmail.com").insertId,
      },
      {
        child_firstname: "Zayn",
        child_lastname: "Malik",
        child_birth: "2023-03-25",
        walk_status: 1,
        clean_status: 1,
        parent_id: this.getRef("parent_kadr.malik@gmail.com").insertId,
      },
      {
        child_firstname: "Johnatan",
        child_lastname: "Poirier",
        child_birth: "2023-09-23",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_dustin.poirier@gmail.com").insertId,
      },
      {
        child_firstname: "Alexandre",
        child_lastname: "Lejuste",
        child_birth: "2023-06-18",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_gaylord.lejuste@gmail.com").insertId,
      },
      {
        child_firstname: "Marceau",
        child_lastname: "Fouquerin",
        child_birth: "2023-08-03",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_justine.fouquerin@gmail.com").insertId,
      },
      {
        child_firstname: "Julie",
        child_lastname: "St-Martin",
        child_birth: "2023-01-22",
        walk_status: 1,
        clean_status: 1,
        parent_id: this.getRef("parent_laurine.st-martin@gmail.com").insertId,
      },
      {
        child_firstname: "Sophie",
        child_lastname: "Gilbert",
        child_birth: "2023-07-12",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_claire.gilbert@gmail.com").insertId,
      },
      {
        child_firstname: "Charlotte",
        child_lastname: "Neullin",
        child_birth: "2023-05-05",
        walk_status: 1,
        clean_status: 0,
        parent_id: this.getRef("parent_tatiana.neullin@gmail.com").insertId,
      },
      {
        child_firstname: "Aline",
        child_lastname: "Souplin",
        child_birth: "2023-07-21",
        walk_status: 0,
        clean_status: 1,
        parent_id: this.getRef("parent_heloise.souplin@gmail.com").insertId,
      },
      {
        child_firstname: "Corentin",
        child_lastname: "Jamin",
        child_birth: "2023-02-13",
        walk_status: 1,
        clean_status: 1,
        parent_id: this.getRef("parent_camille.jamin@gmail.com").insertId,
      },
      {
        child_firstname: "Axel",
        child_lastname: "Rotieu",
        child_birth: "2023-12-27",
        walk_status: 0,
        clean_status: 0,
        parent_id: this.getRef("parent_cedric.rotieu@gmail.com").insertId,
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
