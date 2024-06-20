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
      `select * from ${this.table} where id = ?`,
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
  // TODO: Implement the update operation to modify an existing allergy

  // async update(allergy) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a allergy by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = AllergyRepository;
