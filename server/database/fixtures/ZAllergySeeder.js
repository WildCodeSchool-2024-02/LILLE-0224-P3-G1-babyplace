const AbstractSeeder = require("./AbstractSeeder");
const ChildSeeder = require("./ChildSeeder");

class ZAllergySeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the child class (AbstractSeeder) with appropriate options
    super({ table: "allergy", truncate: true, dependencies: [ChildSeeder] });
  }

  run() {
    const allergies = [
      {
        gluten: 1,
        fruitsacoque: 0,
        crustaces: 0,
        celeri: 0,
        oeufs: 0,
        moutarde: 0,
        poissons: 0,
        soja: 0,
        lait: 0,
        sulfites: 0,
        sesame: 0,
        lupin: 0,
        arachides: 1,
        mollusques: 0,
        autres: "Pollen",
        child_id: this.getRef("child_Zoé").insertId,
      },

      {
        gluten: 0,
        fruitsacoque: 0,
        crustaces: 1,
        celeri: 0,
        oeufs: 0,
        moutarde: 0,
        poissons: 1,
        soja: 0,
        lait: 0,
        sulfites: 0,
        sesame: 0,
        lupin: 0,
        arachides: 0,
        mollusques: 0,
        autres: "Herbe",
        child_id: this.getRef("child_Martin").insertId,
      },
      {
        gluten: 0,
        fruitsacoque: 0,
        crustaces: 1,
        celeri: 0,
        oeufs: 0,
        moutarde: 0,
        poissons: 1,
        soja: 0,
        lait: 0,
        sulfites: 0,
        sesame: 0,
        lupin: 0,
        arachides: 0,
        mollusques: 0,
        autres: null,
        child_id: this.getRef("child_Benoit").insertId,
      },
    ];

    allergies.forEach((allergy) => {
      this.insert(allergy);
    });
  }
}

// Export the AllergySeeder class
module.exports = ZAllergySeeder;
