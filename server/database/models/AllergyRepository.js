const AbstractRepository = require("./AbstractRepository");

class AllergyRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the allergy class (AbstractRepository)
    // and pass the table name "allergy" as configuration
    super({ table: "allergy" });
  }

  // The C of CRUD - Create operation

  async create(allergy) {
    const [result] = await this.database.query(
      `insert into ${this.table} (gluten, fruitsacoque, crustaces, celeri, oeufs, moutarde, poissons, soja, lait, sulfites, sesame, lupin, arachides, mollusques, autres) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        allergy.gluten,
        allergy.fruitsacoque,
        allergy.crustaces,
        allergy.celeri,
        allergy.oeufs,
        allergy.moutarde,
        allergy.poissons,
        allergy.soja,
        allergy.lait,
        allergy.sulfites,
        allergy.sesame,
        allergy.lupin,
        allergy.arachides,
        allergy.mollusques,
        allergy.autres,
      ]
    );

    // Return the ID of the newly inserted allergy
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific allergy by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where allergy_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the allergy
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all allergys from the "allergy" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of allergys
    return rows;
  }

  // The U of CRUD - Update operation

  async update(allergy) {
    // Execute the SQL UPDATE query to update an allergy from the 'allergy' table
    const [rows] = await this.database.query(
      `update ${this.table} set gluten = ?, fruitsacoque = ?, crustaces = ?, celeri = ?, oeufs = ?, moutarde = ?, poissons = ?, soja = ?, lait = ?, sulfites = ?, sesame = ?, lupin = ?, arachides = ?, mollusques = ?, autres = ?,  where allergy_id = ?`,
      [
        allergy.gluten,
        allergy.fruitsacoque,
        allergy.crustaces,
        allergy.celeri,
        allergy.oeufs,
        allergy.moutarde,
        allergy.poissons,
        allergy.soja,
        allergy.lait,
        allergy.sulfites,
        allergy.sesame,
        allergy.lupin,
        allergy.arachides,
        allergy.mollusques,
        allergy.autres,
      ]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete an allergy from the 'allergy' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where allergy_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = AllergyRepository;
