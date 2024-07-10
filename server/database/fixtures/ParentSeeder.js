const AbstractSeeder = require("./AbstractSeeder");

class ParentSeeder extends AbstractSeeder {
  constructor() {
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
      {
        parent_firstname: "Taylor",
        parent_lastname: "Swift",
        parent_adress: "46 rue d'Hem 59000 Lille",
        parent_phone: "03 20 23 56 74",
        parent_mail: "taylor.swift@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Celine",
        parent_lastname: "Lelouche",
        parent_adress: "1 boulevard des cites unies 59000 Lille",
        parent_phone: "03 20 67 84 36",
        parent_mail: "celine.lelouche@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Sebastien",
        parent_lastname: "Cachin",
        parent_adress: "12 rue Vaugirard 59350 Lille",
        parent_phone: "03 20 85 43 74",
        parent_mail: "sebastien.cachin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Chantel",
        parent_lastname: "Gardot",
        parent_adress: "45 boulevard de la Liberte 59000 Lille",
        parent_phone: "03 20 45 63 74",
        parent_mail: "chantel.gardot@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Marie",
        parent_lastname: "Moussin",
        parent_adress: "32 rue Faidherbes 59000 Lille",
        parent_phone: "03 20 76 23 54",
        parent_mail: "marie.moussin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Paul",
        parent_lastname: "Fouillon",
        parent_adress: "7 place Louise de Bettigny 59350 Lille",
        parent_phone: "03 20 94 36 61",
        parent_mail: "paul.fouillon@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Kadr",
        parent_lastname: "Malik",
        parent_adress: "35 rue des peupliers 59350 Lille",
        parent_phone: "03 20 28 17 03",
        parent_mail: "kadr.malik@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Dustin",
        parent_lastname: "Poirier",
        parent_adress: "17 avenue de la république 59800 Lille",
        parent_phone: "03 20 14 49 94",
        parent_mail: "dustin.poirier@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Gaylord",
        parent_lastname: "Lejuste",
        parent_adress: "42 rue de Gant 59000 Lille",
        parent_phone: "03 20 96 74 35",
        parent_mail: "gaylord.lejuste@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Justine",
        parent_lastname: "Fouquerin",
        parent_adress: "14 rue royale 59350 Lille",
        parent_phone: "03 20 65 32 26",
        parent_mail: "justine.fouquerin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Laurine",
        parent_lastname: "St-Martin",
        parent_adress: "34 avenue du peuple belge 59350 Lille",
        parent_phone: "03 20 56 56 87",
        parent_mail: "laurine.st-martin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Claire",
        parent_lastname: "Gilbert",
        parent_adress: "42 rue Nationale 59800 Lille",
        parent_phone: "03 21 69 65 08",
        parent_mail: "claire.gilbert@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Tatiana",
        parent_lastname: "Neullin",
        parent_adress: "12 rue saint sauveur 59000 Lille",
        parent_phone: "03 21 74 82 34",
        parent_mail: "tatiana.neullin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Heloise",
        parent_lastname: "Souplin",
        parent_adress: "28 grand place 59350 Lille",
        parent_phone: "03 21 22 66 28",
        parent_mail: "heloise.souplin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Camille",
        parent_lastname: "Jamin",
        parent_adress: "68 faubourg 'd'Arras 59000 Lille",
        parent_phone: "03 21 20 56 18",
        parent_mail: "camille.jamin@gmail.com",
        parent_password: "************",
      },
      {
        parent_firstname: "Cedric",
        parent_lastname: "Rotieu",
        parent_adress: "41 faubourg de Bethune 59800 Lille",
        parent_phone: "03 21 69 43 08",
        parent_mail: "cedric.rotieu@gmail.com",
        parent_password: "************",
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
