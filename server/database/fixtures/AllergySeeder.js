const AbstractSeeder = require("./AbstractSeeder");
const ChildSeeder = require("./ChildSeeder");

class AllergySeeder extends AbstractSeeder {
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
        celeri: 1,
        oeufs: 0,
        moutarde: 0,
        poissons: 1,
        soja: 0,
        lait: 0,
        sulfites: 1,
        sesame: 0,
        lupin: 0,
        arachides: 1,
        mollusques: 0,
        autres: "Pollen",
        child_id: this.getRef("child_Roland").insertId,
      },
      {
        gluten: 0,
        fruitsacoque: 1,
        crustaces: 0,
        celeri: 0,
        oeufs: 1,
        moutarde: 0,
        poissons: 0,
        soja: 1,
        lait: 0,
        sulfites: 0,
        sesame: 1,
        lupin: 0,
        arachides: 0,
        mollusques: 1,
        autres: null,
        child_id: this.getRef("child_Styles").insertId,
      },
      {
        gluten: 0,
        fruitsacoque: 0,
        crustaces: 1,
        celeri: 0,
        oeufs: 1,
        moutarde: 0,
        poissons: 1,
        soja: 0,
        lait: 1,
        sulfites: 0,
        sesame: 0,
        lupin: 0,
        arachides: 1,
        mollusques: 0,
        autres: null,
        child_id: this.getRef("child_St-Pierre").insertId,
      },
      {
        gluten: 0,
        fruitsacoque: 1,
        crustaces: 0,
        celeri: 0,
        oeufs: 0,
        moutarde: 1,
        poissons: 0,
        soja: 1,
        lait: 0,
        sulfites: 1,
        sesame: 0,
        lupin: 1,
        arachides: 0,
        mollusques: 0,
        autres: "Acariens",
        child_id: this.getRef("child_Goujon").insertId,
      },
      {
        gluten: 1,
        fruitsacoque: 0,
        crustaces: 1,
        celeri: 0,
        oeufs: 0,
        moutarde: 1,
        poissons: 0,
        soja: 0,
        lait: 0,
        sulfites: 1,
        sesame: 1,
        lupin: 0,
        arachides: 0,
        mollusques: 1,
        autres: "Piqures d'abeille",
        child_id: this.getRef("child_Swift").insertId,
      },
      // Continuez avec les autres enfants...
    ];

    allergies.forEach((allergy) => {
      this.insert(allergy);
    });
  }
}

// Export the AllergySeeder class
module.exports = AllergySeeder;
