const AbstractSeeder = require("./AbstractSeeder");

class NurserySeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "nursery", truncate: true });
  }

  run() {
    const nurseries = [
      {
        nursery_name: "Lillomomes",
        nursery_street: "rue Courmont",
        nursery_street_number: 27,
        latitude: 50.619581,
        longitude: 3.06647,
        city: "Lille",
        capacity: 37,
        price: 10,
        nursery_phone: "03 20 85 96 41",
        nursery_mail: "contact@lillomomes.fr",
        image1: "../../public/assets/images/nurseriesImages/0101.jpg",
        image2: "../../public/assets/images/nurseriesImages/0102.jpg",
        image3: "../../public/assets/images/nurseriesImages/0103.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Les Minilions",
        nursery_street: "Rue Saint-Sébastien",
        nursery_street_number: 27,
        latitude: 50.646742,
        longitude: 3.05705,
        city: "Lille",
        capacity: 10,
        price: 20,
        nursery_phone: "03 20 85 96 41",
        nursery_mail: " contact@minilions.fr",
        image1: "../../public/assets/images/nurseriesImages/0201.jpg",
        image2: "../../public/assets/images/nurseriesImages/0202.jpg",
        image3: "../../public/assets/images/nurseriesImages/0203.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Tambourin et Castagnettes - Liberté",
        nursery_street: "rue d'Hazebrouck",
        nursery_street_number: 27,
        latitude: 50.629234,
        longitude: 3.06706,
        city: "Lille",
        capacity: 10,
        price: 20,
        nursery_phone: "03 20 75 92 76",
        nursery_mail: "hello@tambourin-et-castagnettes.com",
        image1: "../../public/assets/images/nurseriesImages/0301.jpg",
        image2: "../../public/assets/images/nurseriesImages/0302.jpg",
        image3: "../../public/assets/images/nurseriesImages/0303.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Chlorophylle",
        nursery_street: "rue Fourrier",
        nursery_street_number: 27,
        longitude: 3.01932,
        latitude: 50.634505,
        city: "Lille",
        capacity: 12,
        price: 20,
        nursery_phone: "06 51 99 48 67",
        nursery_mail: "hello@chlorophylle.com",
        image1: "../../public/assets/images/nurseriesImages/0401.jpg",
        image2: "../../public/assets/images/nurseriesImages/0402.jpg",
        image3: "../../public/assets/images/nurseriesImages/0403.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Le Royaume des Petits Lutins",
        nursery_street: "rue Pierre Curie",
        nursery_street_number: 27,
        latitude: 50.646742,
        longitude: 3.05705,
        city: "Lille",
        capacity: 12,
        price: 20,
        nursery_phone: "09 50 09 81 14",
        nursery_mail: "hello@chlorophylle.com",
        image1: "../../public/assets/images/nurseriesImages/0501.jpg",
        image2: "../../public/assets/images/nurseriesImages/0502.jpg",
        image3: "../../public/assets/images/nurseriesImages/0503.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Harmonie",
        nursery_street: "rue des Eaux",
        nursery_street_number: 27,
        latitude: 50.656532,
        longitude: 3.08612,
        city: "Lille",
        capacity: 12,
        price: 20,
        nursery_phone: "03 28 14 44 56",
        nursery_mail: "hello@harmonie.com",
        image1: "../../public/assets/images/nurseriesImages/0601.jpg",
        image2: "../../public/assets/images/nurseriesImages/0602.jpg",
        image3: "../../public/assets/images/nurseriesImages/0603.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Tilleul",
        nursery_street: "Square Dutilleul",
        nursery_street_number: 27,
        latitude: 50.636741,
        longitude: 3.05475,
        city: "Lille",
        capacity: 15,
        price: 20,
        nursery_phone: "07 82 27 21 40",
        nursery_mail: "hello@tilleul.com",
        image1: "../../public/assets/images/nurseriesImages/0701.jpg",
        image2: "../../public/assets/images/nurseriesImages/0702.jpg",
        image3: "../../public/assets/images/nurseriesImages/0703.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Les petits soleils",
        nursery_street: "rue des Cannoniers",
        nursery_street_number: 27,
        latitude: 50.639378,
        longitude: 3.06989,
        city: "Lille",
        capacity: 13,
        price: 20,
        nursery_phone: "09 50 15 28 89",
        nursery_mail: "hello@petitssoleils.com",
        image1: "../../public/assets/images/nurseriesImages/0801.jpg",
        image2: "../../public/assets/images/nurseriesImages/0802.jpg",
        image3: "../../public/assets/images/nurseriesImages/0803.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Babilou Lille Le Plat",
        nursery_street: "rue du Plat",
        nursery_street_number: 33,
        latitude: 50.656532,
        longitude: 3.08612,
        city: "Lille",
        capacity: 12,
        price: 20,
        nursery_phone: "03 28 14 44 56",
        nursery_mail: "hello@harmonie.com",
        image1: "../../public/assets/images/nurseriesImages/0901.jpg",
        image2: "../../public/assets/images/nurseriesImages/0902.jpg",
        image3: "../../public/assets/images/nurseriesImages/0903.jpg",
        nursery_password: "",
      },
      {
        nursery_name: "Les Petits Chaperons Rouges",
        nursery_street: "rue de Paris",
        nursery_street_number: 74,
        latitude: 48.113054,
        longitude: -1.66239,
        city: "Rennes",
        capacity: 26,
        price: 15,
        nursery_phone: "02 56 85 41 00",
        nursery_mail: "contact@lespetitschaperons.fr",

        image1: "../../public/assets/images/nurseriesImages/1001.jpg",
        image2: "../../public/assets/images/nurseriesImages/1002.jpg",
        image3: "../../public/assets/images/nurseriesImages/1003.jpg",
        activity1: "",
        activity2: "",
        activity3: "",
        certification1: "",
        certification2: "",
        certification3: "",
        nursery_password: "",
      },
      {
        nursery_name: "Crèche'n'do",
        nursery_street: "Rue du Sous-Lieutenant Lay",
        nursery_street_number: 8,
        latitude: 48.109371,
        longitude: -1.653964,
        city: "Rennes",
        capacity: 33,
        price: 10,
        nursery_phone: "0756918073",
        nursery_mail: "contact@crechendo-creches.com",
        image1: "../../public/assets/images/nurseriesImages/1101.jpg",
        image2: "../../public/assets/images/nurseriesImages/1102.jpg",
        image3: "../../public/assets/images/nurseriesImages/1103.jpg",
        activity1: "",
        activity2: "",
        activity3: "",
        certification1: "",
        certification2: "",
        certification3: "",
        nursery_password: "",
      },

      {
        nursery_name: "Au Clair de la Lune",
        nursery_street: "Rue Pierre Jean Gineste",
        nursery_street_number: 7,
        latitude: 48.119119,
        longitude: -1.699445,
        city: "Rennes",
        capacity: 19,
        price: 13,
        nursery_phone: "02 99 14 14 71",
        nursery_mail: "contact@clair-de-lune.fr",
        image1: "../../public/assets/images/nurseriesImages/1201.jpg",
        image2: "../../public/assets/images/nurseriesImages/1202.jpg",
        image3: "../../public/assets/images/nurseriesImages/1203.jpg",
        activity1: "",
        activity2: "",
        activity3: "",
        certification1: "",
        certification2: "",
        certification3: "",
        nursery_password: "",
      },

      {
        nursery_name: "Piccolino",
        nursery_street: "Rue Gina Pane",
        nursery_street_number: 17,
        latitude: 48.134424,
        longitude: -1.697128,
        city: "Rennes",
        capacity: 22,
        price: 7,
        nursery_phone: "02 99 13 24 72",
        nursery_mail: "contact@piccolino.fr",
        image1: "../../public/assets/images/nurseriesImages/1301.jpg",
        image2: "../../public/assets/images/nurseriesImages/1302.jpg",
        image3: "../../public/assets/images/nurseriesImages/1303.jpg",
        activity1: "",
        activity2: "",
        activity3: "",
        certification1: "",
        certification2: "",
        certification3: "",
        nursery_password: "",
      },

      {
        nursery_name: "Les Petits Merlins",
        nursery_street: "Av. De Pologne",
        nursery_street_number: 12,
        latitude: 48.087106,
        longitude: -1.650957,
        city: "Rennes",
        capacity: 40,
        price: 15,
        nursery_phone: "02 68 82 52 34",
        nursery_mail: "contact@petits-merlins.fr",
        image1: "../../public/assets/images/nurseriesImages/1401.jpg",
        image2: "../../public/assets/images/nurseriesImages/1402.jpg",
        image3: "../../public/assets/images/nurseriesImages/1403.jpg",
        activity1: "",
        activity2: "",
        activity3: "",
        certification1: "",
        certification2: "",
        certification3: "",
        nursery_password: "",
      },
    ];

    nurseries.forEach((nursery) => {
      this.insert(nursery);
    });
  }
}

// Export the NurserySeeder class
module.exports = NurserySeeder;