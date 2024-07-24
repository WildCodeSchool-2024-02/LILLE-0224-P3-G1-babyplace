const AbstractRepository = require("./AbstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the child class (AbstractRepository)
    // and pass the table name "child" as configuration
    super({ table: "child" });
  }

  // The C of CRUD - Create operation

  async createChildAndAllergies(childData, allergiesArray) {
    // Insérer l'enfant
    const [childResult] = await this.database.query(
      `INSERT INTO child (child_firstname, child_lastname, child_birth, walk_status, clean_status, parent_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        childData.child_firstname,
        childData.child_lastname,
        childData.child_birth,
        childData.walk_status,
        childData.clean_status,
        childData.parent_id,
      ]
    );

    const childId = childResult.insertId;

    // Préparer les données d'allergies
    const allergyData = {
      gluten: allergiesArray.includes("Gluten") ? 1 : 0,
      fruitsacoque: allergiesArray.includes("Fruits à coque") ? 1 : 0,
      crustaces: allergiesArray.includes("Crustacés") ? 1 : 0,
      celeri: allergiesArray.includes("Célerie") ? 1 : 0,
      oeufs: allergiesArray.includes("Oeufs") ? 1 : 0,
      moutarde: allergiesArray.includes("Moutarde") ? 1 : 0,
      poissons: allergiesArray.includes("Poissons") ? 1 : 0,
      soja: allergiesArray.includes("Soja") ? 1 : 0,
      lait: allergiesArray.includes("Lait") ? 1 : 0,
      sulfites: allergiesArray.includes("Sulfites") ? 1 : 0,
      sesame: allergiesArray.includes("Sésame") ? 1 : 0,
      lupin: allergiesArray.includes("Lupin") ? 1 : 0,
      arachides: allergiesArray.includes("Arachides") ? 1 : 0,
      mollusques: allergiesArray.includes("Mollusques") ? 1 : 0,
      autres: allergiesArray.includes("autres") ? "Autres allergies" : null,
      child_id: childId,
    };

    // Insérer les allergies
    await this.database.query(`INSERT INTO allergy SET ?`, allergyData);

    return childId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific child by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where child_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the child
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all children from the "child" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of children
    return rows;
  }

  // The U of CRUD - Update operation
  async update(child) {
    // Execute the SQL UPDATE query to update a child from the 'child' table
    const [rows] = await this.database.query(
      `update ${this.table}set firstname = ?, lastname = ?, birth = ?, where child_id = ?`,
      [child.child_firstname, child.child_lastname, child.child_birth]
    );

    // Return how many rows were affected
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a child from the 'child' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where child_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = ChildRepository;
